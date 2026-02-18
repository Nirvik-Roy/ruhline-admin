import React from 'react'
import crossIcon from '../../../assets/content.svg'
const SelectCoaches = () => {
    return (
        <>
            <div className='select_coaches_wrapper'>
                <h4>Select Coaches</h4>
                <div className='selected_coaches_Wrapper'>
                    <p>Bidisha Bhowmick <img src={crossIcon} /></p>
                    <p>Bidisha Bhowmick <img src={crossIcon} /></p>
                    <p>Bidisha Bhowmick <img src={crossIcon} /></p>
                </div>
            </div>
        </>
    )
}

export default SelectCoaches
