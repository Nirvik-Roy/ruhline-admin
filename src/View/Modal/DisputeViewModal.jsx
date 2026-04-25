import React from 'react'
import Button from '../../Components/Button'
import ModalLoader from '../../Components/Loaders/ModalLoader'
const DisputeViewModal = ({ setdisputes, singleDisputeData, changeDisputeStatus, loading }) => {

    return (
        <>
            <div className='modal_wrapper' onClick={(() => setdisputes(false))}></div>
            <div className='modal_div' style={{
                minHeight:'30vh'
            }}>
                {loading && <ModalLoader/>}
               {!loading && <>
                <h4>#{singleDisputeData?.ticket_number}</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setdisputes(false))}></i>
                <div className='modal_disputes_details'>
                    <p>Raised By: <span>{singleDisputeData?.customer?.name}</span></p>
                    <p>Date & Time: <span>{new Date(singleDisputeData?.created_at)
                        .toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span></p>
                    <p>Dispute Category: <span style={{
                        textTransform: 'capitalize'
                    }}>{singleDisputeData?.category}</span></p>
                    {singleDisputeData?.program && <p>Program: <span>{singleDisputeData?.program?.name}</span></p>}

                    {singleDisputeData?.coach && <p>Coach: <span>{singleDisputeData?.coach?.name}</span></p>}
                    <p>Subject: <span>{singleDisputeData?.subject}</span></p>
                    <p>Dispute Description:</p>
                    <span>{singleDisputeData?.description}</span>
                </div>

                <div className='download_attachment_wrapper'>
                    <Button children={'Download Attachments'} />
                </div>
              { singleDisputeData?.status == 'open' && <div className='change_cancel_wrapper' onClick={(() => changeDisputeStatus())}>
                    <Button children={'Mark as solved'} />
                </div>}

                {singleDisputeData?.status == 'closed' && <div className='change_cancel_wrapper'>
                    <Button styles={{
                        backgroundColor:'green'
                    }} children={'Resolved'} />
                </div>}
                </>}
            </div>
        </>
    )
}

export default DisputeViewModal
