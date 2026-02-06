import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import CustomTextEditor from '../../Components/CustomTextEditor/CustomTextEditor'
import { getAllSingleCmsData } from '../../utils/cms'
import Loaders from '../../Components/Loaders/Loaders'
const EditFaqModal = ({ editFunc, seteditModal, faqId }) => {
    const [description, setdescription] = useState();
    const [heading, setheading] = useState('');
    const [loading, setloading] = useState(false)
    const [singleFaq, setSingleFaq] = useState([])
    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllSingleCmsData('/admin/faq', faqId);
            setSingleFaq(res?.data)
            console.log(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (faqId) {
            fetchData()
        }
    }, [faqId])

    useEffect(() => {
        setheading(singleFaq?.heading)
        setdescription(singleFaq?.description)
    }, [singleFaq])
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => seteditModal(false))}></div>
            <div className='modal_div'>
                <h4>Update FAQ</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditModal(false))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <div style={{
                            gridColumn: '1/-1'
                        }}>
                            <Input onChange={((e) => setheading(
                                e.target.value))} value={heading} name={'heading'} label={'Heading'} type={'text'} required={true} placeholder={'Enter faq heading'} />
                        </div>

                        <div style={{
                            gridColumn: '1/-1'
                        }}>
                            <CustomTextEditor onChange={((data) => setdescription(data))} label={'Description'} defaultValue={description} />
                        </div>
                    </div>
                    <div onClick={(() => editFunc({
                        description,
                        heading
                    }))} className='change_cancel_wrapper' >
                        <Button children={'Update'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditFaqModal
