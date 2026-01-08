import React, { useState } from 'react'
import upload from '../../assets/Vector (8).svg'
import Button from '../../Components/Button'
const SinglePayModal = ({paymentFunction}) => {
    const [enable, setenable] = useState(true)
    return (
        <>
            <div className='modal_wrapper' onClick={(() => paymentFunction(0))}></div>
            <div className='modal_div'>
                <h4>#Order56666</h4>
                <i class="fa-solid fa-xmark" onClick={(() => paymentFunction(0))}></i>
                <div className='single_pay_wrapper'>
                    <div className='enbale_wrapper'>
                        <p>Mark as Paid</p>
                        <div onClick={(() => { setenable(!enable) })} className={enable ? 'enable_toggle_wrapper' : 'enable_toggle_wrapper2'} style={enable ? { background: 'var(--primary-color)' } : { background: '#293e5f' }}>
                            {enable ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i>}
                            <div className='toggle_circle' ></div>
                        </div>
                    </div>

                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',
                            fontWeight: '600'
                        }}>Upload receipt<span>*</span></label>

                        <div className='files_upload_wrapper'>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            <input type='file' />
                        </div>
                    </div>

                    <Button children={'Save'} styles={{
                    marginLeft: 'auto'
                }} />
                </div>
            </div>
        </>
    )
}

export default SinglePayModal
