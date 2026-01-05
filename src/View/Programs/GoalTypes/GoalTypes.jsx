import React,{useState} from 'react'
import Button from '../../../Components/Button'
import laptopImg from '../../../assets/Group (2).svg'
import AddGoalTypesModal from '../../Modal/AddGoalTypesModal'

const GoalTypes = () => {
    const [dropdown, setdropdown] = useState(null)
    const [isModal, setisModal] = useState(false)
    const dropdownFunction = (i) => {
        if (dropdown === i) {
            setdropdown(null)
        } else {
            setdropdown(i)
        }
    }
    return (
        <>
        {isModal && <AddGoalTypesModal setisModal={setisModal}/>}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Goal Types</h2>
                        <small>Programs / Goal Types</small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setisModal(!isModal))}>
                            <Button children={'Add goal type'} styles={{
                                fontSize: '13px',
                                padding: '15px 15px',
                            }} />
                        </div>


                    </div>
                </div>


                <div className='coaches_shift_card_wrapper' style={{
                    gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr)'
                }}>
                    {['Goal Type 1', 'Goal Type 2', 'Goal Type 3', 'Goal Type 4', 'Goal Type 5', 'Goal Type 6'].map((e, i) => (
                        <div key={e} className='coaches_shift_card' style={{
                            padding: " 30px 0px",
                            background: 'rgba(144, 155, 109, 0.15)',
                            border: 'none'
                        }} onClick={(() => dropdownFunction(i))}>
                            <img style={{
                                width: '55px'
                            }} src={laptopImg} />
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            <p>{e}</p>

                            {dropdown == i && <div className='dropdown_wrapper662' style={{
                                bottom: '0',
                                top: '30px',
                                right: '-30px',
                                height: 'fit-content'
                            }} onClick={((e) => e.stopPropagation())}>
                                <small onClick={(() => shiftFunction(2))}>Edit</small>
                                <small>Delete</small>
                            </div>}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default GoalTypes
