import React from 'react'
import Button from '../../../Components/Button'
import './IntermediateSteps.css'
import Input from '../../../Components/Input'
import crossIcon from '../../../assets/content.svg'
import Textarea from '../../../Components/Textarea'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'

const CommonMistakes = () => {
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Eight most common mistakes Intermediate Page</h2>
                        <small>Programs / Intermediate Steps / Eight most common mistakes Intermediate Page</small>
                    </div>
                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setaddCustomer(true))}>
                            <Button children={'Cancel'} styles={{
                                fontSize: '13px',
                                color: 'var(--text-color)',
                                background: 'transparent',
                                border: 'none'
                            }} />
                        </div>
                        <div onClick={(() => setaddCustomer(true))}>
                            <Button children={'Save'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='values_inputs_wrapper462'>
                    <Input label={'Headline 1'} required={'true'} placeholder={'Questions for each goal - why?'} />
                    <CustomTextEditor label={'Description'} required={true} />
                    <Input label={'Headline 2'} required={'true'} placeholder={'For every goal you have, answer these 3 questions:'} />

                </div>


                <div className='cms_faq_wrapper'>
                    <div className='cms_faq_list'>
                        <p>Mistake 1</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Input label={'Heading'} placeholder={'Motivation'} />
                            <Textarea label={'Description'} placeholder={'Why do you want to achieve this? '} />
                        </div>
                        <img src={crossIcon} />
                    </div>


                    <div className='cms_faq_list'>
                        <p>Mistake 2</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Input label={'Heading'} placeholder={'Reward'} />
                            <Textarea label={'Description'} placeholder={'What will you do to reward yourself when you achieve this?'} />
                        </div>
                        <img src={crossIcon} />
                    </div>
                </div>


                <div>
                    <Button children={'Add step'} styles={{
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

export default CommonMistakes
