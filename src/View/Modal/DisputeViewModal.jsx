import React from 'react'
import Button from '../../Components/Button'
const DisputeViewModal = ({setdisputes}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setdisputes(false))}></div>
            <div className='modal_div'>
                <h4>#ST456666</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setdisputes(false))}></i>
                <div className='modal_disputes_details'>
                    <p>Raised By: <span>Bidisha Bhowmick</span></p>
                    <p>Date: <span>27/10/2025</span></p>
                    <p>Time: <span>10:07 AM</span></p>
                    <p>Dispute Category: <span>Issue with program</span></p>
                    <p>Program: <span>Program 1</span></p>
                    <p>Subject: <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></p>
                    <p>Dispute Description:</p>
                    <span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</span>
                </div>

                <div className='download_attachment_wrapper'>
                    <Button children={'Download Attachments'}/>
                </div>
                <div className='change_cancel_wrapper' onClick={(() => setdisputes(false))}>
                    <Button children={'Mark as solved'} />
                </div>
            </div>
        </>
    )
}

export default DisputeViewModal
