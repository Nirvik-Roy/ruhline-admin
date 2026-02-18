import React from 'react'
import Input from '../../../Components/Input'
import Textarea from '../../../Components/Textarea'
import crossIcon from '../../../assets/content.svg'
import Button from '../../../Components/Button'
import upload from '../../../assets/Vector (8).svg'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'

const CreateProgramsHowWorks = ({ setHowItWorksImage, HowItWorksImage, dynamicHowItWorks, setdynamicHowItWorks }) => {

    const addDynamicHowItWorks = () => {
        setdynamicHowItWorks([
            ...dynamicHowItWorks,
            {
                id: Date.now(),
                description: "",
            }
        ])
    }

    const handleDelelte = (id) => {
        const dummyData = [...dynamicHowItWorks];
        const filteredData = dummyData.filter((e) => e.id != id)
        setdynamicHowItWorks(filteredData)
    }

    const ontextChange = (id, data) => {
        setdynamicHowItWorks(prevItems => (
            prevItems.map(item => item.id === id ? { ...item, ['description']: data } : item)
        ))
    }
    return (
        <>
            <div className='dropdown_content_wrapper45'>
                {dynamicHowItWorks?.length > 0 && dynamicHowItWorks?.map((element, index) => (
                    <div className='dropdown_content4623'>
                        <div className='drodown_head456'>
                            <p>Point {index + 1}</p>
                            <img onClick={(() => handleDelelte(element?.id))} src={crossIcon} />
                        </div>
                        <CustomTextEditor onChange={((data) => ontextChange(element?.id, data))} defaultValue={element?.description} label={'Description'} />
                    </div>

                ))}

                <Button onClick={addDynamicHowItWorks} children={'Add Another Option'} styles={{
                    border: '1px solid var(--primary-color)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-color)',
                    fontSize: '12px',
                    fontWeight: '600'
                }} />
                <div className='input_form'>
                    <label style={{
                        fontSize: '15px',
                        fontWeight: '600'
                    }}>How it works Image</label>
                    <div className='files_upload_wrapper'>
                        {!HowItWorksImage && <>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                        </>
                        }

                        {HowItWorksImage instanceof File && <img style={{
                            width: '100%',
                            height: '95%',
                            objectFit: 'contain'
                        }} src={URL.createObjectURL(HowItWorksImage)} alt="Preview" />}


                        {typeof HowItWorksImage === "string" && (
                            <img
                                style={{
                                    width: "100%",
                                    height: "95%",
                                    objectFit: "contain"
                                }}
                                src={HowItWorksImage}
                                alt="Preview"
                            />
                        )}
                        <input onChange={((e) => setHowItWorksImage(e.target.files[0]))} type='file' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProgramsHowWorks
