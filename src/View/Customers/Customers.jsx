import React, { useEffect, useState ,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import './Customers.css'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Button from '../../Components/Button'
import Pagination from '../../Components/Pagination/Pagination'
import AddCustomerModal from '../Modal/AddCustomerModal'
import EditCustomerModal from '../Modal/EditCustomerModal'
import { deleteCustomer, getAllCutomer } from '../../utils/cutomer'
import Loaders from '../../Components/Loaders/Loaders'
import { useSelector } from 'react-redux'
const Customers = () => {
    const [index, setIndex] = useState([]);
    const dropdownRef = useRef(null);

    const [customerData, setcustomerData] = useState([]);
    const { isEdited } = useSelector(state => state.editCustomer)
    const [customerId, setCustomerId] = useState()
    const [loading, setIsloading] = useState(false)
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    const [addCustomer, setaddCustomer] = useState(false);
    const [editCustomer, seteditCustomer] = useState(false);

    const fetchCustomer = async () => {
        setIsloading(true)
        try {
            const result = await getAllCutomer();
            setcustomerData(result.data);
        } catch (err) {
            console.log(err)
        } finally {
            setIsloading(false)
        }
    }
    useEffect(() => {
        fetchCustomer()
    }, [isEdited])

    const deleteCustomerFunc = async (id) => {
        setIsloading(true)
        if (id) {
            try {
                const result = await deleteCustomer(id);
                console.log(result)
                if (result.success) {
                    fetchCustomer()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsloading(false)
            }
        }
    }


     const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIndex([]);
            }
        };
    
    
        useEffect(() => {
            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, []);
    return (
        <>
            {loading && <Loaders />}
            {addCustomer && <AddCustomerModal fetchCustomer={fetchCustomer} setaddCustomer={setaddCustomer} />}
            {editCustomer && <EditCustomerModal customerId={customerId} seteditCustomer={seteditCustomer} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <h2>Customers</h2>
                    <div className='coaches_button_wapper'>
                        <div onClick={(() => setaddCustomer(true))}>
                            <Button children={'Add Customer'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>

                        <div className='coaches_search_wrapper'>
                            <input placeholder='Search' />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>

                            </tr>
                        </thead>
                        {customerData.length > 0 ? <tbody>
                            {customerData?.map((e, i) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>
                                            <div className='customer_details_wrapper'>
                                                <p>{e?.user?.name}</p>
                                                {/* <p>#ST456666</p> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{e?.user?.email}</td>
                                    <td>+{e?.profile?.phone_country_code?.phone_code} {e?.profile?.phone}</td>
                                    <td ref={dropdownRef}>
                                        <img onClick={((e) =>{ 
                                            e.stopPropagation()
                                            indexFunction(i)})} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(() => {
                                                navigate(`/dashboard/customers/single-customer/${e?.id}`)
                                            })}>View</p>
                                            <p onClick={(() => {
                                                setCustomerId(e.id)
                                                seteditCustomer(true)
                                            })}>Edit</p>
                                            <p onClick={(() => {
                                                deleteCustomerFunc(e.id)
                                            })}>Delete</p>
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody> : <td colSpan={12} style={{
                            textAlign: 'center'
                        }}>No Customer data found</td>}
                    </table>
                </div>
                <Pagination />
            </div>
        </>
    )
}

export default Customers
