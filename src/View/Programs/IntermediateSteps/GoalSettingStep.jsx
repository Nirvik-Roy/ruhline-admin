import React from 'react'
import Button from '../../../Components/Button'
import './IntermediateSteps.css'
import Input from '../../../Components/Input'
import crossIcon from '../../../assets/content.svg'
import Textarea from '../../../Components/Textarea'

const GoalSettingStep = () => {
  return (
    <>
         <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Goal Settings Intermediate Page</h2>
                        <small>Programs / Intermediate Steps / Goal Settings Intermediate Page</small>
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
                    <Input label={'Headline'} required={'true'} placeholder={'The Y Method'} />
                </div>


                <div className='cms_faq_wrapper'>
                    <div className='cms_faq_list'>
                        <p>Step 1</p>
                        <div className='cms_faq_questions_wrapper'>
                         
                            <Textarea label={'Description'} placeholder={'Reflection (Buckets & Test) '} />
                        </div>
                        <img src={crossIcon} />
                    </div>


                    <div className='cms_faq_list'>
                        <p>Step 2</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Textarea label={'Description'} placeholder={'Brainstorm (Action & Time)'} />
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

export default GoalSettingStep
