import React from 'react'
import img from '../../../../assets/Rectangle 6716.png'
const Howitworks = ({ singleData }) => {
    return (
        <>
            <div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h3 style={{
                        fontSize: '25px',
                        color: 'var(--text-color)'
                    }}>How It Works</h3>
                    <div className='faq_accordion_wrapper'>
                        {singleData?.how_it_works
                            ?.length > 0 && singleData?.how_it_works
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
                    <img src={singleData?.how_it_works_section_image || img} />
                </div>
            </div>
        </>
    )
}

export default Howitworks
