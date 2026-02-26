import React, { useEffect, useState } from 'react'
import { getAllCardCategory, getAllquoteCategory, getProgramSettings, postProgramSettings } from '../../utils/Program'
import Loaders from '../../Components/Loaders/Loaders'
import { useParams } from 'react-router-dom'
import Button from '../../Components/Button'

const ProgramSettingsModal = ({ setloading, setprogramSettingModal, setcardCategoryId, cardCategoryId }) => {
    const [allQuotesCategory, setallQuotesCategory] = useState([])
    const [allCardsCategory, setallCardsCategory] = useState([]);
    const { id } = useParams()
    const fetchQuotesCategory = async () => {
        try {
            setloading(true)
            const res = await getAllquoteCategory()
            if (res?.success) {
                setallQuotesCategory(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchQuotesCategory()
    }, [])

    const fetchCardsCategory = async () => {
        try {
            setloading(true)
            const res = await getAllCardCategory()
            if (res?.success) {
                setallCardsCategory(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchCardsCategory()
    }, [])

    const sendProgramSettings = async () => {
        try {
            setloading(true)
            const res = await postProgramSettings({
                card_category_id: cardCategoryId ? cardCategoryId : null
            }, id)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setprogramSettingModal(false))}></div>
            <div className='modal_div'>
                <h4>Program Settings</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setprogramSettingModal(false))}></i>
                <form className='modal_form'>
                    <div className='input_form'>
                        <label>Select Quotes Category<span>*</span></label>
                        <select>
                            <option>--select-quotes-category--</option>
                            {allQuotesCategory?.length > 0 && allQuotesCategory?.map((element) => (
                                <option value={element.id}>{element.name}</option>
                            ))}
                        </select>
                    </div>


                    <div className='input_form'>
                        <label>Select Cards Category<span>*</span></label>
                        <select value={cardCategoryId} onChange={((e) => setcardCategoryId(e.target.value))}>
                            <option>--select-cards-category--</option>
                            {allCardsCategory?.length > 0 && allCardsCategory?.map((element) => (
                                <option value={element.id}>{element.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='input_form'>
                        <label>Coach can edit modules<span>*</span></label>
                        <select>
                            <option>--select-options--</option>
                        </select>
                    </div>

                    <div className='input_form'>
                        <label style={{
                            fontWeight: '500'
                        }}>Select modules</label>

                        <div className='checkbox_wrapper46623'>
                            <div className='checkbox_7953'>
                                <input type='checkbox' />
                                <p>Values</p>
                            </div>

                            <div className='checkbox_7953'>
                                <input type='checkbox' />
                                <p>Wheel of life</p>
                            </div>

                            <div className='checkbox_7953'>
                                <input type='checkbox' />
                                <p>Find your motivation</p>
                            </div>


                            <div className='checkbox_7953'>
                                <input type='checkbox' />
                                <p>Upload Documents</p>
                            </div>

                            <div className='checkbox_7953'>
                                <input type='checkbox' />
                                <p>Who am I</p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginLeft: 'auto'
                    }}>
                        <Button onClick={sendProgramSettings} children={'Save'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProgramSettingsModal
