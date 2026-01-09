import React from 'react'
import Button from '../../../Components/Button'
import './IntermediateSteps.css'
import Input from '../../../Components/Input'
import crossIcon from '../../../assets/content.svg'
import Textarea from '../../../Components/Textarea'
import { useNavigate } from 'react-router-dom'
const ValuesIntermediate = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Values Intermediate Page</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate/values-intermediate'))}>Values Intermediate Page</span></small>
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
                    <Input label={'Headline'} required={'true'} placeholder={'What are Values?'} />
                </div>


                <div className='cms_faq_wrapper'>
                    <div className='cms_faq_list'>
                        <p>Point 1</p>
                        <div className='cms_faq_questions_wrapper'>

                            <Textarea label={'Description'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                        </div>
                        <img src={crossIcon} />
                    </div>


                    <div className='cms_faq_list'>
                        <p>Point 2</p>
                        <div className='cms_faq_questions_wrapper'>

                            <Textarea label={'Description'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                        </div>
                        <img src={crossIcon} />
                    </div>
                </div>


                <div>
                    <Button children={'Add Point'} styles={{
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

export default ValuesIntermediate
