import React, { useEffect, useState } from 'react'
import './SingleCoache.css'
import Button from '../../../Components/Button'
import photo from '../../../assets/Photo.png'
import UpcomingProgramSlider from './UpcomingProgramSlider'
import ProgramAssignedSlider from './ProgramAssignedSlider'
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import { deleteCoach, getSingleCoach, getCoachUpcomingPrograms, getCoachAssignedPrograms, updateCoach } from '../../../utils/coach'
import EditCoachModal from '../../Modal/EditCoachModal'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal'
const SingleCoache = () => {
    const navigate = useNavigate();
    const [ediCoachModal, seteditCoachModal] = useState(false);
    const [singleCoachdata, setsingleCoachData] = useState({});
    const [upcomingPrograms, setUpcomingPrograms] = useState([]);
    const [assignedPrograms, setAssignedPrograms] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [updateErrors, setupdateErrors] = useState()
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false)
    const { id } = useParams();
    const getSingleCoachFunc = async (id) => {
        if (id) {
            setisLoading(true)
            try {
                const result = await getSingleCoach(id);
                if (result?.user != null || result?.id != null) {
                    setsingleCoachData(result)
                    if (Array.isArray(result?.upcoming_programs)) setUpcomingPrograms(result.upcoming_programs)
                    if (Array.isArray(result?.assigned_programs)) setAssignedPrograms(result.assigned_programs)
                } else {
                    setsingleCoachData({})
                }
            } catch (err) {
                console.log(err)
                setsingleCoachData({})
            } finally {
                setisLoading(false)
            }
        }
    }
    useEffect(() => {
        getSingleCoachFunc(id)
    }, [id]);

    useEffect(() => {
        if (!id) return
        const fetchPrograms = async () => {
            try {
                const [upcoming, assigned] = await Promise.all([
                    getCoachUpcomingPrograms(id),
                    getCoachAssignedPrograms(id)
                ])
                const up = Array.isArray(upcoming) ? upcoming : []
                const as = Array.isArray(assigned) ? assigned : []
                setUpcomingPrograms(prev => (up.length > 0 ? up : prev))
                setAssignedPrograms(prev => (as.length > 0 ? as : prev))
            } catch (_) {
                // keep existing from coach detail if endpoints fail
            }
        }
        fetchPrograms()
    }, [id]);

    const editNewCoachfunc = async (id, data) => {
        if (data && id) {
            setUpdateLoading(true)
            try {
                const result = await updateCoach(id, data);
                setupdateErrors(result)
                await getSingleCoachFunc(id)
                seteditCoachModal(false)
            } catch (err) {
                console.log(err)
            } finally {
                setUpdateLoading(false)
            }
        }
    }

    const deletedCoachfunc = async () => {
        if (id) {
            setisLoading(true)
            try {
                await deleteCoach(id);
            } catch (err) {
                console.log(err)
            } finally {
                setisLoading(false);
                navigate('/dashboard/coaches', { replace: true })
            }
        }
    }
    const handleDelete = () => {
        setdeleteModal(true)
    }
    return (
        <>
            {(isLoading || updateLoading) && <Loaders />}
            {
                deleteModal && <DeleteModal setdeleteModal={setdeleteModal} onClick={deletedCoachfunc} title={'Delete Coach'} details={'Are you sure you want to delete this coach...'} />
            }
            {ediCoachModal && <EditCoachModal editNewCoachfunc={editNewCoachfunc}
                seteditCoachModal={seteditCoachModal} singleCoachLoading={isLoading} singleCoachdata={singleCoachdata} updateErrors={updateErrors} />}
            <div className='dashboard_container'>
                <div className='single_coache_head_Wrapper'>
                    <div className='single_coach_head'>
                        <h1>{singleCoachdata?.user?.name} </h1>
                        <small style={{
                            cursor: 'pointer'
                        }}> <span onClick={() => navigate('/dashboard/coaches')}>Coaches</span> / <span onClick={() => navigate(`/dashboard/coaches/single-coache/${id}`)}>{singleCoachdata?.user?.name}</span></small>
                    </div>
                    <div className='single_button_Wrapper'>
                        <button onClick={(() => { handleDelete() })}>Delete</button>
                        <div onClick={(() => seteditCoachModal(true))}>
                            <Button children={'Edit'} />
                        </div>
                    </div>
                </div>

                <div className='single_coaches_photos_wrapper'>
                    <div className='single_coache_img'>
                        <img src={singleCoachdata?.profile?.profile_image} />
                    </div>
                    <div className='single_coache_details'>
                        <div className='single_coach_details_head_Wrapper'>
                            <h3>{singleCoachdata?.user?.name}</h3>
                            <h5>Total Earned: {singleCoachdata?.total_earned != null ? `SAR ${Number(singleCoachdata.total_earned).toLocaleString()}` : singleCoachdata?.total_earned_amount != null ? `SAR ${Number(singleCoachdata.total_earned_amount).toLocaleString()}` : '—'}</h5>
                        </div>

                        <ul className='single_coach_list'>
                            <li>Coach type: <span>{singleCoachdata?.profile?.coach_type}</span></li>
                            <li>Email: <span>{singleCoachdata?.user?.email}</span></li>
                            <li>Phone: <span>+{singleCoachdata?.profile?.phone_country_code?.phone_code} {singleCoachdata?.profile?.phone}</span></li>
                        </ul>
                    </div>
                </div>
                <UpcomingProgramSlider programs={upcomingPrograms} />
                <ProgramAssignedSlider programs={assignedPrograms} />
            </div>
        </>
    )
}

export default SingleCoache
