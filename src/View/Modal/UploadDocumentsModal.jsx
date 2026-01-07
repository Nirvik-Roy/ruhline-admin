import React from 'react'
import Button from '../../Components/Button'
import upload from '../../assets/Vector (8).svg'
const UploadDocumentsModal = () => {
  return (
    <>
       <div className='modal_wrapper' onClick={(() => setCoachModal(false))}></div>
            <div className='modal_div'>
                <h4>Upload Documents</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setCoachModal(false))}></i>
                <form className='modal_form'>
                    <div className='input_form'>
                        <div className='files_upload_wrapper'>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            <input type='file' />
                        </div>
                    </div>
                    <div className='change_cancel_wrapper'>
                        <Button children={'Upload'} />
                    </div>
                </form>
            </div>
    </>
  )
}

export default UploadDocumentsModal
