import React, { useState } from 'react'
import Button from '../../Components/Button.jsx'
import toast from 'react-hot-toast';
const Addarticlesectionmodal = ({ setisModal, setdynamicformstructure, dynamicFormstructure }) => {

    const [imageCheck, setimageCheck] = useState(false);
    const [headingCheck, setheadingCheck] = useState(false);
    const [descriptioncheck, setdescriptionCheck] = useState(false);
    const [buttonCheck, setbuttonCheck] = useState(false);

    const addFunction = () => {
        if (imageCheck || headingCheck || descriptioncheck || buttonCheck) {
            const data = {}
            data.id = Date.now()
            data.section = `Section ${(dynamicFormstructure?.length) + 1}`
            if (imageCheck) {
                data.uploadImage = '',
                data.image_position = ''
            }
            if (headingCheck) {
                data.heading = ''
            }
            if (descriptioncheck) {
                data.description = ''
            }
            if (buttonCheck) {
                data.buttonName = '';
                data.buttonUrl = '';
            }
            setdynamicformstructure([
                ...dynamicFormstructure,
                data
            ])
            setisModal(false)
        } else {
            toast.error('You need select atleast one option...')
        }
    }
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Section</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div className='add_section_checkbox_Wrapper466'>
                    <div className='article_section_checkbox'>
                        <input onChange={(() => setimageCheck(!imageCheck))} checked={imageCheck} type='checkbox' />
                        <p>Image</p>
                    </div>

                    <div className='article_section_checkbox'>
                        <input type='checkbox' onChange={(() => setheadingCheck(!headingCheck))} checked={headingCheck} />
                        <p>Heading</p>
                    </div>

                    <div className='article_section_checkbox'>
                        <input onChange={(() => setdescriptionCheck(!descriptioncheck))} checked={descriptioncheck} type='checkbox' />
                        <p>Description</p>
                    </div>

                    <div className='article_section_checkbox'>
                        <input onChange={(() => setbuttonCheck(!buttonCheck))} checked={buttonCheck} type='checkbox' />
                        <p>Button</p>
                    </div>
                </div>
                <div onClick={(() => addFunction())}>

                    <Button children={'Add'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default Addarticlesectionmodal
