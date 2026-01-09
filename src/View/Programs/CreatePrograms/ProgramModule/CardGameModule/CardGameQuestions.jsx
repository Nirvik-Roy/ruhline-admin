import React, { useState } from 'react'
import './CardGameModule.css'
import Button from '../../../../../Components/Button'
import DescriptiveModal from '../../../../Modal/DescriptiveModal'
import MultiChoiceModal from '../../../../Modal/MultiChoiceModal'
import SingleChoiceModal from '../../../../Modal/SingleChoiceModal'
import DropdownModal from '../../../../Modal/DropdownModal'
import menu from '../../../../../assets/menu.svg'
import edit from '../../../../../assets/Pencil.svg'
import deleteicon from '../../../../../assets/delete.svg'
import { useNavigate } from 'react-router-dom'
const CardGameQuestions = () => {
    const navigate = useNavigate()
    const [tabs, setTabs] = useState({
        descriptive: false,
        multiChoice: false,
        singleChoice: false,
        dropdown: false
    })
    const tabsFunction = (i) => {
        setTabs({
            descriptive: i === 1 ? true : false,
            multiChoice: i === 2 ? true : false,
            singleChoice: i === 3 ? true : false,
            dropdown: i === 4 ? true : false
        })
    }
    return (
        <>
            {tabs.descriptive && <DescriptiveModal tabsFunction={tabsFunction} />}
            {tabs.multiChoice && <MultiChoiceModal tabsFunction={tabsFunction} />}
            {tabs.singleChoice && <SingleChoiceModal tabsFunction={tabsFunction} />}
            {tabs.dropdown && <DropdownModal tabsFunction={tabsFunction} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Questions</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate('/dashboard/programs/single-program/2'))}>Yoga Program 1</span> / <span onClick={(() => navigate('/dashboard/programs/single-program/2/card-game'))}>Card Game</span> / <span onClick={(() => navigate('/dashboard/programs/card-game/2/questions'))}>Questions</span></small>


                    </div>
                </div>

                <div className='card_game_questions_list_wrapper'>
                    {[1, 2, 3, 4, 5].map((e, i) => (
                        <div className='card_game_questions_wrapper' key={e}>
                            <div className='question_set_heading'>
                                <h2>Question Set {e}</h2>
                                <hr />
                            </div>
                            <div className='questions_buttons_wrapper466'>
                                <h4>Questions</h4>
                                <div className='question_button'>
                                    <div onClick={(() => tabsFunction(1))}>
                                        <Button styles={{
                                            border: '1px solid var(--primary-color)',
                                            borderRadius: '8px',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-color)',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }} children={'Add Descriptive'} />
                                    </div>


                                    <div onClick={(() => tabsFunction(2))}>
                                        <Button styles={{
                                            border: '1px solid var(--primary-color)',
                                            borderRadius: '8px',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-color)',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }} children={'Add Multi Choice'} />
                                    </div>


                                    <div onClick={(() => tabsFunction(3))}>
                                        <Button styles={{
                                            border: '1px solid var(--primary-color)',
                                            borderRadius: '8px',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-color)',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }} children={'Add Single Choice'} />
                                    </div>


                                    <div onClick={(() => tabsFunction(4))}>
                                        <Button styles={{
                                            border: '1px solid var(--primary-color)',
                                            borderRadius: '8px',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-color)',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }} children={'Add Dropdown'} />
                                    </div>
                                </div>
                            </div>
                            <div className='questions_list_wrapper4562'>
                                <div className='added_modules_wrapper'>
                                    <div className='add_modules_enu_wrapper'>
                                        <img src={menu} />
                                        <p>Question 1 <small style={{
                                            fontSize: '10px',
                                            marginLeft: '5px'
                                        }}>Single Choice</small></p>
                                    </div>
                                    <div className='edit_modules_wrapper'>
                                        <img src={edit} />
                                        <img src={deleteicon} />
                                    </div>
                                </div>

                                <div className='added_modules_wrapper'>
                                    <div className='add_modules_enu_wrapper'>
                                        <img src={menu} />
                                        <p>Question 2 <small style={{
                                            fontSize: '10px',
                                            marginLeft: '5px'
                                        }}>Multiple Choice</small></p>
                                    </div>
                                    <div className='edit_modules_wrapper'>
                                        <img src={edit} />
                                        <img src={deleteicon} />
                                    </div>
                                </div>


                                <div className='added_modules_wrapper'>
                                    <div className='add_modules_enu_wrapper'>
                                        <img src={menu} />
                                        <p>Question 3 <small style={{
                                            fontSize: '10px',
                                            marginLeft: '5px'
                                        }}>Descriptive</small></p>
                                    </div>
                                    <div className='edit_modules_wrapper'>
                                        <img src={edit} />
                                        <img src={deleteicon} />
                                    </div>
                                </div>

                                <div className='added_modules_wrapper'>
                                    <div className='add_modules_enu_wrapper'>
                                        <img src={menu} />
                                        <p>Question 4 <small style={{
                                            fontSize: '10px',
                                            marginLeft: '5px'
                                        }}>Dropdown</small></p>
                                    </div>
                                    <div className='edit_modules_wrapper'>
                                        <img src={edit} />
                                        <img src={deleteicon} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default CardGameQuestions
