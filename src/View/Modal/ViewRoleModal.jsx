import React from 'react'
import Button from '../../Components/Button'
import img from '../../assets/Photo (1).png'
const ViewRoleModal = ({roleFunction}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => roleFunction(0))}></div>
            <div className='modal_div modal_img_div'>
                <h4>Role 1</h4>
                <i class="fa-solid fa-xmark" onClick={(() => roleFunction(0))}></i>

                <div className='modal_img_details' style={{
                    cursor:'pointer'
                }}>
                    <p style={{
                        fontSize:'15px'
                    }}>1. Coupons: <span>View | Edit | Delete</span></p>
                    <p style={{
                        fontSize:'15px'
                    }}>2. Billings: <span>Edit | Delete</span></p>
                    <p style={{
                        fontSize:'15px'
                    }}>3. Coaches: <span>View</span></p>
                </div>

                <div className='change_cancel_wrapper' style={{
                    marginTop:'10px'
                }}>
                    <div onClick={(() => roleFunction(0))}>
                        <button>Delete</button>
                    </div>
                    <div onClick={(() => roleFunction(2))}>
                        <Button children={'Edit'} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default ViewRoleModal
