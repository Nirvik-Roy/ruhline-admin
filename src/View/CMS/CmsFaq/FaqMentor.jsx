import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import crossIcon from '../../../assets/content.svg'
import './CmsFaq.css'
import Input from '../../../Components/Input'
import Textarea from '../../../Components/Textarea.jsx'
import { useNavigate } from 'react-router-dom'
import { deleteCmsData, editAllCmsData, getAllCmsData, postAllCmsData } from '../../../utils/cms.js'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import AddFaqModal from '../../Modal/AddFaqModal.jsx'
import toast from 'react-hot-toast'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor.jsx'
import EditFaqModal from '../../Modal/EditFaqModal.jsx'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
import CustomTextEditor2 from '../../../Components/CustomTextEditor/CustomTextEditor2.jsx'
const FaqMentor = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [faqData, setfaqData] = useState();
    const [faqId, setfaqId] = useState()
    const [addModal, setaddModal] = useState(false)
    const [editModal, setEditModal] = useState(false);
    const [deleteId, setdeleteId] = useState();
    const [actions, setactions] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/admin/faq?page_type=mentor');
            setfaqData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const mentorFaqAdd = async (data) => {
        if (data?.heading != '' && data?.description != '') {
            try {
                setloading(true);
                const res = await postAllCmsData('/admin/faq', {
                    page_type: 'mentor',
                    heading: data?.heading,
                    description: data?.description
                })
                if (res?.success) {
                    setaddModal(false)
                    fetchData()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz fill the fields')
        }
    }

    const menteeFaqEdit = async (data) => {
        if (data?.heading != '' && data?.description != '' && faqId) {
            try {
                setloading(true);
                const res = await editAllCmsData('/admin/faq', {
                    page_type: 'mentor',
                    heading: data?.heading,
                    description: data?.description
                }, faqId)
                if (res?.success) {
                    setEditModal(false)
                    fetchData()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz fill the fields')
        }
    }

    const handleDelete = (id) => {
        setdeleteId(id)
        setdeleteModal(true)
    }

    const deleteFAq = async () => {
        setloading(true)
        if (deleteId) {
            try {
                const result = await deleteCmsData('/admin/faq', deleteId);
                console.log(result)
                if (result.success) {
                    fetchData()
                    setdeleteModal(false)
                    setactions(true)
                } else {
                    setactions(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }
    return (
        <>
            {loading && <Loaders />}
            {deleteModal && <DeleteModal onClick={deleteFAq} setdeleteModal={setdeleteModal} title={'Delete FAQ'} details={'Do you really want to delete this faq?'} />}
            {editModal && <EditFaqModal faqId={faqId} seteditModal={setEditModal} editFunc={menteeFaqEdit} />}
            {addModal && <AddFaqModal setaddModal={setaddModal} addFunction={mentorFaqAdd} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Mentee FAQ</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/faq/categories'))}>FAQ</span> / <span onClick={(() => navigate('/dashboard/cms/faq/mentee'))}>Mentee FAQ</span></small>
                    </div>

                    {/* <div className='coaches_button_wapper'>
                        <div>
                            <Button children={'Cancel'} styles={{
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '17px',
                                fontWeight: '600'
                            }} />
                        </div>

                        <div>
                            <Button children={'Save'} styles={{
                                fontSize: '15px'
                            }} />
                        </div>
                    </div> */}
                </div>

                <div className='cms_faq_wrapper'>
                    {faqData?.length <= 0 && <p style={{
                        textAlign: 'center',
                        fontWeight: '600'
                    }}>No faq data found...</p>}
                    {
                        faqData?.length > 0 && faqData?.map((e, i) => (
                            <div className='cms_faq_list'>
                                <p>FAQ {i + 1}</p>
                                <div className='cms_faq_questions_wrapper'>
                                    <Input label={'Heading'} readOnly={true} value={e?.heading} />
                                    <CustomTextEditor2 readOnly={true} label={'Description'} defaultValue={e?.description} />
                                </div>
                                <i style={{
                                    color: 'var(--primary-color)',
                                    padding: '10px 20px',
                                    background: '#eef4f7',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }} onClick={(() => {

                                    setEditModal(true)
                                    setfaqId(e?.id)
                                })} class="fa-solid fa-pen-to-square"></i>
                                <img onClick={(() => handleDelete(e?.id))} style={{
                                    cursor: 'pointer'
                                }} src={crossIcon} />
                            </div>
                        ))
                    }

                </div>


                <div onClick={(() => setaddModal(true))}>
                    <Button children={'Add FAQ'} styles={{
                        color: 'var(--text-color)',
                        border: '1px solid var(--primary-color)',
                        padding: '12px 15px',
                        background: 'transparent',
                        fontSize: '13px'
                    }} />
                </div>
            </div>
        </>
    )
}

export default FaqMentor
