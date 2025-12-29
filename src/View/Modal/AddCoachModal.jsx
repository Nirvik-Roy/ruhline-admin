import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import upload from '../../assets/Vector (8).svg'
import countryData from '../../../countries.json'
const AddCoachModal = ({ setCoachModal }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setCoachModal(false))}></div>
            <div className='modal_div'>
                <h4>Add a coach</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setCoachModal(false))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <Input label={'First Name'} required={true} placeholder={'Bidisha'} />
                        <Input label={'Last Name'} required={true} placeholder={'Bhowmick'} />
                        <Input label={'Email'} required={true} placeholder={'bidishabhowmick@gmail.com'} />
                        <div className='input_form confirm_input_form'>
                            <label>Phone no<span>*</span></label>
                            <div className='phone_input_Wrapper656'>
                                <select style={{
                                    border: 'none',
                                    borderRight: '2px solid #000',
                                    outline: 'none'
                                }}>
                                    {countryData.map((e, i) => (
                                        <option key={e.code}>{e.code}</option>
                                    ))}
                                </select>
                                <input placeholder='1234567890' />
                            </div>
                        </div>

                        <div className='input_form'>
                            <label>Gender<span>*</span></label>
                            <select>
                                <option>Female</option>
                            </select>
                        </div>

                        <div className='input_form'>
                            <label>Coach Type<span>*</span></label>
                            <select>
                                <option>Mentor</option>
                            </select>
                        </div>


                    </div>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',
                            fontWeight: '600'
                        }}>Upload Image<span>*</span></label>

                        <div className='files_upload_wrapper'>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            <input type='file' />
                        </div>
                    </div>
                    <div className='change_cancel_wrapper'>
                        <Button children={'Add'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCoachModal
