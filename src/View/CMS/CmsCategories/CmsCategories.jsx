import React from 'react'
import laptopImg from '../../../assets/Group (2).svg'
const CmsCategories = () => {
    return (
        <>
            <div className='dashboard_container'>
                <h1 style={{
                    color:'var(--text-color)',
                    fontWeight:'600'
                }}>CMS</h1>
                <div className='coaches_shift_card_wrapper'>
                    {['Site Details', 'Home Page', 'About Us', 
                    'Contact Inquiries', 'FAQ','Terms & Conditions','Privacy Policy','Refund Policy','Articles'].map((e, i) => (
                        <div key={e} className='coaches_shift_card'>
                            <img src={laptopImg} />
                            <p>{e}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CmsCategories
