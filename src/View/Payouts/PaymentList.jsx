import React, { useEffect, useState } from 'react'
import img from '../../assets/Photo.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SinglePayModal from '../Modal/SinglePayModal'
import PaymentAllModal from '../Modal/PaymentAllModal'
import Loaders from '../../Components/Loaders/Loaders'
import { getPayoutFrequency, getSinglePayout } from '../../utils/payouts'
import { getSingleCoach } from '../../utils/coach'
import PayoutViewModal from '../Modal/PayoutsViewModal'
const PaymentList = () => {
    const [dropdown, setdropdown] = useState(false);
    const { id } = useParams()
    const [singlePayout, setsinglePayout] = useState([]);
    const [loading, setloading] = useState(false);
    const [coachId, setcoachId] = useState('')
    const [checkOutId, setcheckOutId] = useState();
    const [payoutFrequency, setpayoutFrequency] = useState(false)
    const [coachData, setcoachData] = useState([])
    const navigate  = useNavigate()

    const getFrequency = async () => {
        setloading(true)
        const res = await getPayoutFrequency()
        setpayoutFrequency(res.payout_frequency)
        setloading(false)
    }

    useEffect(() => {
        getFrequency()
    }, [])
    const getsingleCoach = async () => {
        setloading(true)
        const res = await getSingleCoach(coachId)
        setcoachData(res)
        setloading(false)
    }

    useEffect(() => {
        if (coachId) {
            getsingleCoach()
        }
    }, [coachId])


    const getSinglePayoutFunc = async () => {
        setloading(true)
        const res = await getSinglePayout(id)
        setsinglePayout(res)
        setcoachId(res?.coach?.id)
        setloading(false)
    }

    useEffect(() => {
        if (id) {
            getSinglePayoutFunc()
        }
    }, [id])

    const [payment, setPayment] = useState({
        paymentPay: false,
        editPayment: false,
        viewDetails: false
    })
    const paymentFunction = (i) => {
        setPayment({
            paymentPay: i === 1 ? true : false,
            editPayment: i === 2 ? true : false,
            viewDetails: i === 3 ? true : false
        })
    }


    return (
        <>
            {loading && <Loaders />}
            {(payment.paymentPay || payment.editPayment) && <SinglePayModal singlePayout={singlePayout} update={payment?.editPayment} getSinglePayoutFunc={getSinglePayoutFunc} checkOutId={checkOutId} paymentFunction={paymentFunction} />}

            {payment.viewDetails && <PayoutViewModal payoutFrequency={payoutFrequency} singlePayout={singlePayout} paymentFunction={paymentFunction} />}

            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>{singlePayout?.coach?.name}</h2>
                        <small onClick={(()=>navigate('/dashboard/payouts'))}>Payouts / {singlePayout?.coach?.name}</small>
                    </div>
                </div>
                <div className='payment_owner_wrapper'>
                    <img src={img} />
                    <div className='payment_owner_left'>
                        <h3 style={{
                            borderBottom: '1px solid rgba(217, 217, 217, 1)',
                            paddingBottom: '5px',
                            fontWeight: '500',
                            fontSize: '17px'
                        }}><strong>Coach ID:</strong> #{singlePayout?.coach?.id}</h3>

                        <p style={{
                            paddingBottom: '5px',
                            fontWeight: '500',
                            fontSize: '13px'
                        }}><strong>Payment Receive Mode: </strong>Bank Transfer</p>


                        {coachData?.profile?.country && <p style={{
                            paddingBottom: '5px',
                            fontWeight: '500',
                            fontSize: '13px'
                        }}><strong>Country: </strong>{coachData?.profile?.country?.name}</p>}

                        {coachData?.profile?.payment_details?.bank_name && <p style={{
                            paddingBottom: '5px',
                            fontWeight: '500',
                            fontSize: '13px'
                        }}><strong>Bank Name: </strong>{coachData?.profile?.payment_details?.bank_name}</p>}


                        {coachData?.user?.email && <p style={{
                            paddingBottom: '5px',
                            fontWeight: '500',
                            fontSize: '13px'
                        }}><strong>email: </strong>{coachData?.user?.email}</p>}

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

                        </div>
                    </div>
                    <div className='table_container'>
                        <table className='total_table_order_wrapper coaches_table_wrapper'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th> Date / Time</th>
                                    <th>Program Name</th>
                                    <th style={{
                                        textAlign: 'left'
                                    }}>Customer</th>
                                    <th>Amounts</th>
                                    <th>Payment Status</th>
                                    <th>View</th>
                                    {singlePayout?.status == 'paid' && <th>Edit</th>}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#{singlePayout?.checkout_order_id}</td>
                                    <td>{new Date(singlePayout?.created_at)
                                        .toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                                    <td>
                                        {singlePayout?.program?.name}
                                    </td>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>
                                            {/* <div className='customer_img_div'>
                                                <img src={img2} />
                                            </div> */}
                                            <div className='customer_details_wrapper'>
                                                <p>{singlePayout?.coach?.name}</p>
                                                <p>#{singlePayout?.coach?.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>SAR {singlePayout?.coach_earning_amount}</td>
                                    <td>
                                        <p style={singlePayout?.status == 'paid' ? {
                                            background: 'green',
                                            padding: '4px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            width: 'fit-content',
                                            position: 'relative',
                                            zIndex: '-1',
                                            textTransform: 'capitalize',
                                            marginInline: 'auto'
                                        } : {
                                            background: 'red',
                                            padding: '4px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            width: 'fit-content',
                                            position: 'relative',
                                            zIndex: '-1',
                                            textTransform: 'capitalize',
                                            marginInline: 'auto'
                                        }}>{singlePayout?.status}</p>
                                    </td>
                                    <td><i onClick={(() => paymentFunction(3))} style={{
                                        color: 'var(--primary-color)',
                                        cursor: 'pointer'
                                    }} class="fa-regular fa-eye"></i></td>
                                    {singlePayout?.status == 'paid' && <td><i onClick={(() => {
                                        setcheckOutId(singlePayout?.checkout_order_id)
                                        paymentFunction(2)
                                    })} style={{
                                        color: 'var(--primary-color)',
                                        cursor: 'pointer'
                                    }} class="fa-regular fa-pen-to-square"></i></td>}
                                    <td>
                                        {singlePayout?.status == 'unpaid' && <Link
                                            onClick={(() => {
                                                setcheckOutId(singlePayout?.checkout_order_id)
                                                paymentFunction(1)
                                            })}
                                            style={{
                                                color: 'var(--primary-color)',
                                                fontWeight: '600'
                                            }}>Pay Now</Link>}


                                        {singlePayout?.status == 'paid' && <Link style={{
                                            color: 'rgba(146, 146, 146, 1)',
                                            fontWeight: '600'
                                        }}>Pay Now</Link>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PaymentList
