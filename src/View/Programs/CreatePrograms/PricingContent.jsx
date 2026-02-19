import React from 'react'
import Input from '../../../Components/Input'

const PricingContent = ({ staticdata, handleChange, programErrors }) => {
    return (
        <>
            <div className='other_details_grid_wrapper'>
                <div className='input_form' style={{
                    gap: '0'
                }}>
                    <label>Original Price(SAR) <span>*</span></label>
                    <Input onChange={handleChange} name={'originalPrice'} value={staticdata.originalPrice} />
                    {programErrors?.original_price && <small style={{
                        color: 'red',
                        fontSize: '12px',
                    }}>*{programErrors?.original_price[0]}</small>}
                </div>

                <div className='input_form' style={{
                    gap: '0'
                }}>
                    <label>Sale Price <span>*</span></label>
                    <Input name={'salePrice'} onChange={handleChange} value={staticdata.salePrice} />
                    {programErrors?.sale_price && <small style={{
                        color: 'red',
                        fontSize: '12px',
                    }}>*{programErrors?.sale_price[0]}</small>}
                </div>
            </div>
        </>
    )
}

export default PricingContent
