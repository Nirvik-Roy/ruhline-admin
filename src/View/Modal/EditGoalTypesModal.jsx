import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { editGoalTypes, getSingleGoal } from '../../utils/Program';
import toast from 'react-hot-toast';
import Loaders from '../../Components/Loaders/Loaders';
const EditGoalTypesModal = ({ seteditModal, goalId, fetchData }) => {
    const [singleData, setsingleData] = useState();
    const [loading, setloading] = useState(false)
    const [goalType, setgoalType] = useState("")
    const fetchSingleData = async () => {
        try {
            setloading(true)
            const res = await getSingleGoal(goalId);
            setsingleData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        if (goalId) {
            fetchSingleData()
        } else {
            toast.error('Goal id not found..')
        }
    }, [goalId])

    useEffect(() => {
        setgoalType(singleData?.name)
    }, [singleData])


    const editGoalType = async () => {
        if (goalType != '') {
            try {
                setloading(true);
                const res = await editGoalTypes({
                    name: goalType
                }, goalId)
                if (res?.success) {
                    seteditModal(false);
                    fetchData()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error("Plz enter the field")
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => seteditModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit Goal type</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input onChange={((e) => setgoalType(e?.target?.value))} value={goalType} label={'Edit Goal type'} required={true} placeholder={'Enter goal type...'} />
                </div>
                <div onClick={editGoalType}>

                    <Button children={'Edit'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default EditGoalTypesModal
