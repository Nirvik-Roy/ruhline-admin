import React, { useState } from 'react'
import Input from '../../../Components/Input'

const CoachCommission = ({ data, handleChange, staticdata, setcommissionTab, commissionTab }) => {
    return (
        <>

            <div className='occurence_radio_wrapper'>
                <div className='occurence_radio'>
                    <input value={'Global Commission'} onClick={(() => setcommissionTab('Global Commission'))} checked={commissionTab === 'Global Commission'} type='radio' />
                    <label>Global Commission</label>
                </div>

                <div className='occurence_radio'>
                    <input value={'Custom'} onClick={(() => setcommissionTab('Custom'))} checked={commissionTab === 'Custom'} type='radio' />
                    <label>Custom</label>
                </div>
            </div>

            {commissionTab === 'Global Commission' && <p style={{
                fontWeight: '500',
                color: 'var(--text-color)',
                margin: '20px 0',
                fontSize: '15px'
            }}>Commission % : {data?.global_commission_rate} </p>}

            {commissionTab === 'Custom' &&
                <div className='occurence_form_wrapper'>
                    <Input onChange={handleChange} value={staticdata.customcommisionRate} name={'customcommisionRate'} label={'Commission rate'} required={true} placeholder={'Enter commission rate'} />
                </div>}
        </>
    )
}

export default CoachCommission
