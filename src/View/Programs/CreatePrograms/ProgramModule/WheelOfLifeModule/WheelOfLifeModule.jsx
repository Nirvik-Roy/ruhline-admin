import React, { useState } from 'react'
import Button from '../../../../../Components/Button.jsx'
import laptopImg from '../../../../../assets/Group (2).svg'
import { useNavigate } from 'react-router-dom';

const WheelOfLifeModule = () => {
    const [dropdown, setdropdown] = useState(null);
    const navigate = useNavigate()
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
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Wheel of Life</h2>
                        <small>Program Creation / Yoga Program 1 / Wheel of Life</small>
                    </div>
                </div>

                <h3 style={{
                    fontSize: '18px',
                    color: 'var(--text-color)',
                    margin: '20px 0',
                    fontWeight: '600'
                }}>Life Elements</h3>
                <div className='coaches_shift_card_wrapper' style={{
                    gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr)'
                }}>
                    {['Anxiety', 'Depression', 'Happiness', 'Success', 'Discipline', 'Honesty'].map((e, i) => (
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
                                <small onClick={(()=>navigate(`/dashboard/programs/single-program/life-element/${i}`))}>View</small>
                                <small>Edit</small>
                                <small>Delete</small>
                            </div>}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default WheelOfLifeModule
