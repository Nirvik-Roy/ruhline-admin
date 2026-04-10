import React, { useEffect, useState } from 'react'
import './Payouts.css'
import Pagination from '../../Components/Pagination/Pagination'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import eye from '../../assets/elements.svg'
import PayoutViewModal from '../Modal/PayoutsViewModal'
import AddCommisionModal from '../Modal/AddCommisionModal'
import { getPayoutFrequency, getPayoutList } from '../../utils/payouts'
import Loaders from '../../Components/Loaders/Loaders'
import PayoutFrequencyModal from '../Modal/PayoutFrequencyModal'
import { useNavigate } from 'react-router-dom'
const Payouts = () => {
    const [modalisOpen, setmodalIsOpen] = useState(false);
    const [commission, setcommission] = useState(false);
    const [loading, setloading] = useState(false);
    const [modalIsOpen2, setmodalIsOpen2] = useState(false)
    const [payoutList, setpayoutList] = useState([]);
    const navigate = useNavigate()
    const [payoutFrequency, setpayoutFrequency] = useState(false)

    const getFrequency = async () => {
        setloading(true)
        const res = await getPayoutFrequency()
        setpayoutFrequency(res.payout_frequency)
        setloading(false)
    }

    useEffect(() => {
        getFrequency()
    }, [])
    const callPayoutFunction = async () => {
        setloading(true)
        const res = await getPayoutList()
        console.log(res)
        setpayoutList(res)
        setloading(false)
    }

    useEffect(() => {
        callPayoutFunction()
    }, [])

    return (
        <>
            {commission && <AddCommisionModal setcommission={setcommission} />}
            {modalisOpen && <PayoutViewModal setmodalIsOpen={setmodalIsOpen} />}
            {modalIsOpen2 && <PayoutFrequencyModal payoutFrequency={payoutFrequency} callPayoutFunction={callPayoutFunction} setmodalIsOpen={setmodalIsOpen2} />}
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Payouts</h2>
                    </div>
                    <div className='coaches_button_wapper'>
                        <div className='total_orders_select_wrapper'>
                            <div onClick={(() => setmodalIsOpen2(true))} style={{
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <p>
                                    Payout frequency
                                </p>
                            </div>
                        </div>

                        <div className='total_orders_select_wrapper'>
                            <div onClick={(() => setcommission(true))} style={{
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <p>
                                    Global Commission
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='payouts_payments_summary_wrapper'>
                    <div className='payouts_summary'>
                        <h4>Total payments received</h4>
                        <h1>SAR {payoutList?.summary?.total_payment_received || 0}</h1>
                    </div>

                    <div className='payouts_summary'>
                        <h4>Total payments paid</h4>
                        <h1>SAR {payoutList?.summary?.total_payments_paid || 0}</h1>
                    </div>

                    <div className='payouts_summary'>
                        <h4>Total payments pending</h4>
                        <h1>SAR {payoutList?.summary?.total_pending_payments || 0}</h1>
                    </div>
                </div>
                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Coach</th>
                                <th>Pending Payouts</th>
                                <th>Paid Amounts</th>
                                <th>Payment Status </th>
                                <th style={{
                                    textAlign: 'center'
                                }}>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payoutList?.groups?.map((element) => {
                                return (
                                    <>
                                        {element?.items?.map((e) => (
                                            <tr>
                                                <td>
                                                    <div className='customer_wrapper' style={{
                                                        justifyContent: 'flex-start'
                                                    }}>
                                                        <div className='customer_img_div'>
                                                            <img src={img} />
                                                        </div>
                                                        <div className='customer_details_wrapper'>
                                                            <p>{e?.coach?.name}</p>
                                                            <p>#{e?.coach?.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{e?.currency} {e?.coach_earning_amount}</td>
                                                <td>{e?.currency} 300</td>
                                                <td>
                                                    <p style={e?.status == 'paid' ? {
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
                                                        textTransform: 'capitalize'
                                                    }}>{e?.status}</p>
                                                </td>
                                                <td>
                                                    <img onClick={(() => {
                                                        navigate(`/dashboard/payouts/payment-list/${e?.id}`)
                                                    })} style={{
                                                        position: 'relative',
                                                        zIndex: '0'
                                                    }} src={eye} />
                                                </td>
                                            </tr>
                                        ))}

                                    </>
                                )
                            })}

                            {/* <tr>
                                <td colSpan={12} style={{
                                    padding: '15px 20px',
                                    background: 'rgba(217, 217, 217, 1)',
                                    color: 'var(--text-color)',
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    textAlign: 'left'
                                }}>Month: January, 2026</td>
                            </tr> */}

                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </>
    )
}

export default Payouts
