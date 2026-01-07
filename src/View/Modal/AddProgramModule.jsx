import React, { useState, Activity } from 'react'
import Button from '../../Components/Button'
import AddQuoteModuleModal from './AddQuoteModuleModal'
import UploadDocumentsModal from './UploadDocumentsModal'
const AddProgramModule = ({ setmodalIsOpen }) => {
    const [quoteModal, setquoteModal] = useState(false);
    const [uploadModal, setuploadModal] = useState(false)
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
                        <input type='radio' />
                        <p>Values</p>
                    </div>
                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Card Game</p>
                    </div>
                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Wheel of Life </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Notes  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Goal Settings  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Find your Motivation  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Habit Tracker  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Upload Documents  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Quotes  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' />
                        <p>Who am I? </p>
                    </div>
                </div>

                <div className='change_cancel_wrapper'>
                    <button onClick={(() => setmodalIsOpen(0))}>Cancel</button>
                    <Button children={'Add'} />
                </div>
            </div>
        </>
    )
}

export default AddProgramModule
