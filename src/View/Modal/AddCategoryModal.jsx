import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const AddCategoryModal = ({ setisModal, postCategories, setcardGame, cardGame }) => {
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
                    <Input value={cardGame} onChange={((e) => setcardGame(e.target.value))} label={'Card Category Name'} required={true} placeholder={'Enter card category'} />
                </div>
                <div onClick={postCategories}>
                    <Button children={'Add'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default AddCategoryModal
