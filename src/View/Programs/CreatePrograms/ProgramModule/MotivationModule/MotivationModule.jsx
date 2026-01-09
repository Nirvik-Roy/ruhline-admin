import React, { useState } from 'react'
import Button from '../../../../../Components/Button.jsx'
import laptopImg from '../../../../../assets/Group (2).svg'
import { useNavigate } from 'react-router-dom';
import AddWordModal from '../../../../Modal/AddWordModal.jsx';
import EditwordModal from '../../../../Modal/EditwordModal.jsx';
const MotivationModule = () => {
    const [dropdown, setdropdown] = useState(null);
    const navigate = useNavigate()
    const [isModal, setisModal] = useState(false);
    const [editModal, seteditModal] = useState(false)
    const dropdownFunction = (i) => {
        if (dropdown === i) {
            setdropdown(null)
        } else {
            setdropdown(i)
        }
    }
    return (
        <>

            {isModal && <AddWordModal setisModal={setisModal} />}
            {editModal && <EditwordModal seteditModal={seteditModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Find your Motivation</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate('/dashboard/programs/single-program/2'))}>Yoga Program 1</span>  / <span onClick={(() => navigate('/dashboard/programs/single-program/2/motivation'))}>Find your Motivation</span></small>


                    </div>

                    <div className='coaches_button_wapper'>


                        <div onClick={(() => setisModal(true))}>
                            <Button children={'Add word'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
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
                                <small onClick={(() => seteditModal(true))}>Edit</small>
                                <small>Delete</small>
                            </div>}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default MotivationModule
