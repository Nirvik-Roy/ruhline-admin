import React, { useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import CustomTextEditor from '../../Components/CustomTextEditor/CustomTextEditor'
const AddFaqModal = ({ addFunction, setaddModal, faqloading }) => {
    const [description, setdescription] = useState();
    const [heading, setheading] = useState('');
    return (
        <>
            <div className='modal_wrapper'></div>
            <div className='modal_div'>
                <h4>Add FAQ</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setaddModal(false))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <div style={{
                            gridColumn: '1/-1'
                        }}>
                            <Input onChange={((e) => setheading(
                                e.target.value))} name={'heading'} label={'Heading'} type={'text'} required={true} placeholder={'Enter faq heading'} />
                        </div>

                        <div style={{
                            gridColumn: '1/-1'
                        }}>
                            <CustomTextEditor onChange={((data) => setdescription(data))} label={'Description'} defaultValue={description} />
                        </div>
                    </div>
                    <div onClick={(() => addFunction({
                        description,
                        heading
                    }))} className='' >
                        <Button loading={faqloading} loadingText='Adding...' styles={{
                            marginLeft:'auto'
                        }} children={'Add'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddFaqModal
