import React from 'react'

const PayoutViewModal = ({ paymentFunction, singlePayout, payoutFrequency }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => paymentFunction(0))}></div>
            <div className='modal_div'>
                <i class="fa-solid fa-xmark" onClick={(() => paymentFunction(0))}></i>
                <div className='payout_content_wrapper'>
                    <ul>
                        <li><strong>Coach Name:</strong>{singlePayout?.coach?.name}</li>
                        <li><strong>Coach ID:</strong>#{singlePayout?.coach?.id}</li>
                        <li><strong>Program:</strong>{singlePayout?.program?.name}</li>
                        <li><strong>Commission %</strong>{singlePayout?.commission_rate}</li>
                        <li style={{
                            textTransform:'capitalize'
                        }}><strong>Payout Frequency:</strong>{payoutFrequency}</li>
                        <li><strong>Total Amount:</strong>{singlePayout?.currency} {singlePayout?.order_total_amount}</li>
                        <li><strong>Coach Amount:</strong>{singlePayout?.currency} {singlePayout?.coach_earning_amount}</li>
                        <li><strong>Status:</strong><span style={singlePayout?.status == 'paid' ? {
                            background: 'green',
                            padding: '4px',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: '400',
                            width: 'fit-content',
                            textTransform: 'capitalize'
                        } : {
                            background: 'red',
                            padding: '4px',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: '400',
                            width: 'fit-content',
                            textTransform: 'capitalize'
                        }
                        }>{singlePayout?.status}</span></li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default PayoutViewModal
