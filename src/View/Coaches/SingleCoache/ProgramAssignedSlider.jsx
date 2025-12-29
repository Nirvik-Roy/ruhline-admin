import React, { useRef } from 'react'
import leftarrow from '../../../assets/Group 1597882963.svg'
import rightarrow from '../../../assets/Group 1597882962.svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img from '../../../assets/Rectangle 448 (1).png'
import './SingleCoache.css'

const ProgramAssignedSlider = () => {
    const sliderref = useRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className='upcoming_programs_slder_Wrapper'>
                <div className='upcoming_program_slider_head_Wrapper'>
                    <h1>Programs assigned to Coach</h1>
                    <div className='upcoming_slider_wrapper'>
                        <img onClick={(() => sliderref?.current?.slickPrev())} src={leftarrow} />
                        <img onClick={(() => sliderref?.current?.slickNext())} src={rightarrow} />
                    </div>
                </div>

                <div className='upcoming_program_slide'>
                    <Slider ref={sliderref} {...settings}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => (
                            <div>
                              <div className='program_assign_slide'>
                                <img src={img}/>
                                <h4>Service 1</h4>
                              </div>
                            </div>

                        ))}

                    </Slider>

                </div>

            </div>
        </>
    )
}

export default ProgramAssignedSlider
