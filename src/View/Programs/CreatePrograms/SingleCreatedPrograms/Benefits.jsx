import React from 'react'
import img from '../../../../assets/Rectangle 6716.png'
const Benefits = ({ singleData }) => {
    return (
        <>
            <div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h3 style={{
                        fontSize: '25px',
                        color: 'var(--text-color)'
                    }}>Benefits</h3>
                    <div className='faq_accordion_wrapper'>
                        {singleData?.benefits
                            ?.length > 0 && singleData?.benefits
                                ?.map((e, i) => (
                                    <div className='faq_accordion' key={i} >
                                        <div className='faq_head_wrapper'>
                                            <h3 dangerouslySetInnerHTML={{
                                                __html: e?.description || ""
                                            }}></h3>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
                <div className='service_expert_right service_long_img'>
                    <img src={singleData?.benefits_section_image || img} />
                </div>
            </div>
        </>
    )
}

export default Benefits
