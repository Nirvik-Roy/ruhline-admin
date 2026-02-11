import React, { useEffect, useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import Loaders from '../../Components/Loaders/Loaders';
import { editHabitTypes, getSingleHabitType } from '../../utils/Program';
import toast from 'react-hot-toast';

const EdihabitTypeModal = ({ seteditModal, habitId, fetchData }) => {
    const [habitName, sethabitName] = useState("");
    const [loading, setloading] = useState(false);
    const [singleHabit, setsingleHabit] = useState()
    const fetchSingleData = async () => {
        try {
            setloading(true)
            const res = await getSingleHabitType(habitId);
            setsingleHabit(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        if (habitId) {
            fetchSingleData()
        }
    }, [habitId])

    useEffect(() => {
        sethabitName(singleHabit?.name)
    }, [singleHabit])


    const editHabitFunc = async (data) => {
        try {
            setloading(true);
            const res = await editHabitTypes(data, habitId);
            console.log(res);
            if (res?.success) {
                seteditModal(false)
                fetchData()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => seteditModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit habit type</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input value={habitName} onChange={((e) => sethabitName(e?.target?.value))} label={'Edit habit type'} required={true} placeholder={'Enter habit type'} />
                </div>
                <div onClick={(() => {
                    if (habitName != "") {
                        editHabitFunc({
                            name: habitName
                        })
                    } else {
                        toast.error("Plz enter the field..")
                    }
                })}>

                    <Button children={'Edit'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default EdihabitTypeModal
