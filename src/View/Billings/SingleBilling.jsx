import React, { useState } from 'react'
import Button from '../../Components/Button'
import './Billings.css'
import logo from '../../assets/Frame 1984078480.svg'
import EditInvoiceModal from '../Modal/EditInvoiceModal'
import { useNavigate } from 'react-router-dom'
const SingleBilling = () => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate()
    return (
        <>
            {modal && <EditInvoiceModal setModal={setModal}/>}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>#3492</h2>
                        <small><span onClick={(()=>navigate('/dashboard/billings'))}>Billings</span> / <span onClick={(()=>navigate('/dashboard/billings/single-bill/2'))}>#3492</span></small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div onClick={(()=>setModal(true))}>
                            <Button children={'Edit'} styles={{
                                fontSize: '13px',
                                height: '46px'
                            }} />
                        </div>
                    </div>
                </div>
                <div className='single_bill_wrapper'>
                    <div className='single_bill_content_wrapper'>
                        <img src={logo} />
                        <div className='billing_invoice_wrapper'>
                            <div className='bill_address'>
                                <p>Office 149, 450 South Brand Brooklyn
                                    San Diego County, CA 91905, USA
                                    +1 (123) 456 7891, +44 (876) 543 2198</p>
                            </div>
                            <div className='bill_id_wrapper'>
                                <h1>Invoice ID: #3492</h1>
                                <p>Date Issued: 25/08/2020</p>
                                <p>Payment: Pending</p>
                            </div>
                        </div>
                    </div>

                    <div className='single_invoice_to_wrapper'>
                        <strong>Invoice To:</strong>
                        <ul>
                            <li>Thomas shelby</li>
                            <li>Shelby Company Limited</li>
                            <li>Small Heath, B10 0HF, UK</li>
                            <li>718-986-6062</li>
                            <li>peakyFBlinders@gmail.com</li>
                        </ul>
                    </div>
                    <div className='table_container' style={{
                        paddingBottom: '40px',
                        borderBottom: '1px solid rgba(38, 43, 67, 0.12)'
                    }}>
                        <table className='total_table_order_wrapper coaches_table_wrapper'>
                            <thead>
                                <tr>
                                    <th>Program Name</th>
                                    <th>Coach</th>
                                    <th style={{
                                        textAlign: 'center'
                                    }}>Price</th>

                                </tr>
                            </thead>
                            <tbody>

                                <tr style={{
                                    border: '1px solid rgba(216, 216, 216, 1)',
                                    borderRadius: '0 0 10px 10px'
                                }}>
                                    <td >Program 1</td>
                                    <td>Bidisha Bhowmick</td>
                                    <td>SAR 32</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='bill_total_wrapper'>
                        <p>Total:</p>
                        <p>SAR 32</p>
                    </div>
                    <p style={{
                        fontSize: '15px',
                        color: 'var(--text-color)'
                    }}>Note: It was a pleasure working with you and your team. Thank You!</p>
                </div>
            </div>
        </>
    )
}

export default SingleBilling
