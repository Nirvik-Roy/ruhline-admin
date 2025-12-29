import React from 'react'
import './Modal.css'
import tick from '../../assets/Union.svg'
import eye from '../../assets/Union (1).svg'
import Button from '../../Components/Button'
const ChangePasswordModal = ({modalFunction}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(()=>modalFunction(0))}></div>
            <div className='modal_div'>
                <h4>Change Password</h4>
                <i class="fa-solid fa-xmark" onClick={(()=>modalFunction(0))}></i>
                <form className='modal_form'>

                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>New Password <span>*</span></label>
                        <input style={{
                            padding: '0 40px 0 15px '
                        }} type='password' placeholder='*********' />
                        <img style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} src={eye} />
                    </div>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>Confirm Password <span>*</span></label>
                        <input style={{
                            padding: '0 40px 0 15px '
                        }} type='password' placeholder='*********' />
                        <img style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} src={eye} />

                        <img style={{
                            position: 'absolute',
                            top: '50px',
                            right: '40px',
                            width: '15px',
                            cursor: 'pointer'
                        }} src={tick} />
                       <small style={{
                        fontSize:'12px',
                        marginLeft:'10px'
                       }}>8+ characters</small>
                    </div>

                    <div className='change_cancel_wrapper'>
                        <button onClick={(()=>modalFunction(0))}>Cancel</button>
                        <Button children={'Change'}/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePasswordModal
