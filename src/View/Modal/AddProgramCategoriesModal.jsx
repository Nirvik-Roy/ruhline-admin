import React, { useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const AddProgramCategoriesModal = ({ setisModal }) => {
    const [value, setValue] = useState('')
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Program Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <div className='input_form'>
                        <label>Category Type<span>*</span></label>
                        <select onChange={((e) => setValue(e.target.value))}>
                            <option value={'Parent Category'}>Parent Category</option>
                            <option value={'Sub Category'}>Sub Category</option>
                        </select>
                    </div>

                    {value === 'Sub Category' && <Input label={'Select Category'} required={true} placeholder={'Yoga'} />}


                    <Input label={'Article Category Name'} required={true} placeholder={'Article Category Name'} />

                </div>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default AddProgramCategoriesModal
