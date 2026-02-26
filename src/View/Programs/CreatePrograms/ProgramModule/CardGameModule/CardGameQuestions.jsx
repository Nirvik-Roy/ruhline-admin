import React, { use, useEffect, useState } from 'react'
import './CardGameModule.css'
import Button from '../../../../../Components/Button'
import DescriptiveModal from '../../../../Modal/DescriptiveModal'
import MultiChoiceModal from '../../../../Modal/MultiChoiceModal'
import SingleChoiceModal from '../../../../Modal/SingleChoiceModal'
import DropdownModal from '../../../../Modal/DropdownModal'
import menu from '../../../../../assets/menu.svg'
import edit from '../../../../../assets/Pencil.svg'
import deleteicon from '../../../../../assets/delete.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { getCardGameQuestionSets, postQuestionsInsideQuestionSet } from '../../../../../utils/Program'
import Loaders from '../../../../../Components/Loaders/Loaders'
import CardGameDescriptiveModal from '../../../../Modal/CardGameDescriptiveModal'
import CardGameMultichoiceModal from '../../../../Modal/CardGameMultichoiceModal'
import CardGameSingleChoiceModal from '../../../../Modal/CardGameSingleChoiceModal'
import CardGameDropdownModal from '../../../../Modal/CardGameDropdownModal'
const CardGameQuestions = () => {
    const navigate = useNavigate();
    const [allQuestionSets, setallQuestionSets] = useState([]);
    const [selectedIndex, setselectedIndex] = useState(null);
    const [questionId, setquestionId] = useState()
    const [dynamicOptions, setdynamicOptions] = useState(
        [
            {
                id: 1,
                title: 'Question 1',
                questions: [
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
                ]
            },
            {
                id: 2,
                title: 'Question 1',
                questions: [
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
                ]
            },

            {
                id: 3,
                title: 'Question 1',
                questions: [
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
                ]
            },
            {
                id: 4,
                title: 'Question 1',
                questions: [
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
                ]
            },
            {
                id: 5,
                title: 'Question 1',
                questions: [
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
                ]
            }
        ])
    console.log(dynamicOptions)
    const [loading, setloading] = useState(false);
    const { id, moduleId } = useParams();
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

    const getQuestionSets = async () => {
        try {
            setloading(true)
            const res = await getCardGameQuestionSets(id, moduleId)
            console.log(res)
            if (res?.success) {
                setallQuestionSets(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }



    useEffect(() => {
        if (id && moduleId) {
            getQuestionSets()
        }
    }, [id, moduleId])

    const updateQuestionText = (sectionIndex, questionIndex, newText) => {
        setdynamicOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[sectionIndex].questions[questionIndex].question_text = newText;
            return updatedOptions;
        });
    }
    const addEmptyOption = (sectionIndex, questionIndex) => {
        setdynamicOptions(prev => {
            const updated = [...prev];
            const question = updated[sectionIndex].questions[questionIndex];

            // Initialize options array if it doesn't exist
            if (!question.options) {
                question.options = [];
            }

            // Add new option (as string or object based on your needs)
            question.options.push(''); // If options are strings
            // OR if options should be objects:
            // question.options.push({ id: Date.now(), text: '', value: '' });

            return updated;
        });
    };
    const updateOptionText = (sectionIndex, questionIndex, optionIndex, value) => {
        setdynamicOptions(prev => {
            const updated = [...prev];
            const question = updated[sectionIndex].questions[questionIndex];

            question.options[optionIndex] = value;


            return updated;
        });
    };

    const removeOption = (sectionIndex, questionIndex, optionIndex) => {
        setdynamicOptions(prev => {
            const updated = [...prev];
            const question = updated[sectionIndex].questions[questionIndex];
            question.options = question.options.filter((_, idx) => idx !== optionIndex);
            return updated;
        });
    };


    const postQuestions = async () => {
        if (id) {
            try {
                setloading(true);
                const formData = new FormData()
                dynamicOptions[selectedIndex]?.questions.forEach((element) => {
                    if (element.type && element.question_text) {
                        formData.append(`type`, element.type)
                        formData.append('question_text', element.question_text)
                        if (element.options?.length > 0) {
                            element.options?.forEach(option => {
                                formData.append('options[]', option);
                            });
                        } else {
                            formData.append('options', [])
                        }
                    }
                })
                const res = await postQuestionsInsideQuestionSet(formData, moduleId, id, questionId);
                if (res?.success) {
                    setTabs(0);
                    getQuestionSets()
                    setdynamicOptions([
                        {
                            id: 1,
                            title: 'Question 1',
                            questions: [
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
                            ]
                        },
                        {
                            id: 2,
                            title: 'Question 1',
                            questions: [
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
                            ]
                        },

                        {
                            id: 3,
                            title: 'Question 1',
                            questions: [
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
                            ]
                        },
                        {
                            id: 4,
                            title: 'Question 1',
                            questions: [
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
                            ]
                        },
                        {
                            id: 5,
                            title: 'Question 1',
                            questions: [
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
                            ]
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
    return (
        <>
            {loading && <Loaders />}
            {tabs.descriptive && <CardGameDescriptiveModal postQuestions={postQuestions} selectedIndex={selectedIndex} updateQuestionText={updateQuestionText} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}
            {tabs.multiChoice && <CardGameMultichoiceModal postQuestions={postQuestions} updateOptionText={updateOptionText} dynamicOptions={dynamicOptions} updateQuestionText={updateQuestionText} addEmptyOption={addEmptyOption} removeOption={removeOption} selectedIndex={selectedIndex} tabsFunction={tabsFunction} />}

            {tabs.singleChoice && <CardGameSingleChoiceModal postQuestions={postQuestions} updateOptionText={updateOptionText} dynamicOptions={dynamicOptions} updateQuestionText={updateQuestionText} addEmptyOption={addEmptyOption} removeOption={removeOption} selectedIndex={selectedIndex} tabsFunction={tabsFunction} />}

            {tabs.dropdown && <CardGameDropdownModal postQuestions={postQuestions} updateOptionText={updateOptionText} dynamicOptions={dynamicOptions} updateQuestionText={updateQuestionText} addEmptyOption={addEmptyOption} removeOption={removeOption} selectedIndex={selectedIndex} tabsFunction={tabsFunction} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Questions</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate('/dashboard/programs/single-program/2'))}>Yoga Program 1</span> / <span onClick={(() => navigate('/dashboard/programs/single-program/2/card-game'))}>Card Game</span> / <span onClick={(() => navigate('/dashboard/programs/card-game/2/questions'))}>Questions</span></small>
                    </div>
                </div>

                <div className='card_game_questions_list_wrapper'>
                    {allQuestionSets?.length > 0 && allQuestionSets?.map((e, i) => (
                        <div className='card_game_questions_wrapper' key={e?.id}>
                            <div className='question_set_heading'>
                                <h2>{e?.title}</h2>
                                <hr />
                            </div>
                            <div className='questions_buttons_wrapper466'>
                                <h4>Questions</h4>
                                <div className='question_button'>
                                    <div onClick={(() => {
                                        setselectedIndex(i)
                                        tabsFunction(1)
                                        setquestionId(e?.id)
                                    })}>
                                        <Button styles={{
                                            border: '1px solid var(--primary-color)',
                                            borderRadius: '8px',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-color)',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }} children={'Add Descriptive'} />
                                    </div>

                                    <div onClick={(() => {
                                        setselectedIndex(i)
                                        tabsFunction(2)
                                        setquestionId(e?.id)

                                    })}>
                                        <Button styles={{
                                            border: '1px solid var(--primary-color)',
                                            borderRadius: '8px',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-color)',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }} children={'Add Multi Choice'} />
                                    </div>


                                    <div onClick={(() => {
                                        setselectedIndex(i)
                                        tabsFunction(3)
                                        setquestionId(e?.id)

                                    })}>
                                        <Button styles={{
                                            border: '1px solid var(--primary-color)',
                                            borderRadius: '8px',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-color)',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }} children={'Add Single Choice'} />
                                    </div>

                                    <div onClick={(() => {
                                        setselectedIndex(i)
                                        tabsFunction(4)
                                        setquestionId(e?.id)

                                    })}>
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
                                {e?.questions?.map((element,index)=>{
                                    return (
                                        <>
                                            <div className='added_modules_wrapper'>
                                                <div className='add_modules_enu_wrapper'>
                                                    <img src={menu} />
                                                    <p>Question {index+1} <small style={{
                                                        fontSize: '10px',
                                                        marginLeft: '5px'
                                                    }}>{element?.type}</small></p>
                                                </div>
                                                <div className='edit_modules_wrapper'>
                                                    <img src={edit} />
                                                    <img src={deleteicon} />
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                             
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default CardGameQuestions
