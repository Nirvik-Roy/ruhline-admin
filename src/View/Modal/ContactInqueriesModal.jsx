import React, { useEffect, useState } from 'react'
import Loaders from '../../Components/Loaders/Loaders';
import { getSingleContactEnquires } from '../../utils/contactEnquires';
import ModalLoader from '../../Components/Loaders/ModalLoader';

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


  return (
    <>
      <div className='modal_wrapper'></div>
      <div className='modal_div' style={{
        minHeight:'30vh'
      }}>
        {loading && <ModalLoader />}
        <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
        {!loading && <>
          <div className='contact_modal_name_wrapper'>
            <p>Name: <span>{singleContactData?.name}</span></p>
            <p>Email: <span>{singleContactData?.email}</span></p>
            <p>Phone: <span>+{singleContactData?.phone_country_code?.phone_code} {singleContactData?.phone}</span></p>
          </div>
          <div className='contact_message_wrapper'>
            <p>Message: </p>
            <span>{singleContactData?.message}</span>
          </div>
        </>}

      </div>
    </>
  )
}

export default ContactInqueriesModal
