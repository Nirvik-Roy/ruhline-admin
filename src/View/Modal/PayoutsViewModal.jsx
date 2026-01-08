import React from 'react'

const PayoutViewModal = ({setmodalIsOpen}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setmodalIsOpen(false))}></div>
            <div className='modal_div'>
                <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>
                <div className='payout_content_wrapper'>
                    <ul>
                        <li><strong>Coach Name:</strong>Bidisha Bhowmick</li>
                        <li><strong>Coach ID:</strong>#Co456666</li>
                        <li><strong>Program:</strong>Program 1</li>
                        <li><strong>Commission %</strong>10</li>
                        <li><strong>Payout Frequency:</strong>7 days</li>
                        <li><strong>Paid Amount:</strong>SAR300</li>
                        <li><strong>Pending Payouts:</strong>SAR100</li>
                        <li><strong>Status:</strong><span style={{
                            background: 'rgba(224, 173, 34, 1)',
                            padding: '4px',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: '400',
                            width: 'fit-content'
                        }}>Partially Paid</span></li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default PayoutViewModal
