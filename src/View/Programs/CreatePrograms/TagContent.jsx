import React from 'react'

const TagContent = ({ handleChange, staticdata }) => {
    return (
        <>
            <div className='input_form'>
                <label>Select Tag <span>*</span></label>
                <select value={staticdata.tag} onChange={handleChange} name='tag'>
                    <option>--Select-tag--</option>
                    <option value={'new'}>New</option>
                    <option value={'bestselling'}>Best Selling</option>
                    <option value={'most_rated'}>Most Rated</option>
                    <option value={'recommended'}>Recommended</option>
                </select>
            </div>
        </>
    )
}

export default TagContent
