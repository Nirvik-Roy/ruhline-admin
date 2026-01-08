import React, { useState } from 'react'
import img from '../../assets/Photo.png'
import img2 from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import Button from '../../Components/Button'
import { Link } from 'react-router-dom'
import SinglePayModal from '../Modal/SinglePayModal'
import PaymentAllModal from '../Modal/PaymentAllModal'
const PaymentList = () => {
    const [dropdown, setdropdown] = useState(false);
    const [payment, setPayment] = useState({
        paymentPay: false,
        payall: false
    })
    const paymentFunction = (i) => {
        setPayment({
            paymentPay: i === 1 ? true : false,
            payall: i === 2 ? true : false
        })
    }
    return (
        <>
            {payment.paymentPay && <SinglePayModal paymentFunction={paymentFunction} />}
            {payment.payall && <PaymentAllModal paymentFunction={paymentFunction} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Bidisha Bhowmick</h2>
                        <small>Payouts / Bidisha Bhowmick</small>
                    </div>
                </div>
                <div className='payment_owner_wrapper'>
                    <img src={img} />
                    <div className='payment_owner_left'>
                        <h3>Bidisha Bhowmick</h3>
                        <p><strong>Coach ID:</strong> #Co456666</p>
                    </div>
                </div>
                <div className='total_order_wrapper'>
                    <div className='total_order_head_wrapper'>
                        <h1>Payouts</h1>
                        <div className='total_orders_select_wrapper'>
                            <div onClick={(() => setdropdown(!dropdown))} style={{
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <p>
                                    Last 7 days
                                </p>
                                <i class="fa-solid fa-angle-down"></i>

                                {dropdown && <div onClick={((e) => e.stopPropagation())} className='dropdown_wrapper'>
                                    <p>Last month</p>
                                    <p>Last 7 days</p>
                                </div>}
                            </div>
                            <div style={{
                                border:'none',
                                padding:'0'
                            }} onClick={(()=>paymentFunction(2))}>

                            <Button children={'Pay All'} />
                            </div>
                        </div>
                    </div>
                    <div className='table_container'>
                        <table className='total_table_order_wrapper'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th> Date</th>
                                    <th>Time</th>
                                    <th>Program Name</th>
                                    <th style={{
                                        textAlign: 'left'
                                    }}>Customer</th>
                                    <th>Amounts</th>
                                    <th>Payment Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                    <tr>
                                        <td>#Order56666</td>
                                        <td>27/10/2025</td>
                                        <td>09:30 AM</td>
                                        <td>
                                            Program Lorem Ispum
                                        </td>
                                        <td>
                                            <div className='customer_wrapper' style={{
                                                justifyContent: 'flex-start'
                                            }}>
                                                <div className='customer_img_div'>
                                                    <img src={img2} />
                                                </div>
                                                <div className='customer_details_wrapper'>
                                                    <p>Bidisha Bhowmick</p>
                                                    <p>#ST456666</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>SAR 300</td>
                                        <td>
                                            <p style={{
                                                background: 'rgba(224, 173, 34, 1)',
                                                padding: '4px',
                                                borderRadius: '5px',
                                                color: '#fff',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                width: 'fit-content',
                                                position: 'relative',
                                                zIndex: '-1',
                                                marginInline: 'auto'
                                            }}>Partially Paid</p>
                                        </td>
                                        <td>
                                            <Link onClick={(()=>paymentFunction(1))} style={{
                                                color: 'var(--primary-color)'
                                            }}>Pay Now</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PaymentList
