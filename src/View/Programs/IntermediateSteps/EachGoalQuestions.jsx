import React from 'react'
import Button from '../../../Components/Button'
import './IntermediateSteps.css'
import Input from '../../../Components/Input'
import crossIcon from '../../../assets/content.svg'
import Textarea from '../../../Components/Textarea'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
const EachGoalQuestions = () => {
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Questions for each goal - why? Intermediate Page</h2>
                        <small>Programs / Intermediate Steps / Questions for each goal - why? Intermediate Page</small>
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
                    <Input label={'Headline'} required={'true'} placeholder={'You Need To Stop To Get Started.'} />
                    <Input label={'Quote 1'} placeholder={'Reset, to recharge & restart.'} />
                    <Input label={'Sub-heading 1'} placeholder={'Setting Goals'} />
                </div>


                <div className='cms_faq_wrapper'>
                    <div className='cms_faq_list'>
                        <p>Option 1</p>
                        <div className='cms_faq_questions_wrapper'>

                            <Textarea label={'Description'} placeholder={'This could take hours or days become comfortable with this. '} />
                        </div>
                        <img src={crossIcon} />
                    </div>


                    <div className='cms_faq_list'>
                        <p>Option 2</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Textarea label={'Description'} placeholder={"Don't let any future goals come in to focus yet."} />
                        </div>
                        <img src={crossIcon} />
                    </div>
                </div>


                <div>
                    <Button children={'Add option'} styles={{
                        color: 'var(--text-color)',
                        border: '1px solid var(--primary-color)',
                        padding: '12px 15px',
                        background: 'transparent',
                        fontSize: '13px'
                    }} />
                </div>

                <div className='values_inputs_wrapper462'>

                    <Input label={'Sub-heading 1'} placeholder={'Setting Goals'} />
                    <CustomTextEditor label={'Description'}/>

                </div>
            </div>
        </>
    )
}

export default EachGoalQuestions
