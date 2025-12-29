import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Customers.css'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Button from '../../Components/Button'
import Pagination from '../../Components/Pagination/Pagination'
import AddCustomerModal from '../Modal/AddCustomerModal'
import EditCustomerModal from '../Modal/EditCustomerModal'
const Customers = () => {
    const [index, setIndex] = useState([]);
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
    return (
        <>
            {addCustomer && <AddCustomerModal setaddCustomer={setaddCustomer} />}
            {editCustomer && <EditCustomerModal seteditCustomer={seteditCustomer} />}
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
                        <tbody>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 7].map((e, i) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>
                                            <div className='customer_details_wrapper'>
                                                <p>Bidisha Bhowmick</p>
                                                <p>#ST456666</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>bidishabhowmick@gmail.com</td>
                                    <td>+1 1234567890</td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(() => {
                                                navigate(`/dashboard/customers/single-customer/${i + 1}`)
                                            })}>View</p>
                                            <p onClick={(()=>seteditCustomer(true))}>Edit</p>
                                            <p>Delete</p>
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </>
    )
}

export default Customers
