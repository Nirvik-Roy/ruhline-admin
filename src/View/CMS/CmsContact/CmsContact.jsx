import React, { Activity, lazy, Suspense, useState, useEffect, useRef } from 'react'
import Pagination from '../../../Components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import ellipse from '../../../assets/_MoreIcon_.svg'
import ContactInqueriesModal from '../../Modal/ContactInqueriesModal.jsx'
import { deleteContactEnquires, getAllContactEnquires } from '../../../utils/contactEnquires.js'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
const CmsContact = () => {
    const [index, setIndex] = useState([]);
    const dropdownRef = useRef(null);
    const [isModal, setisModal] = useState(false);
    const [loading, setIsloading] = useState(false);
    const [contactData, setcontactData] = useState([]);
    const [deleteId, setdeleteId] = useState();
    const [deleteModal, setdeletModal] = useState(false)
    const [contactId, setContactId] = useState('')
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    const fetchContact = async () => {
        setIsloading(true)
        try {
            const result = await getAllContactEnquires();
            setcontactData(result.data);
        } catch (err) {
            console.log(err)
        } finally {
            setIsloading(false)
        }
    }
    useEffect(() => {
        fetchContact()
    }, [])


    const deleteContactEnquiresFunc = async () => {
        setIsloading(true)
        if (deleteId) {
            try {
                const result = await deleteContactEnquires(deleteId);
                console.log(result)
                if (result.success) {
                    fetchContact()
                    setdeletModal(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsloading(false)
            }
        }
    }
    const handleDelete = (id) => {
        setdeletModal(true)
        setdeleteId(id)
    }


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIndex([]);
        }
    };


    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            {loading && <Loaders />}
            {deleteModal && <DeleteModal details={'Do you really want to delete this contact enquiry?'} title={'Delete contact enquiry'} setdeleteModal={setdeletModal} onClick={deleteContactEnquiresFunc} />}
            {isModal && <ContactInqueriesModal contactId={contactId} setisModal={setisModal} />}

            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Contact Inquiries</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/contact-queries'))}>Contact Inquiries</span></small>

                    </div>
                </div>
                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {contactData.length > 0 ? <tbody>
                            {contactData?.map((e, i) => (
                                <tr>
                                    <td>
                                        {e?.name}
                                    </td>
                                    <td>{e?.email}</td>
                                    <td>+{e?.phone_country_code?.phone_code} {e?.phone}</td>
                                    <td>{e?.message}</td>
                                    <td ref={dropdownRef}>
                                        <img onClick={((e) =>{ 
                                            e.stopPropagation()
                                            indexFunction(i)})} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            bottom: '-75px'
                                        }}>
                                            <p onClick={(() => {
                                                setisModal(!isModal);
                                                setContactId(e?.id)
                                            })}>View</p>
                                            <p onClick={(() => handleDelete(e?.id))}>Delete</p>
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody> : <td colSpan={12}>No contact details found</td>}
                    </table>
                </div>
                <Pagination />
            </div>
        </>
    )
}

export default CmsContact
