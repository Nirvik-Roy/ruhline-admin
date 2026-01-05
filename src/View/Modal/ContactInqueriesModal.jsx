import React from 'react'

const ContactInqueriesModal = ({setisModal}) => {
  return (
    <>
      <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
      <div className='modal_div'>
        <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
        <div className='contact_modal_name_wrapper'>
          <p>Name: <span>Bidisha Bhowmick</span></p>
          <p>Email: <span>bidishab@gmail.com</span></p>
          <p>Phone: <span>+1 (234) 464-0600</span></p>
        </div>
        <div className='contact_message_wrapper'>
          <p>Message: </p>
          <span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</span>
        </div>
      </div>
    </>
  )
}

export default ContactInqueriesModal
