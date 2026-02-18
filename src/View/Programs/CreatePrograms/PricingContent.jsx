import React from 'react'
import Input from '../../../Components/Input'

const PricingContent = ({ staticdata, handleChange }) => {
    return (
        <>
            <div className='other_details_grid_wrapper'>
                <div className='input_form' style={{
                    gap: '0'
                }}>
                    <label>Original Price(SAR) <span>*</span></label>
                    <Input onChange={handleChange} name={'originalPrice'} value={staticdata.originalPrice} />
                </div>

                <div className='input_form' style={{
                    gap: '0'
                }}>
                    <label>Sale Price <span>*</span></label>
                    <Input name={'salePrice'} onChange={handleChange} value={staticdata.salePrice} />
                </div>
            </div>
        </>
    )
}

export default PricingContent
