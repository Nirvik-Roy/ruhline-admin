import React, { useEffect, useState } from 'react'
import { getAllCardCategory, getAllquoteCategory, postProgramSettings } from '../../utils/Program'
import Loaders from '../../Components/Loaders/Loaders'
import { useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import toast from 'react-hot-toast'
import ModalLoader from '../../Components/Loaders/ModalLoader'

const ProgramSettingsModal = ({ setprogramSettingModal, setcardCategoryId, cardCategoryId, fetchProgramSettings, quoteCategoryId, setquoteCategoryId, coachCanEditModule, coacheEditedModules, programSettingsloading }) => {
    const [allQuotesCategory, setallQuotesCategory] = useState([])
    const [allCardsCategory, setallCardsCategory] = useState([]);
    const [coachEditModules, setcoachEditModules] = useState([]);
    const [coachCanEdit, setcoachCanEdit] = useState(false)
    const { id } = useParams()
    const [settingsLoading,setsettingsLoading]=useState(false)
    const [loading, setloading] = useState(false)
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


    useEffect(() => {
        setcoachCanEdit(coachCanEditModule)
        setcoachEditModules(coacheEditedModules)
    }, [coachCanEditModule, coacheEditedModules])
    const sendProgramSettings = async () => {
        try {
            setsettingsLoading(true)
            const formData = new FormData()
            formData.append('card_category_id', cardCategoryId || null,)
            formData.append('quote_category_id', quoteCategoryId || null)
            if (coachCanEdit) {
                formData.append('coach_can_edit_modules', "1")
                if (coachEditModules?.length <= 0) {
                    toast.error('Plz select atleast one module..')
                    return false;
                }
                coachEditModules?.forEach((item) => {
                    formData.append(`coach_editable_module_types[]`, item)
                })
            } else {
                formData.append('coach_can_edit_modules', "0")
                formData.append('coach_editable_module_types', [])
            }
            const res = await postProgramSettings(formData, id)
            if (res?.success) {
                fetchProgramSettings()
                setprogramSettingModal(false)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setsettingsLoading(false)
        }
    }

    const handleChange = (e) => {
        if (coachEditModules?.includes(e.target.value)) {
            setcoachEditModules((prev) =>
                prev.filter((item) => item !== e.target.value)
            )
        } else {
            setcoachEditModules([...coachEditModules, e.target.value])
        }
    }

    // useEffect(() => {
    //     if (!coachCanEdit) {
    //         setcoachEditModules([])
    //     }
    // }, [coachCanEdit])
    return (
        <>
            <div className='modal_wrapper'></div>
            <div className='modal_div' style={{
                minHeight:'57vh'
            }}>
                <h4>Program Settings</h4>
                <i class="fa-solid fa-xmark" onClick={(() => {
                    setprogramSettingModal(false)
                    setcardCategoryId('')
                })}></i>
                {(loading && programSettingsloading) && <ModalLoader/>}
                {(!loading && !programSettingsloading) &&   <form className='modal_form'>
                    <div className='input_form'>
                        <label>Select Quotes Category<span>*</span></label>
                        <select value={quoteCategoryId} onChange={((e) => setquoteCategoryId(e?.target.value))}>
                            <option value={''}>--select-quotes-category--</option>
                            {allQuotesCategory?.length > 0 && allQuotesCategory?.map((element) => (
                                <option value={element.id}>{element.name}</option>
                            ))}
                        </select>
                    </div>


                    <div className='input_form'>
                        <label>Select Cards Category<span>*</span></label>
                        <select value={cardCategoryId} onChange={((e) => setcardCategoryId(e.target.value))}>
                            <option value={''}>--select-cards-category--</option>
                            {allCardsCategory?.length > 0 && allCardsCategory?.map((element) => (
                                <option value={element.id}>{element.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginLeft: '10px'
                    }}>
                        <input checked={coachCanEdit} onChange={(() => setcoachCanEdit(!coachCanEdit))} style={{
                            width: '18px',
                            height: '18px',
                            marginTop: '1px',
                            accentColor: 'var(--primary-color)'
                        }} type='checkbox' />
                        <p style={{
                            color: 'var(--text-color)',
                            fontSize: '15px'
                        }}>Coach can edit modules?</p>
                    </div>

                    {coachCanEdit && <div className='input_form'>
                        <label style={{
                            fontWeight: '500'
                        }}>Select modules</label>

                        <div className='checkbox_wrapper46623'>
                            <div className='checkbox_7953'>
                                <input type='checkbox' checked={coachEditModules?.includes('values')} onChange={handleChange} value={'values'} />
                                <p>Values</p>
                            </div>

                            <div className='checkbox_7953'>
                                <input type='checkbox' checked={coachEditModules?.includes('wheel_of_life')} onChange={handleChange} value={'wheel_of_life'} />
                                <p>Wheel of life</p>
                            </div>

                            <div className='checkbox_7953'>
                                <input type='checkbox' checked={coachEditModules?.includes('find_your_motivation')} onChange={handleChange} value={'find_your_motivation'} />
                                <p>Find your motivation</p>
                            </div>


                            <div className='checkbox_7953'>
                                <input type='checkbox' checked={coachEditModules?.includes('upload_documents')} onChange={handleChange} value={'upload_documents'} />
                                <p>Upload Documents</p>
                            </div>

                            <div className='checkbox_7953'>
                                <input type='checkbox' checked={coachEditModules?.includes('who_am_i')} onChange={handleChange} value={'who_am_i'} />
                                <p>Who am I</p>
                            </div>
                        </div>
                    </div>}

                    <div style={{
                        marginLeft: 'auto'
                    }}>
                        <Button loading={settingsLoading} loadingText='Saving...' onClick={sendProgramSettings} children={'Save'} />
                    </div>
                </form>}
            </div>
        </>
    )
}

export default ProgramSettingsModal
