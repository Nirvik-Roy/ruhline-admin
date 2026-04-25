import React, { useEffect, useState } from 'react'
import Button from '../../../../../Components/Button.jsx'
import '../../../IntermediateSteps/IntermediateSteps.css'
import Input from '../../../../../Components/Input.jsx'
import crossIcon from '../../../../../assets/content.svg'
import CustomTextEditor from '../../../../../Components/CustomTextEditor/CustomTextEditor.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../../../../Components/Loaders/Loaders.jsx'
import toast from 'react-hot-toast'
import { getSpecificmistakesIntermediate, putSpecificmistakesIntermediate } from '../../../../../utils/Program.js'
const SingleMistakesIntermediate = () => {
    const navigate = useNavigate();
    const { id, moduleId } = useParams()
    const [allMistakesData, setallMistakesData] = useState({})
    const [headline, setheadline] = useState("");
    const [loading, setloading] = useState(false)
    const [postloading, setpostloading] = useState(false)

    const [mistakesData, setmistakesData] = useState([
        {
            id: 0 + 1,
            description: ''
        }
    ])

    const handleMistakes = (data, id) => {
        setmistakesData(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, description: data } : item
            )
        );
    }

    const addMistakes = () => {
        setmistakesData([
            ...mistakesData,
            {
                id: mistakesData.length + 1,
                description: ""
            }
        ])
    }

    const deleteOptions = (id) => {
        if (mistakesData.length != 1) {
            const dummyData = [...mistakesData];
            const filteredData = dummyData.filter((e) => e.id != id);
            setmistakesData(filteredData)
        }
    }

    const handleSubmit = async () => {
        if (headline != '') {
            try {
                setpostloading(true);
                const formData = new FormData();
                formData.append('headline', headline || "")
                if (mistakesData.length > 0) {
                    mistakesData.forEach((e, index) => {
                        formData.append(`mistakes[${index}][description]`, e?.description || "")
                        formData.append(`mistakes[${index}][sort_order] `, index)
                    })
                }
                await putSpecificmistakesIntermediate(formData, id, moduleId)
            } catch (err) {
                console.log(err)
            } finally {
                setpostloading(false)
            }
        } else {
            toast.error('Plz enter the headline field')
        }

    }

    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getSpecificmistakesIntermediate(id, moduleId)
            setallMistakesData(res?.data || {})
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        if (id && moduleId) {
            fetchData()
        }

    }, [])

    useEffect(() => {
        setheadline(allMistakesData?.headline || "")
        setmistakesData(allMistakesData?.mistakes || [
            {
                id: 0 + 1,
                description: ""
            }
        ])
    }, [allMistakesData])
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Eight most common mistakes Intermediate Page</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate/common-mistakes'))}>Eight most common mistakes Intermediate Page</span></small>
                    </div>
                    <div className='coaches_button_wapper'>

                        {/* <div>
                            <Button children={'Cancel'} styles={{
                                fontSize: '13px',
                                color: 'var(--text-color)',
                                background: 'transparent',
                                border: 'none'
                            }} />
                        </div> */}
                        <div onClick={handleSubmit}>
                            <Button loading={postloading} loadingText='Saving...' children={'Save'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                {!loading && <>
                    <div className='values_inputs_wrapper462'>
                        <Input value={headline} onChange={((e) => setheadline(e.target.value))} label={'Headline'} required={'true'} placeholder={'Enter headline'} />
                    </div>


                    <div className='cms_faq_wrapper'>
                        {mistakesData?.length > 0 && mistakesData?.map((e, i) => (
                            <div className='cms_faq_list'>
                                <p>Mistake {i + 1}</p>
                                <div className='cms_faq_questions_wrapper'>
                                    <CustomTextEditor defaultValue={e?.description} onChange={((data) => handleMistakes(data, e?.id))} label={'Description'} />
                                </div>
                                <img onClick={(() => deleteOptions(e?.id))} style={i != 0 ? {
                                    visibility: 'visible'
                                } : {
                                    visibility: 'hidden'
                                }} src={crossIcon} />
                            </div>
                        ))}

                    </div>


                    <div onClick={addMistakes}>
                        <Button children={'Add Mistake'} styles={{
                            color: 'var(--text-color)',
                            border: '1px solid var(--primary-color)',
                            padding: '12px 15px',
                            background: 'transparent',
                            fontSize: '13px'
                        }} />
                    </div>
                </>}

            </div>
        </>
    )
}

export default SingleMistakesIntermediate
