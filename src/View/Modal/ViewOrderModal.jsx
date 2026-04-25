import React, { useEffect, useState } from 'react'
import { getSingleBillingDetails } from '../../utils/billings'
import Loaders from '../../Components/Loaders/Loaders'
import ModalLoader from '../../Components/Loaders/ModalLoader'

const ViewOrderModal = ({ id, setviewModal }) => {
    const [billingDetails, setbillingDetails] = useState([])
    const [loading, setloading] = useState(false)

    const fetchBillingDetails = async () => {
        setloading(true)
        const res = await getSingleBillingDetails(id)
        if (res?.success) {
            setbillingDetails(res?.data)
        }
        setloading(false)
    }
    useEffect(() => {
        fetchBillingDetails()
    }, [])
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setviewModal(false))}></div>
            <div className='modal_div' style={{
                minHeight:'30vh'
            }}>
            {loading && <ModalLoader/>}
            <>
                <h4>#{billingDetails?.id} <span style={billingDetails?.status == 'unpaid' ? {
                    fontSize: '11px',
                    fontWeight
                        : '600',
                    padding: '3px 5px',
                    borderRadius: '3px',
                    color: '#fff',
                    background: 'red',
                    textTransform: 'capitalize'
                } : {
                    fontSize: '11px',
                    fontWeight
                        : '600',
                    padding: '3px 5px',
                    borderRadius: '3px',
                    color: '#fff',
                    background: 'green',
                    textTransform: 'capitalize'
                }
                }>{billingDetails?.status}</span></h4>
                <i class="fa-solid fa-xmark" onClick={(() => setviewModal(false))}></i>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                    marginTop: '20px'
                }}>
                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Purchase Date</strong>
                        <span>{new Date(billingDetails?.created_at)
                            .toLocaleString("en-IN", { dateStyle: "medium",  timeZone: 'utc' })}</span>
                    </p>


                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Customer Name:</strong>
                        <span>{billingDetails?.customer?.user?.name}</span>
                    </p>

                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Customer Email:</strong>
                        <span>{billingDetails?.customer?.user?.email}</span>
                    </p>

                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Coach Assigned:</strong>
                        <span>{billingDetails?.coach?.name}</span>
                    </p>

                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Amount:</strong>
                        <span>{billingDetails?.currency} {billingDetails?.total_amount}</span>
                    </p>
                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong style={{
                            fontSize:'12px',
                            color:'red'
                        }}>Stripe Checkout Session id:</strong>
                        <span style={{
                            wordBreak:'break-all',
                            whiteSpace:'normal',
                            wordWrap:'normal',
                            fontSize:'12px'
                        }}> {billingDetails?.stripe_checkout_session_id}</span>
                    </p>

                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong style={{
                            fontSize: '12px',
                            color: 'red'

                        }}>Stripe Payment Intent id:</strong>
                        <span style={{
                            wordBreak: 'break-all',
                            whiteSpace: 'normal',
                            wordWrap: 'normal',
                            fontSize:'12px'
                        }}> {billingDetails?.stripe_payment_intent_id}</span>
                    </p>

                </div>

            </>
            </div>
        </>
    )
}

export default ViewOrderModal
