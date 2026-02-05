import React, { useState, useEffect } from 'react'
import Button from '../../../Components/Button'
import '../CmsTermsConditions/CmsTermsConditions.css'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import { useNavigate } from 'react-router-dom'
import { getAllCmsData, putAllCmsData } from '../../../utils/cms'
import Loaders from '../../../Components/Loaders/Loaders'
const CmsRefundPolicy = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [contentErrors, setcontentErrors] = useState();
    const [content, setcontent] = useState('')
    const updatePrivacy = async () => {
        try {
            setloading(true)
            const res = await putAllCmsData('/admin/legal-page/refund-policy', {
                content: `${content}`
            });
            setcontentErrors(res)
        } catch (err) {
            console.log(err);
        } finally {
            setloading(false)
        }
    }

    const getdata = async () => {
        try {
            setloading(true)
            const res = await getAllCmsData('/admin/legal-page/refund-policy');
            setcontent(res?.data?.content);
        } catch (err) {
            console.log(err);
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        getdata()
    }, [])
    return (
        <>
        {loading && <Loaders/>}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Refund Policy</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/refund-policy'))}>Refund Policy</span></small>
                    </div>

                    <div className='coaches_button_wapper'>
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
                            <Button onClick={updatePrivacy} children={'Save'} styles={{
                                fontSize: '15px'
                            }} />
                        </div>
                    </div>
                </div>
                <div className='custom_editor_wrapper'>
                    <CustomTextEditor defaultValue={content} onChange={((data) => setcontent(data))} label={'Refund Policy Description'} required={true} />
                    {contentErrors?.content && <small style={{
                        color: 'red',
                        marginTop: '10px',
                        marginLeft: '15px',
                    }}>*{contentErrors?.content && contentErrors?.content[0]}</small>}
                </div>

            </div>
        </>
    )
}

export default CmsRefundPolicy
