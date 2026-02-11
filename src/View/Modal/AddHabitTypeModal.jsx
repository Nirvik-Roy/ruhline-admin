import React, { useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import toast from 'react-hot-toast'
const AddHabitTypeModal = ({ setisModal, addHabitType }) => {
    const [habitName, sethabitName] = useState("")
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add habit type</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input value={habitName} onChange={((e) => sethabitName(e?.target?.value))} label={'Add habit type'} required={true} placeholder={'Enter habit type'} />
                </div>
                <div onClick={(() => {
                    if(habitName!=''){
                        addHabitType({
                            name: habitName
                        })
                    }else{
                        toast.error("Plz enter the field..")
                    }
                })}>
                    <Button children={'Add'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default AddHabitTypeModal
