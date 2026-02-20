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
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../../../../Components/Loaders/Loaders.jsx'
import { postValuesQuestion } from '../../../../../utils/Program'
const ValuesModule = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const { id } = useParams();
    const [dynamicOptions, setdynamicOptions] = useState([
        {
            id: 1,
            type: 'descriptive',
            question_text: '',
            options: null,
        }, {
            id: 2,
            type: 'multi_choice',
            question_text: '',
            options: []
        }, {
            id: 3,
            type: 'single_choice',
            question_text: '',
            options: []
        },
        {
            id: 4,
            type: 'dropdown',
            question_text: '',
            options: []
        }
    ])
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

    const addEmptyOption = (questionIndex) => {
        setdynamicOptions(prev =>
            prev.map((item, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...item,
                        options: [...item.options, '']
                    }
                    : item
            )
        );
    };

    const removeOption = (questionIndex, optionIndex) => {
        setdynamicOptions(prev =>
            prev.map((item, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...item,
                        options: item.options.filter((_, oIndex) => oIndex !== optionIndex)
                    }
                    : item
            )
        );
    };

    const updateQuestionText = (questionIndex, text) => {
        setdynamicOptions(prev =>
            prev.map((item, qIndex) =>
                qIndex === questionIndex
                    ? { ...item, question_text: text }
                    : item
            )
        );
    };

    const updateOptionText = (questionIndex, optionIndex, newValue) => {
        setdynamicOptions(prev =>
            prev.map((item, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...item,
                        options: item.options.map((opt, oIndex) =>
                            oIndex === optionIndex ? newValue : opt
                        )
                    }
                    : item
            )
        );
    };

    const postQuestions = async (structureId) => {
        if (structureId && id) {
            try {
                setloading(true);
                const formData = new FormData()
                dynamicOptions.forEach((element) => {
                    if (element.type && element.question_text) {
                        formData.append(`type`, element.type)
                        formData.append('question_text', element.question_text)
                        if (element.options?.length > 0) {
                            element.options?.forEach(option => {
                                formData.append('options[]', option.value);
                            });
                        } else {
                            formData.append('options', [])
                        }
                    }
                })
                const res = await postValuesQuestion(formData, structureId, id);
                if (res?.success) {
                    setTabs(0)
                    setdynamicOptions([{
                        id: 1,
                        type: 'descriptive',
                        question_text: '',
                        options: null,
                    }, {
                        id: 2,
                        type: 'multi_choice',
                        question_text: '',
                        options: []
                    }, {
                        id: 3,
                        type: 'single_choice',
                        question_text: '',
                        options: []
                    },
                    {
                        id: 4,
                        type: 'dropdown',
                        question_text: '',
                        options: []
                    }
                    ])
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }
    console.log(dynamicOptions)
    return (
        <>
            {tabs.descriptive && <DescriptiveModal updateQuestionText={updateQuestionText} postQuestions={postQuestions} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}
            {tabs.multiChoice && <MultiChoiceModal updateOptionText={updateOptionText} updateQuestionText={updateQuestionText} removeOption={removeOption} addEmptyOption={addEmptyOption} postQuestions={postQuestions} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}

            {tabs.singleChoice && <SingleChoiceModal updateOptionText={updateOptionText} updateQuestionText={updateQuestionText} removeOption={removeOption} addEmptyOption={addEmptyOption} postQuestions={postQuestions} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}

            {tabs.dropdown && <DropdownModal updateOptionText={updateOptionText} updateQuestionText={updateQuestionText} removeOption={removeOption} addEmptyOption={addEmptyOption} postQuestions={postQuestions} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Values</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate('/dashboard/programs/single-program/2'))}>Yoga Program 1</span> / <span onClick={(() => navigate('/dashboard/programs/single-program/2/values'))}>Values</span></small>
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
