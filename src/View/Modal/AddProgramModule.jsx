import React, { useState, Activity, useEffect } from 'react'
import Button from '../../Components/Button'
import AddQuoteModuleModal from './AddQuoteModuleModal'
import UploadDocumentsModal from './UploadDocumentsModal'
import { useNavigate, useParams } from 'react-router-dom'
const AddProgramModule = ({ setmodalIsOpen }) => {
    const [quoteModal, setquoteModal] = useState(false);
    const [uploadModal, setuploadModal] = useState(false);
    const [path, setPath] = useState('');
    const [radioValue, setradioValue] = useState()
    const { id } = useParams()
    const navigate = useNavigate();

    const data = {
        values: `/dashboard/programs/single-program/${id}/values`,
        card: `/dashboard/programs/single-program/${id} /card-game`,
        wheel: `/dashboard/programs/single-program/${id}/wheeloflife`,
        notes: '',
        goal: '',
        documents: '',
        motivation: `/dashboard/programs/single-program/${id}/motivation`,
        who: `/dashboard/programs/single-program/${id}/whoami`,
    }
    const handleChange = (e) => {
        setradioValue(e.target.value)
        setPath(data[e.target.value])
    }

    return (
        <>

            <Activity mode={quoteModal ? 'visible' : 'hidden'}>
                <AddQuoteModuleModal />
            </Activity>

            <Activity mode={uploadModal ? 'visible' : 'hidden'}>
                <UploadDocumentsModal />
            </Activity>
            <div className='modal_wrapper' onClick={(() => setmodalIsOpen(false))}></div>
            <div className='modal_div'>
                <h4>Add Module</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>

                <div className='modal_radio_btn_wrapper' style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px',
                    paddingLeft: '14px'
                }}>
                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='values' value={'values'} checked={radioValue === 'values'} />
                        <p>Values</p>
                    </div>
                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='card' value={'card'} checked={radioValue === 'card'} />
                        <p>Card Game</p>
                    </div>
                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='wheel' value={'wheel'} checked={radioValue === 'wheel'} />
                        <p>Wheel of Life </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='notes' value={'notes'} checked={radioValue === 'notes'} />
                        <p>Notes  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='goal' value={'goal'} checked={radioValue === 'goal'} />
                        <p>Goal Settings  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='motivation' value={'motivation'} checked={radioValue === 'motivation'} />
                        <p>Find your Motivation  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='habit' value={'habit'} checked={radioValue === 'habit'} />
                        <p>Habit Tracker  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='documents' value={'documents'} checked={radioValue === 'documents'} />
                        <p>Upload Documents  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='quotes' value={'quotes'} checked={radioValue === 'quotes'} />
                        <p>Quotes  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='who' value={'who'} checked={radioValue === 'who'} />
                        <p>Who am I? </p>
                    </div>
                </div>

                <div className='change_cancel_wrapper'>
                    <button onClick={(() => setmodalIsOpen(0))}>Cancel</button>
                    <div onClick={(() => {

                        navigate(path != '' && `${path}`)
                        if (radioValue === 'quotes') {
                            setquoteModal(true);
                        }
                        if (radioValue === 'documents') {
                            setuploadModal(true)
                        }
                    })}>
                        <Button children={'Add'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProgramModule
