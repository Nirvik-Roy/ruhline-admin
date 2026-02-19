import React, { useEffect, useState } from 'react'
import './SingleCreatedPrograms.css'
import SingleProgramDetails from './SingleProgramDetails'
import Button from '../../../../Components/Button'
import ProgramTabs from './ProgramTabs'
import ProgramModule from '../ProgramModule/ProgramModule'
import { useNavigate, useParams } from 'react-router-dom'
import { getprogramById } from '../../../../utils/Program'
import Loaders from '../../../../Components/Loaders/Loaders'
const SingleCreatedPrograms = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading, setloading] = useState(false);
    const [singleData, setsingleData] = useState([])
    const fetchSingleProgram = async () => {
        try {
            setloading(true)
            const res = await getprogramById(id);
            setsingleData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchSingleProgram()
        }
    }, [])
    console.log(singleData)
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container one_time_content_wrapper'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>{singleData?.name}</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}`))}>{singleData?.name}</span></small>
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
                <SingleProgramDetails singleData={singleData} />
                <ProgramTabs singleData={singleData}/>
                <ProgramModule />
            </div>
        </>
    )
}

export default SingleCreatedPrograms
