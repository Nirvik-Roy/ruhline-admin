import React, { useEffect, useState } from 'react'
import Loaders from '../../Components/Loaders/Loaders';
import { getSingleContactEnquires } from '../../utils/contactEnquires';

const ContactInqueriesModal = ({ setisModal, contactId }) => {
  const [loading, setIsloading] = useState(false);
  const [singleContactData, setsingleContactData] = useState()
  const fetchSingle = async (id) => {
    setIsloading(true)
    try {
      const result = await getSingleContactEnquires(id);
      setsingleContactData(result);
      console.log(result)
    } catch (err) {
      console.log(err)
    } finally {
      setIsloading(false)
    }
  }
  useEffect(() => {
    if (contactId) {
      fetchSingle(contactId)
    }
  }, [contactId])

  console.log(singleContactData)
  
  return (
    <>
      {loading && <Loaders />}
      <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
      <div className='modal_div'>
        <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
        <div className='contact_modal_name_wrapper'>
          <p>Name: <span>{singleContactData?.name}</span></p>
          <p>Email: <span>{singleContactData?.email}</span></p>
          <p>Phone: <span>+{singleContactData?.phone_country_code?.phone_code} {singleContactData?.phone}</span></p>
        </div>
        <div className='contact_message_wrapper'>
          <p>Message: </p>
          <span>{singleContactData?.message}</span>
        </div>
      </div>
    </>
  )
}

export default ContactInqueriesModal
