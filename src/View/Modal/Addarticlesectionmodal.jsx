import React from 'react'
import Button from '../../Components/Button.jsx'
const Addarticlesectionmodal = ({setisModal}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
            <h4>Add Section</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div className='add_section_checkbox_Wrapper466'>
                    <div className='article_section_checkbox'>
                        <input type='checkbox'/>
                        <p>Image</p>
                    </div>

                     <div className='article_section_checkbox'>
                        <input type='checkbox'/>
                        <p>Heading</p>
                    </div>

                     <div className='article_section_checkbox'>
                        <input type='checkbox'/>
                        <p>Description</p>
                    </div>

                     <div className='article_section_checkbox'>
                        <input type='checkbox'/>
                        <p>Button</p>
                    </div>
                </div>

                <Button children={'Add'} styles={{
                    marginLeft:'auto'
                }}/>
            </div>
        </>
    )
}

export default Addarticlesectionmodal
