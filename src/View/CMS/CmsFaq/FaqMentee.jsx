import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import crossIcon from '../../../assets/content.svg'
import './CmsFaq.css'
import Input from '../../../Components/Input'
import Textarea from '../../../Components/Textarea.jsx'
import { useNavigate } from 'react-router-dom'
import { getAllCmsData, postAllCmsData } from '../../../utils/cms.js'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import AddFaqModal from '../../Modal/AddFaqModal.jsx'
import toast from 'react-hot-toast'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor.jsx'
const FaqMentee = () => {
    const navigate = useNavigate();
    const [loading,setloading] = useState(false);
    const [faqData,setfaqData] = useState();
    const [addModal, setaddModal] = useState(false)
    const fetchData = async()=>{
        try{
          setloading(true);
            const res = await getAllCmsData('/admin/faq?page_type=mentee');
            setfaqData(res?.data)
        }catch(err){
            console.log(err)
        }finally{
            setloading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const menteeFaqAdd = async(data) =>{
        if(data?.heading!='' && data?.description!=''){
         try{
           setloading(true);
             const res = await postAllCmsData('/admin/faq',{
                 page_type:'mentee',
                 heading:data?.heading,
                 description:data?.description
             })
             if(res?.success){
                setaddModal(false)
                fetchData()
             }
         }catch(err){
            console.log(err)
         }finally{
            setloading(false)
         }
        }else{
            toast.error('Plz fill the fields')
        }
    }
    return (
        <>
            {loading && <Loaders/>}
            {addModal && <AddFaqModal setaddModal={setaddModal} addFunction={menteeFaqAdd}/>}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Mentee FAQ</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/faq/categories'))}>FAQ</span> / <span onClick={(()=>navigate('/dashboard/cms/faq/mentee'))}>Mentee FAQ</span></small>
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
                        textAlign:'center',
                        fontWeight:'600'
                    }}>No faq data found...</p>}
                {
                    faqData?.length > 0 && faqData?.map((e,i)=>(
                        <div className='cms_faq_list'>
                            <p>FAQ {i+1}</p>
                            <div className='cms_faq_questions_wrapper'>
                                <Input label={'Heading'} readOnly={true} value={e?.heading}/>
                                <CustomTextEditor readOnly={true} label={'Description'}  defaultValue={e?.description} />
                            </div>
                            <img src={crossIcon} />
                        </div>
                    ))
                }
                   
                </div>


                <div onClick={(()=>setaddModal(true))}>
                    <Button children={'Add another option'} styles={{
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

export default FaqMentee
