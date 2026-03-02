import React from 'react'
import FaqAccordion from './FaqAccordion'
import img from '../../../../assets/Rectangle 6716.png'
const ProgramFaq = ({ singleData }) => {
    return (
        <>
            {singleData?.faqs?.length <= 0 && <p style={{
                color: 'var(--primary-color)',
                fontWeight: '600',
                fontSize: '16px'
            }}>No faqs added...</p>}
            {singleData?.faqs?.length > 0 && <div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h3 style={{
                        fontSize: '25px',
                        color: 'var(--text-color)'
                    }}>FAQs</h3>
                    <FaqAccordion singleData={singleData} />
                </div>
                <div className='service_expert_right service_long_img'>
                    <img src={singleData?.faqs_section_image || img} />
                </div>
            </div>}
        </>
    )
}

export default ProgramFaq
