import React, { Activity, useEffect, useState } from 'react'
import Button from '../../../../Components/Button'
import menu from '../../../../assets/menu.svg'
import edit from '../../../../assets/Pencil.svg'
import settings from '../../../../assets/Frame 1984079031.svg'
import deleteicon from '../../../../assets/delete.svg'
import './ProgramModule.css'
import AddProgramModule from '../../../Modal/AddProgramModule'
import Loaders from '../../../../Components/Loaders/Loaders'
import { getProgramModuleById } from '../../../../utils/Program'
import { useNavigate, useParams } from 'react-router-dom'
const ProgramModule = () => {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [moduleData, setmoduleData] = useState([]);
    const navigate = useNavigate()
    const [loading, setloading] = useState(false);
    const { id } = useParams()
    const fetchModules = async () => {
        try {
            setloading(true);
            const res = await getProgramModuleById(id)
            setmoduleData(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        if (id) {
            fetchModules()
        }
    }, [id])

    const data = {
        'Values': `/dashboard/programs/single-program/${id}/values`,
        card: `/dashboard/programs/single-program/${id} /card-game`,
        wheel: `/dashboard/programs/single-program/${id}/wheeloflife`,
        notes: '',
        goal: '',
        documents: '',
        'Find your Motivation': `/dashboard/programs/single-program/${id}/motivation`,
        who: `/dashboard/programs/single-program/${id}/whoami`,
    }

    return (
        <>
            {loading && <Loaders />}
            <Activity mode={modalIsOpen ? 'visible' : 'hidden'}>
                <AddProgramModule setmodalIsOpen={setmodalIsOpen} />
            </Activity>

            <div className='program_modules_wrapper'>
                <div className='program_module_head_wrapper'>
                    <h2>Program Structure</h2>
                    <div onClick={(() => setmodalIsOpen(true))} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Button children={'Add'} styles={{
                            border: '1px solid var(--primary-color)',
                            color: 'var(--text-color)',
                            background: 'transparent',
                            padding: '9px 15px'
                        }} />
                        <img src={settings} />
                    </div>


                </div>
                {moduleData?.length <= 0 && <div className='added_modules_wrapper' style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div className='add_modules_enu_wrapper' >
                        <p style={{
                            textAlign: 'center'
                        }}>No modules added </p>
                    </div>
                </div>}
                {moduleData?.length > 0 && moduleData?.map((e, index) => (
                    <div className='added_modules_wrapper' key={index}>
                        <div className='add_modules_enu_wrapper'>
                            <img src={menu} />
                            <p>{e?.title} <span style={{
                                padding: '5px',
                                borderRadius: '5px',
                                color: '#fff',
                                background: 'rgba(224, 173, 34, 1)',
                                marginLeft: '10px',
                                fontSize: '10px'
                            }}>Modules</span></p>
                        </div>
                        <div className='edit_modules_wrapper'>
                            <img onClick={(() => {
                                if (e?.title == 'Find your Motivation') {
                                    navigate(`/dashboard/programs/single-program/${id}/motivation/${e?.id}`)
                                }
                                if (e?.title == 'Values') {
                                    navigate(`/dashboard/programs/single-program/${id}/values/${e?.id}`)
                                }
                            })} src={edit} />
                            <img src={deleteicon} />
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default ProgramModule
