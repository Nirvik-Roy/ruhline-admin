import React from 'react'
import './SingleCoache.css'
import Button from '../../../Components/Button'
import photo from '../../../assets/Photo.png'
import UpcomingProgramSlider from './UpcomingProgramSlider'
import ProgramAssignedSlider from './ProgramAssignedSlider'
import { useNavigate } from 'react-router-dom'
const SingleCoache = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_container'>
                <div className='single_coache_head_Wrapper'>
                    <div className='single_coach_head'>
                        <h1>Bidisha Bhowmick (#ST456666)</h1>
                        <small style={{
                            cursor:'pointer'
                        }}> <span onClick={(()=>navigate('/dashboard/coaches'))}>Coaches</span> / <span onClick={(()=>navigate('/dashboard/coaches/single-coache/1'))}>Bidisha Bhowmick (#ST456666)</span></small>
                    </div>
                    <div className='single_button_Wrapper'>
                        <button>Delete</button>
                        <Button children={'Edit'} />
                    </div>
                </div>

                <div className='single_coaches_photos_wrapper'>
                    <div className='single_coache_img'>
                        <img src={photo} />
                    </div>
                    <div className='single_coache_details'>
                        <div className='single_coach_details_head_Wrapper'>
                            <h3>Bidisha Bhowmick</h3>
                            <h5>Total Earned: SAR 2,245</h5>
                        </div>

                        <ul className='single_coach_list'>
                            <li>Coach type: <span>Yoga trainer</span></li>
                            <li>Email: <span>shallamb@gmail.com</span></li>
                            <li>Phone: <span>+1 (234) 464-0600</span></li>
                        </ul>
                    </div>
                </div>
                <UpcomingProgramSlider/>
                <ProgramAssignedSlider/>
            </div>
        </>
    )
}

export default SingleCoache
