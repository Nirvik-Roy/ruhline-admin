import React, { useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import toast from 'react-hot-toast'

const AddGoalTypesModal = ({ setisModal, addGoal }) => {
    const [goalType, setgoalType] = useState('')
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Goal type</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input value={goalType} onChange={((e) => setgoalType(e?.target?.value))} label={'Add Goal type'} required={true} placeholder={'Enter goal type'} />
                </div>

                <Button onClick={(()=>{
                    if(goalType!=''){
                        addGoal({
                            name:goalType
                        })
                    }else{
                        toast.error("Plz enter the field")
                    }
                })} children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default AddGoalTypesModal
