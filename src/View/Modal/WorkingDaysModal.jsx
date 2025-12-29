import React from 'react'
import Button from '../../Components/Button'
const WorkingDaysModal = ({ shiftFunction }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => shiftFunction(0))}></div>
            <div className='modal_div'>
                <h4>Working days</h4>
                <i class="fa-solid fa-xmark" onClick={(() => shiftFunction(0))}></i>
                <form className='modal_form'>
                    <div className='modal_checbox_wrapper'>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', "Sun"].map((e, i) => (
                            <div key={e} className='modal_checbox'>
                                <input value={e} type='checkbox' />
                                <p>{e}</p>
                            </div>
                        ))}

                    </div>
                    <div className='change_cancel_wrapper'>
                        <Button children={'Save'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default WorkingDaysModal
