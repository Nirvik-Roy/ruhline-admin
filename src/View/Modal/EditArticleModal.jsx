import React, { useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const EditArticleModal = ({ seteditArticle }) => {
    const [enable, setenable] = useState(true)
    return (
        <>
            <div className='modal_wrapper' onClick={(() => seteditArticle(false))}></div>
            <div className='modal_div'>
                <h4>Edit Article Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditArticle(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                    <Input label={'Article Category Name'} required={true} placeholder={'Article Category 1'} />


                </div>

                <div className='enbale_wrapper'>
                    <p>Active</p>
                    <div onClick={(() => { setenable(!enable) })} className={enable ? 'enable_toggle_wrapper' : 'enable_toggle_wrapper2'} style={enable ? { background: 'var(--primary-color)' } : { background: '#293e5f' }}>
                        {enable ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i>}
                        <div className='toggle_circle' ></div>
                    </div>
                </div>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default EditArticleModal
