import React from 'react'
import './CreatePrograms.css'
import Button from '../../../Components/Button'
import { useNavigate } from 'react-router-dom'
import CreateProgramsContent from './CreateProgramsContent'
const CreatePrograms = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Create Program</h2>
                        <small><span onClick={(()=>navigate('/dashboard/programs'))}>Program Creation</span> / Create Program</small>
                    </div>
                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setaddCustomer(true))}>
                            <Button children={'Cancel'} styles={{
                                fontSize: '13px',
                                color: 'var(--text-color)',
                                background: 'transparent',
                                border: 'none'
                            }} />
                        </div>
                        <div onClick={(() => setaddCustomer(true))}>
                            <Button children={'Create'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                <CreateProgramsContent/>
            </div>
        </>
    )
}

export default CreatePrograms
