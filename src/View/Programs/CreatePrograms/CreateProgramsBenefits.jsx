import React from 'react'
import Input from '../../../Components/Input'
import Textarea from '../../../Components/Textarea'
import crossIcon from '../../../assets/content.svg'
import Button from '../../../Components/Button'
import upload from '../../../assets/Vector (8).svg'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'

const CreateProgramsBenefits = ({ dynamicBenefits, setdynamicBenefits, benefitImage, setbenefitImage }) => {
    const addDynamicBenefits = () => {
        setdynamicBenefits([
            ...dynamicBenefits,
            {
                id: Date.now(),
                description: "",
            }
        ])
    }

    const handleDelelte = (id) => {
        const dummyData = [...dynamicBenefits];
        const filteredData = dummyData.filter((e) => e.id != id)
        setdynamicBenefits(filteredData)
    }

    const ontextChange = (id, data) => {
        setdynamicBenefits(prevItems => (
            prevItems.map(item => item.id === id ? { ...item, ['description']: data } : item)
        ))
    }
    return (
        <>
            <div className='dropdown_content_wrapper45'>
                {dynamicBenefits?.length > 0 && dynamicBenefits?.map((element, index) => (
                    <div className='dropdown_content4623'>
                        <div className='drodown_head456'>
                            <p>Benefit {index + 1}</p>
                            <img onClick={(() => handleDelelte(element?.id))} src={crossIcon} />
                        </div>
                        <CustomTextEditor onChange={((data) => ontextChange(element?.id, data))} defaultValue={element?.description} label={'Description'} />
                    </div>
                ))}


                <Button onClick={addDynamicBenefits} children={'Add Another Option'} styles={{
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
                    }}>Benefit Image</label>
                    <div className='files_upload_wrapper'>
                        {!benefitImage && <>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                        </>
                        }

                        {benefitImage instanceof File && <img style={{
                            width: '100%',
                            height: '95%',
                            objectFit: 'contain'
                        }} src={URL.createObjectURL(benefitImage)} alt="Preview" />}


                        {typeof benefitImage === "string" && (
                            <img
                                style={{
                                    width: "100%",
                                    height: "95%",
                                    objectFit: "contain"
                                }}
                                src={benefitImage}
                                alt="Preview"
                            />
                        )}
                        <input onChange={((e)=>setbenefitImage(e.target.files[0]))} type='file' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProgramsBenefits
