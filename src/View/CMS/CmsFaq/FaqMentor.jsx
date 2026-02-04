import React from 'react'
import Button from '../../../Components/Button'
import crossIcon from '../../../assets/content.svg'
import './CmsFaq.css'
import Input from '../../../Components/Input'
import Textarea from '../../../Components/Textarea.jsx'
import { useNavigate } from 'react-router-dom'
const FaqMentor = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Mentor FAQ</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/faq/categories'))}>FAQ</span> / <span onClick={(() => navigate('/dashboard/cms/faq/mentor'))}>Mentor FAQ</span></small>
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
                            <Button children={'Save'} styles={{
                                fontSize: '15px'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='cms_faq_wrapper'>
                    <div className='cms_faq_list'>
                        <p>FAQ 1</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Input label={'Heading'} placeholder={'Lorem ipsum dolor sit ame'} />
                            <Textarea label={'Description'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                        </div>
                        <img src={crossIcon} />
                    </div>


                    <div className='cms_faq_list'>
                        <p>FAQ 2</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Input label={'Heading'} placeholder={'Lorem ipsum dolor sit ame'} />
                            <Textarea label={'Description'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                        </div>
                        <img src={crossIcon} />
                    </div>
                </div>


                <div>
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

export default FaqMentor
