import React, { useRef } from 'react'
import leftarrow from '../../../assets/Group 1597882963.svg'
import rightarrow from '../../../assets/Group 1597882962.svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img from '../../../assets/Rectangle 448 (1).png'
import './SingleCoache.css'

const ProgramAssignedSlider = ({ programs = [] }) => {
    const sliderref = useRef()
    const list = Array.isArray(programs) && programs.length > 0 ? programs : []
    var settings = {
        dots: false,
        infinite: list.length > 5,
        speed: 500,
        slidesToShow: Math.min(5, list.length || 1),
        slidesToScroll: 1,
    };
    return (
        <>
            <div className='upcoming_programs_slder_Wrapper'>
                <div className='upcoming_program_slider_head_Wrapper'>
                    <h1>Programs assigned to Coach</h1>
                    <div className='upcoming_slider_wrapper'>
                        <img onClick={() => sliderref?.current?.slickPrev()} src={leftarrow} alt='prev' />
                        <img onClick={() => sliderref?.current?.slickNext()} src={rightarrow} alt='next' />
                    </div>
                </div>

                <div className='upcoming_program_slide'>
                    {list.length > 0 ? (
                        <Slider ref={sliderref} {...settings}>
                            {list.map((item, i) => (
                                <div key={item?.id ?? i}>
                                    <div className='program_assign_slide'>
                                        <img src={item?.image ?? item?.thumbnail ?? item?.profile_image ?? img} alt={item?.name ?? ''} />
                                        <h4>{item?.name ?? item?.title ?? item?.program_name ?? '—'}</h4>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p style={{ padding: '1rem', color: '#666' }}>No programs assigned</p>
                    )}
                </div>

            </div>
        </>
    )
}

export default ProgramAssignedSlider
