import React from 'react'
import './SingleCreatedPrograms.css'
import SingleProgramDetails from './SingleProgramDetails'
import Button from '../../../../Components/Button'
import ProgramTabs from './ProgramTabs'
import ProgramModule from '../ProgramModule/ProgramModule'
const SingleCreatedPrograms = () => {
    return (
        <>
            <div className='dashboard_container one_time_content_wrapper'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Yoga Program 1</h2>
                        <small>Program Creation / Yoga Program 1</small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div>
                            <Button children={'Cancel'} styles={{
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>

                        <div>
                            <Button children={'Save'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                <SingleProgramDetails />
                <ProgramTabs />
                <ProgramModule/>

            </div>
        </>
    )
}

export default SingleCreatedPrograms
