import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import upload from '../../assets/Vector (8).svg'
import img from '../../assets/Photo (1).png'
const ViewStaffModal = ({ staffFunction }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => staffFunction(0))}></div>
            <div className='modal_div modal_img_div'>
                <h4>Bidisha Bhowmick (#ST456666)</h4>
                <i class="fa-solid fa-xmark" onClick={(() => staffFunction(0))}></i>
                <div className='modal_img_div22'>
                    <img src={img} />
                    <hr />
                    <div className='modal_img_details'>
                        <p>Email: <span>shallamb@gmail.com</span></p>
                        <p>Phone: <span> +1 (234) 464-0600</span></p>
                        <p>Role: <span>Role 1</span></p>
                    </div>
                </div>
                <div className='change_cancel_wrapper'>
                    <div onClick={(() => staffFunction(0))}>
                        <button>Delete</button>
                    </div>
                    <div onClick={(() => staffFunction(2))}>
                        <Button children={'Edit Staff'} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default ViewStaffModal
