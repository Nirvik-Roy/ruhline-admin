import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const AddCouponModal = ({setCoupon}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setCoupon(false))}></div>
            <div className='modal_div'>
                <h4>Add Coupon</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setCoupon(false))}></i>
                <form className='modal_form'>
                    <Input label={'Coupon Code'} required={true} placeholder={'Festive10'} />
                    <div className='modal_input_grid_wrapper'>
                        <Input label={'Coupon Name'} required={true} placeholder={'Festival Coupon'} />
                        <div className='input_form'>
                            <label>Coupon Type <span>*</span></label>
                            <select>
                                <option>Fixed</option>
                            </select>
                        </div>
                        <Input label={'Amount (in SAR)'} required={true} placeholder={'30'} />
                        <Input label={'Usage Limit (per user)'} required={true} placeholder={'1'} />
                        <Input label={'Start Date'} type={'date'} required={true} placeholder={'27/10/2025'} />
                        <Input label={'End Date'} type={'date'} required={true} placeholder={'27/10/2025'} />
                    </div>
                    <div className='input_form'>
                        <label>Applied To <span>*</span></label>
                        <select>
                            <option>All Service</option>
                        </select>
                    </div>


                    <div className='change_cancel_wrapper' onClick={(() => setCoupon(false))}>
                        <Button children={'Add'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCouponModal
