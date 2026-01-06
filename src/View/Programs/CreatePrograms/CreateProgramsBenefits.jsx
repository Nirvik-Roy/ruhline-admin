import React from 'react'
import Input from '../../../Components/Input'
import Textarea from '../../../Components/Textarea'
import crossIcon from '../../../assets/content.svg'
import Button from '../../../Components/Button'
import upload from '../../../assets/Vector (8).svg'

const CreateProgramsBenefits = () => {
    return (
        <>
            <div className='dropdown_content_wrapper45'>
                <div className='dropdown_content4623'>
                    <div className='drodown_head456'>
                        <p>Benefit 1</p>
                        <img src={crossIcon} />
                    </div>
                    <Textarea label={'Description'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                </div>

                <div className='dropdown_content4623'>
                    <div className='drodown_head456'>
                        <p>Benefit 2</p>
                        <img src={crossIcon} />
                    </div>
                    <Textarea label={'Description'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                </div>


                <div className='dropdown_content4623'>
                    <div className='drodown_head456'>
                        <p>Benefit 3</p>
                        <img src={crossIcon} />
                    </div>
                    <Textarea label={'Description'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                </div>
                <Button children={'Add Another Option'} styles={{
                    border: '1px solid var(--primary-color)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-color)',
                    fontSize: '12px',
                    fontWeight: '600'
                }} />
                <div className='input_form'>
                    <label style={{
                        fontSize: '15px',
                        fontWeight: '600'
                    }}>Benefit Image</label>
                    <div className='files_upload_wrapper'>
                        <img src={upload} />
                        <p>Drag your files or <span>Browse</span></p>
                        <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                        <input type='file' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProgramsBenefits
