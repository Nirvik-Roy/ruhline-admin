import React, { useState } from 'react'
import Button from '../../../../../Components/Button'
import menu from '../../../../../assets/menu.svg'
import edit from '../../../../../assets/Pencil.svg'
import deleteicon from '../../../../../assets/delete.svg'
import './ValuesModule.css'
import DescriptiveModal from '../../../../Modal/DescriptiveModal'
import MultiChoiceModal from '../../../../Modal/MultiChoiceModal'
import SingleChoiceModal from '../../../../Modal/SingleChoiceModal'
import DropdownModal from '../../../../Modal/DropdownModal'
const ValuesModule = () => {
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
                        <h2>Values</h2>
                        <small>Program Creation / Yoga Program 1 / Values</small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div>
                            <Button children={'Cancel'} styles={{
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>

                        <div>
                            <Button children={'Save'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='questions_wrapper'>
                    <h3>Questions</h3>
                    <div className='questions_tabs_wrapper'>
                        <div onClick={(() => tabsFunction(1))}>

                            <Button children={'Descriptive'} styles={{
                                border: '1px solid var(--primary-color)',
                                fontSize: '14px',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                backgroundColor: 'transparent'
                            }} />
                        </div>

                        <div onClick={(() => tabsFunction(2))}>
                            <Button children={'Multi Choice'} styles={{
                                border: '1px solid var(--primary-color)',
                                fontSize: '14px',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                backgroundColor: 'transparent'
                            }} />
                        </div>


                        <div onClick={(() => tabsFunction(3))}>
                            <Button children={'Single Choice'} styles={{
                                border: '1px solid var(--primary-color)',
                                fontSize: '14px',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                backgroundColor: 'transparent'
                            }} />
                        </div>

                        <div onClick={(() => tabsFunction(4))}>
                            <Button children={'Dropdown'} styles={{
                                border: '1px solid var(--primary-color)',
                                fontSize: '14px',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                backgroundColor: 'transparent'
                            }} />
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
        </>
    )
}

export default ValuesModule
