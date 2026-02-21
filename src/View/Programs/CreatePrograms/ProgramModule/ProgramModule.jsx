import React, { Activity, useEffect, useState } from 'react'
import Button from '../../../../Components/Button'
import menu from '../../../../assets/menu.svg'
import edit from '../../../../assets/Pencil.svg'
import settings from '../../../../assets/Frame 1984079031.svg'
import deleteicon from '../../../../assets/delete.svg'
import './ProgramModule.css'
import AddProgramModule from '../../../Modal/AddProgramModule'
import Loaders from '../../../../Components/Loaders/Loaders'
import { getProgramModuleById, deleteProgramModule, reorderProgramModule } from '../../../../utils/Program'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteModal from '../../../../Components/DeleteModal/DeleteModal'
const ProgramModule = () => {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [moduleData, setmoduleData] = useState([]);
    const navigate = useNavigate();
    const [deleteId, setdeleteId] = useState()
    const [deletedModal, setdeletedModal] = useState(false)
    const [loading, setloading] = useState(false);
    const { id } = useParams();
    const [moduleOrder, setModuleOrder] = useState([]);
    const [modulePositionChange, setmodulePositionChange] = useState(false)
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

    const handleDelete = (id) => {
        setdeleteId(id)
        setdeletedModal(true)
    }

    const deleteFunc = async () => {
        try {
            setloading(true);
            const res = await deleteProgramModule(deleteId, id)
            if (res?.success) {
                setdeletedModal(false)
                fetchModules()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        setModuleOrder(moduleData?.map((e) => e.id) || [])
    }, [moduleData])


    let dragStartIndex;

    const dragStart = (index) => {
        dragStartIndex = index;
    };

    const dragEnter = (index) => {
        const newOrder = [...moduleOrder];
        const item = newOrder.splice(dragStartIndex, 1)[0];
        newOrder.splice(index, 0, item);
        setModuleOrder(newOrder);
        setmodulePositionChange(true)
    };
    const sendReorderDetails = async () => {
        try {
            setloading(true)
            const formData = new FormData()
            if (moduleOrder?.length > 0) {
                moduleOrder.forEach((element) => {
                    formData.append('order[]', element)
                })
            }
            const res = await reorderProgramModule(formData, id)
            if (res?.success) {
                fetchModules()
                setmodulePositionChange(false)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (modulePositionChange) {
            sendReorderDetails(moduleOrder)
        }
    }, [modulePositionChange, moduleOrder])
    return (
        <>
            {loading && <Loaders />}
            {deletedModal && <DeleteModal onClick={deleteFunc} title={'Delete Module'} details={'Do you really want to remove this module?'} setdeleteModal={setdeletedModal} />}
            <Activity mode={modalIsOpen ? 'visible' : 'hidden'}>
                <AddProgramModule fetchModules={fetchModules} setmodalIsOpen={setmodalIsOpen} />
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
                    <div className='added_modules_wrapper' key={index}
                        draggable
                        onDragStart={() => dragStart(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                            dragEnter(index)
                        }}
                    >
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
                            <img onClick={(() => handleDelete(e?.id))} src={deleteicon} />
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default ProgramModule
