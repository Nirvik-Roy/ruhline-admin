import React, { useRef } from 'react'
import leftarrow from '../../../assets/Group 1597882963.svg'
import rightarrow from '../../../assets/Group 1597882962.svg'
import calendar from '../../../assets/Capa_1 (4).svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
const UpcomingProgramSlider = () => {
    const sliderref = useRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className='upcoming_programs_slder_Wrapper'>
                <div className='upcoming_program_slider_head_Wrapper'>
                    <h1>Upcoming Programs</h1>
                    <div className='upcoming_slider_wrapper'>
                        <img onClick={(() => sliderref?.current?.slickPrev())} src={leftarrow} />
                        <img onClick={(() => sliderref?.current?.slickNext())} src={rightarrow} />
                    </div>
                </div>

                <div className='upcoming_program_slide'>
                    <Slider ref={sliderref} {...settings}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => (
                            <div>
                                <div className='program_slide'>
                                    <div className='program_head_slider'>
                                        <img src={calendar} />
                                        <h5>Program Name: Service 1 </h5>
                                    </div>
                                    <div className='program_session_wrapper'>
                                        <p>Session <span>Session 1</span></p>
                                        <span>25/05/2025 - 09:30 PM</span>
                                    </div>
                                    <p>Customer Name: <span>Bidisha Bhowmick</span></p>
                                    <Link>Program Link</Link>
                                </div>
                            </div>

                        ))}

                    </Slider>

                </div>

            </div>
        </>
    )
}

export default UpcomingProgramSlider
