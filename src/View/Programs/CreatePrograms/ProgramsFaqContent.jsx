import React from 'react'
import Input from '../../../Components/Input'
import Textarea from '../../../Components/Textarea'
import crossIcon from '../../../assets/content.svg'
import Button from '../../../Components/Button'
import upload from '../../../assets/Vector (8).svg'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
const ProgramsFaqContent = ({ dynamicFaq, setdynamicFaq, faqImage, setfaqImage }) => {
    const addDynamicFaq = () => {
        setdynamicFaq([
            ...dynamicFaq,
            {
                id: Date.now(),
                heading: "",
                description: ""
            }
        ])
    }

    const handleDelelte = (id) => {
        const dummyData = [...dynamicFaq];
        const filteredData = dummyData.filter((e) => e.id != id)
        setdynamicFaq(filteredData)
    }

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        setdynamicFaq(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [name]: value } : item
            )
        );
    }

    const ontextChange = (id, data) => {
        setdynamicFaq(prevItems => (
            prevItems.map(item => item.id === id ? { ...item, ['description']: data } : item)
        ))
    }

    return (
        <>
            <div className='dropdown_content_wrapper45'>
                {dynamicFaq?.length > 0 && dynamicFaq?.map((element, i) => (
                    <div className='dropdown_content4623'>
                        <div className='drodown_head456'>
                            <p>FAQ {i + 1}</p>
                            <img onClick={(() => handleDelelte(element?.id))} src={crossIcon} />
                        </div>
                        <Input onChange={((e) => handleChange(element?.id, e))} name={'heading'} label={'Heading'} value={element?.heading} placeholder={'Enter heading'} />
                        <CustomTextEditor onChange={((data) => ontextChange(element?.id, data))} name={'description'} defaultValue={element?.description} label={'Description'} />
                    </div>
                ))}


                <Button onClick={addDynamicFaq} children={'Add Another Option'} styles={{
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
                    }}>FAQ Image</label>
                    <div className='files_upload_wrapper'>
                        {!faqImage && <>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                        </>
                        }

                        {faqImage instanceof File && <img style={{
                            width: '100%',
                            height: '95%',
                            objectFit: 'contain'
                        }} src={URL.createObjectURL(faqImage)} alt="Preview" />}


                        {typeof faqImage === "string" && (
                            <img
                                style={{
                                    width: "100%",
                                    height: "95%",
                                    objectFit: "contain"
                                }}
                                src={faqImage}
                                alt="Preview"
                            />
                        )}
                        <input onChange={((e) => setfaqImage(e.target.files[0]))} type='file' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProgramsFaqContent
