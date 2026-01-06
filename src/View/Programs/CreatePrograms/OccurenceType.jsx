import React, { useState } from 'react'

const OccurenceType = () => {
    const [radioValue, setradioValue] = useState('One Time')
    return (
        <>

            <div className='occurence_radio_wrapper'>
                <div className='occurence_radio'>
                    <input value={'One Time'} onClick={(() => setradioValue('One Time'))} checked={radioValue === 'One Time'} type='radio' />
                    <label>One time</label>
                </div>

                <div className='occurence_radio'>
                    <input value={'recurring'} onClick={(() => setradioValue('recurring'))} checked={radioValue === 'recurring'} type='radio' />
                    <label>Recurring</label>
                </div>
            </div>

            {radioValue === 'One Time' && <div className='input_form' style={{
                marginTop: '20px'
            }}>
                <label>Session Duration <span>*</span></label>
                <select>
                    <option>30mins</option>
                </select>
            </div>}

            {radioValue === 'recurring' &&
                <div className='occurence_form_wrapper'>
                    <div className='other_details_grid_wrapper'>
                        <div className='input_form'>
                            <label style={{
                                fontSize: '13px'
                            }}>Tenure <small style={{
                                fontSize: '10px'
                            }}>(weeks)</small> <span>*</span></label>
                            <select>
                                <option>SAR126</option>
                            </select>
                        </div>

                        <div className='input_form'>
                            <label style={{
                                fontSize: '13px'
                            }}>No of sessions <small style={{
                                fontSize: '10px'
                            }}>per week</small> <span>*</span></label>
                            <select>
                                <option>SAR96</option>
                            </select>
                        </div>
                    </div>

                    <div className='input_form'>
                        <label style={{
                            fontSize: '13px'
                        }}>Session Duration<span>*</span></label>
                        <select>
                            <option>30mins</option>
                        </select>
                    </div>
                </div>}
        </>
    )
}

export default OccurenceType
