import React from 'react'
import Input from '../../Components/Input'
import Textarea from '../../Components/Textarea'
import Button from '../../Components/Button'
const DescriptiveModal = ({ tabsFunction }) => {
    return (
        <>
            <div className='modal_wrapper'></div>
            <div className='modal_div'>
                <h4>Descriptive</h4>
                <i class="fa-solid fa-xmark" onClick={(() => tabsFunction(0))}></i>
                <div style={{
                    margin: '20px 0 0 0'
                }}>
                    <Textarea styles={{
                        height: '70px'
                    }} label={'Question'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '} />
                    <div className='change_cancel_wrapper' style={{
                        margin: '20px 0 0 0'
                    }}>
                        <button onClick={(() => tabsFunction(0))}>Cancel</button>
                        <Button children={'Add'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DescriptiveModal
