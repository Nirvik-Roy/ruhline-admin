import React, { useState } from 'react'
import Input from '../../../Components/Input'

const CoachCommission = ({ data }) => {
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
            }}>Commission % : {data?.global_commission_rate} </p>}

            {radioValue === 'Custom' &&
                <div className='occurence_form_wrapper'>
                   <Input label={'Commission rate'} required={true} placeholder={'Enter commission rate'}/>
                </div>}
        </>
    )
}

export default CoachCommission
