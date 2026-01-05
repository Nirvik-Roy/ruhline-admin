import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const AddArticleCategoriesModal = ({setaddArticle}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setaddArticle(false))}></div>
            <div className='modal_div'>
                <h4>Add Article Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setaddArticle(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                    <Input label={'Article Category Name'} required={true} placeholder={'Article Category Name'} />
                </div>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default AddArticleCategoriesModal
