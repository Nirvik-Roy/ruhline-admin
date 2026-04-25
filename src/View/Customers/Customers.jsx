import React, { useEffect, useState, useRef } from 'react'
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
import DeleteModal from '../../Components/DeleteModal/DeleteModal'
const Customers = () => {
    const [index, setIndex] = useState([]);
    const dropdownRef = useRef(null);
    const [deletedId, setdeletedId] = useState()
    const [customerData, setcustomerData] = useState([]);
    const { isEdited } = useSelector(state => state.editCustomer)
    const [deleteModal, setdeleteModal] = useState(false)
    const [customerId, setCustomerId] = useState()
    const [loading, setIsloading] = useState(false);
    const [deleteLoading, setdeleteloading] = useState(false)
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    // Pagination logic & Search Logic...
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // 500ms delay
        return () => clearTimeout(timer); // cleanup
    }, [searchTerm]);
    const filteredData = customerData?.filter((item) =>
        item?.user?.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredData?.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };
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
    }, [])
    useEffect(() => {
        if (isEdited) {
            fetchCustomer()
        }
    }, [isEdited])

    const deleteCustomerFunc = async () => {
        setdeleteloading(true)
        if (deletedId) {
            try {
                const result = await deleteCustomer(deletedId);
                console.log(result)
                if (result.success) {
                    fetchCustomer();
                    setdeleteModal(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setdeleteloading(false)
            }
        }
    }

    const handleDelete = (id) => {
        setdeletedId(id)
        setdeleteModal(true)
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
            {deleteModal && <DeleteModal loading={deleteLoading} onClick={deleteCustomerFunc} setdeleteModal={setdeleteModal} title={'Delete Customer'} details={'Are you sure you want to delete this customer?...'} />}
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
                            <input onChange={((e) => setSearchTerm(e?.target?.value))} placeholder='Search' />
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

                        {!loading && <tbody>

                            {currentItems?.length <= 0 && <td colSpan={12} style={{
                                textAlign: 'center',
                                color: 'var(--primary-color)',
                                fontWeight: '700'
                            }}>No Customer data found...</td>}
                            {currentItems?.map((e, i) => (
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
                                        <img onClick={((e) => {
                                            e.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(() => {
                                                navigate(`/dashboard/customers/single-customer/${e?.id}`)
                                            })}>View</p>
                                            <p onClick={(() => {
                                                setCustomerId(e.id)
                                                seteditCustomer(true)
                                            })}>Edit</p>
                                            <p onClick={(() => {
                                                handleDelete(e.id)
                                            })}>Delete</p>
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                </div>
                <Pagination pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </>
    )
}

export default Customers
