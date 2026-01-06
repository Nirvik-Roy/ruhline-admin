import React, { useState } from 'react'

const CoachCommission = () => {
    const [radioValue, setradioValue] = useState('Global Commission')

    return (
        <>
            <div className='occurence_radio_wrapper'>
                <div className='occurence_radio'>
                    <input value={'Global Commission'} onClick={(() => setradioValue('Global Commission'))} checked={radioValue === 'Global Commission'} type='radio' />
                    <label>Global Commission</label>
                </div>

                <div className='occurence_radio'>
                    <input value={'Custom'} onClick={(() => setradioValue('Custom'))} checked={radioValue === 'Custom'} type='radio' />
                    <label>Custom</label>
                </div>
            </div>

            {radioValue === 'Global Commission' && <p style={{
                fontWeight: '500',
                color: 'var(--text-color)',
                margin: '20px 0',
                fontSize: '15px'
            }}>Commission % : 30 </p>}

            {radioValue === 'Custom' &&
                <div className='occurence_form_wrapper'>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '13px'
                        }}>Select Commission (%)<span>*</span></label>
                        <select>
                            <option>30</option>
                        </select>
                    </div>
                </div>}
        </>
    )
}

export default CoachCommission
