import React from 'react'
import upload from '../../assets/Vector (8).svg'
import Button from '../../Components/Button'
const ChangeProfileModal = ({ modalFunction }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => modalFunction(0))}></div>
            <div className='modal_div'>
                <h4>Change Profile Picture</h4>
                <i class="fa-solid fa-xmark" onClick={(() => modalFunction(0))}></i>
                <form className='modal_form'>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>Upload Profile Picture<span>*</span></label>

                        <div className='files_upload_wrapper'>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            <input type='file' />
                        </div>
                    </div>

                    <div className='change_cancel_wrapper'>
                        <button onClick={(() => modalFunction(0))}>Cancel</button>
                        <Button children={'Change'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangeProfileModal
