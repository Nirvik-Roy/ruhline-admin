import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const AddCategoryModal = ({setisModal}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Cards Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input label={'Card Category Name'} required={true} placeholder={'Cards Category 1'} />
                </div>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default AddCategoryModal
