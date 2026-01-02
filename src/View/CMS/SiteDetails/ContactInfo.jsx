import React from 'react'
import Input from '../../../Components/Input'
const ContactInfo = () => {
    return (
        <>
            <div className='contact_info_grid_Wrapper'>
                <Input label={'Address Line 1'} required={true} defaultValue={'20 Cooper Square'} />
                <Input label={'Address Line 2'} defaultValue={'Marquardt Route'} />
                <Input label={'Landmark'} defaultValue={'Lake Oscar'} />
                <Input label={'City'} required={true} defaultValue={'Lake Oscar'} />
                <div className='input_form'>
                    <label>State <span>*</span></label>
                    <select>
                        <option>Illionis</option>
                    </select>
                </div>
                <Input label={'Zipcode'} required={true} defaultValue={'62704'} />
            </div>
        </>
    )
}

export default ContactInfo
