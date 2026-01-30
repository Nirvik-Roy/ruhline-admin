import React, { useRef } from 'react'
import leftarrow from '../../../assets/Group 1597882963.svg'
import rightarrow from '../../../assets/Group 1597882962.svg'
import calendar from '../../../assets/Capa_1 (4).svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
const UpcomingProgramSlider = ({ programs = [] }) => {
    const sliderref = useRef()
    var settings = {
        dots: false,
        infinite: programs?.length > 4,
        speed: 500,
        slidesToShow: Math.min(4, programs?.length || 1),
        slidesToScroll: 1,
    };
    const list = Array.isArray(programs) && programs.length > 0 ? programs : []

    return (
        <>
            <div className='upcoming_programs_slder_Wrapper'>
                <div className='upcoming_program_slider_head_Wrapper'>
                    <h1>Upcoming Programs</h1>
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
                                    <div className='program_slide'>
                                        <div className='program_head_slider'>
                                            <img src={calendar} alt='' />
                                            <h5>Program Name: {item?.program_name ?? item?.name ?? item?.title ?? '—'}</h5>
                                        </div>
                                        <div className='program_session_wrapper'>
                                            <p>Session <span>{item?.session_name ?? item?.session ?? '—'}</span></p>
                                            <span>{item?.date ?? item?.session_date ?? item?.scheduled_at ?? '—'}</span>
                                        </div>
                                        <p>Customer Name: <span>{item?.customer_name ?? item?.customer ?? '—'}</span></p>
                                        {item?.program_link && <Link to={item.program_link}>Program Link</Link>}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p style={{ padding: '1rem', color: '#666' }}>No upcoming programs</p>
                    )}
                </div>

            </div>
        </>
    )
}

export default UpcomingProgramSlider
