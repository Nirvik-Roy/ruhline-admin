import React from 'react'

const PricingContent = () => {
    return (
        <>
            <div className='other_details_grid_wrapper'>
                <div className='input_form'>
                    <label>Original Price <span>*</span></label>
                    <select>
                        <option>SAR126</option>
                    </select>
                </div>

                <div className='input_form'>
                    <label>Sale Price <span>*</span></label>
                    <select>
                        <option>SAR96</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default PricingContent
