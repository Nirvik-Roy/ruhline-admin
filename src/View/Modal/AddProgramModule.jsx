import React, { useState, Activity, useEffect } from 'react'
import Button from '../../Components/Button'
import AddQuoteModuleModal from './AddQuoteModuleModal'
import { useParams } from 'react-router-dom'
import Loaders from '../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'
import { postProgramModule } from '../../utils/Program'
const AddProgramModule = ({ setmodalIsOpen, fetchModules, cardCategoryId, programSettingsData }) => {
    const [quoteModal, setquoteModal] = useState(false);
    const [radioValue, setradioValue] = useState();
    const [radioTitle, setradioTitle] = useState('modules')
    const [loading, setloading] = useState(false)
    const { id } = useParams()

    const handleChange = (e) => {
        setradioValue(e.target.value)
        // setPath(data[e.target.value])
    }

    const postProgramModuleFunc = async () => {
        if (id && radioValue) {
            try {
                setloading(true)
                const res = await postProgramModule({
                    module_type: radioValue
                }, id)
                if (res?.success) {
                    fetchModules()
                    setmodalIsOpen(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error("Required data not found...")
        }
    }

    useEffect(() => {
        setradioValue('')
    }, [radioTitle])
    return (
        <>
            {loading && <Loaders />}
            <Activity mode={quoteModal ? 'visible' : 'hidden'}>
                <AddQuoteModuleModal />
            </Activity>


            <div className='modal_wrapper' onClick={(() => setmodalIsOpen(false))}></div>
            <div className='modal_div'>
                <h4>Add</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>

                <div className='modules_itermediate_steps_wrapperr'>
                    <div className='modules_radio_wrapper'>
                        <input checked={radioTitle === 'modules'} value={'modules'} onChange={((e) => setradioTitle(e.target.value))} type='radio' />
                        <p>Modules</p>
                    </div>
                    <div className='modules_radio_wrapper'>
                        <input checked={radioTitle === 'intermediatesteps'} value={'intermediatesteps'} onChange={((e) => setradioTitle(e.target.value))} type='radio' />
                        <p>Intermediate Steps</p>
                    </div>
                </div>
                {radioTitle === 'modules' && <div className='modal_radio_btn_wrapper' style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px',
                    paddingLeft: '14px'
                }}>
                    <h3 style={{
                        color: 'rgba(70, 35, 7, 1)',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>Modules</h3>
                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='values' value={'values'} checked={radioValue === 'values'} />
                        <p>Values</p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='wheel_of_life' value={'wheel_of_life'} checked={radioValue === 'wheel_of_life'} />
                        <p>Wheel of Life </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='card_game' value={'card_game'} checked={radioValue === 'card_game'} />
                        <p>Card Game</p>
                    </div>
                    {/* <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='card' value={'card'} checked={radioValue === 'card'} />
                        <p>Card Game</p>
                    </div>
                   

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='notes' value={'notes'} checked={radioValue === 'notes'} />
                        <p>Notes  </p>
                    </div>

                    */}
                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='goal_settings' value={'goal_settings'} checked={radioValue === 'goal_settings'} />
                        <p>Goal Settings  </p>
                    </div>
                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='find_your_motivation' value={'find_your_motivation'} checked={radioValue === 'find_your_motivation'} />
                        <p>Find your Motivation  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='who_am_i' value={'who_am_i'} checked={radioValue === 'who_am_i'} />
                        <p>Who am I?</p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='quote' value={'quote'} checked={radioValue === 'quote'} />
                        <p>Quotes  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='upload_documents' value={'upload_documents'} checked={radioValue === 'upload_documents'} />
                        <p>Upload Documents  </p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='habit_tracker' value={'habit_tracker'} checked={radioValue === 'habit_tracker'} />
                        <p>Habit Tracker  </p>
                    </div>

                    {/*

                    

              

                   */}
                </div>}


                {radioTitle === 'intermediatesteps' && <div className='modal_radio_btn_wrapper' style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px',
                    paddingLeft: '14px'
                }}>
                    <h3 style={{
                        color: 'rgba(70, 35, 7, 1)',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>Intermediate Steps</h3>
                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='Values Intermediate Page' value={'Values Intermediate Page'} checked={radioValue === 'Values Intermediate Page'} />
                        <p>Values Intermediate Page</p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='Goal Settings Intermediate Page' value={'Goal Settings Intermediate Page'} checked={radioValue === 'Goal Settings Intermediate Page'} />
                        <p>Goal Settings Intermediate Page</p>
                    </div>


                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='Eight most common mistakes Intermediate Page' value={'Eight most common mistakes Intermediate Page'} checked={radioValue === 'Eight most common mistakes Intermediate Page'} />
                        <p>Eight most common mistakes Intermediate Page</p>
                    </div>

                    <div className='modal_radio_wrapper'>
                        <input type='radio' onChange={handleChange} name='Questions for each goal - why? Intermediate Page' value={'Questions for each goal - why? Intermediate Page'} checked={radioValue === 'Questions for each goal - why? Intermediate Page'} />
                        <p>Questions for each goal - why? Intermediate Page</p>
                    </div>
                </div>}

                <div className='change_cancel_wrapper'>
                    <button onClick={(() => setmodalIsOpen(0))}>Cancel</button>
                    <div
                    >
                        {radioTitle === 'modules' && <Button
                            onClick={() => {
                                // Check if card game is selected but no category
                                if ((radioValue === 'card_game' && !programSettingsData?.card_category_id) || (radioValue == 'quote' && !programSettingsData?.quote_category_id)) {
                                    if (radioValue === 'card_game') {
                                        toast.error('Please select card category from program settings.');

                                        return;
                                    }

                                    if (radioValue === 'quote') {
                                        toast.error('Please select quote category from program settings.');

                                        return;
                                    }

                                }



                                // If we get here, it's safe to proceed
                                postProgramModuleFunc();
                            }}
                            children={'Add'}
                        />}

                        {radioTitle === 'intermediatesteps' && <Button children={'Add'} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProgramModule
