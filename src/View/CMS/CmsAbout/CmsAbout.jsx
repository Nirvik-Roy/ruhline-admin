import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import CmsAboutSections from './CmsAboutSections'
import { useNavigate } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import { getAllCmsData, putAllCmsData } from '../../../utils/cms'
const CmsAbout = () => {
    const navigate = useNavigate()
    const [sectionAboutImage, setSectionAboutImage] = useState();
    const [sectionDescription, setsectionDescription] = useState()
    const [founderDescription, setfounderDescription] = useState();
    const [loading, setloading] = useState(false)
    const [founderImage, setfounderImage] = useState();
    const [aboutData, setaboutData] = useState()
    const [missionData, setmissionData] = useState({
        sectionHeadline: '',
        sectionSecondaryHeadline: '',
        founderHeadline: '',
        founderSecondaryHeadline: '',
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setmissionData({
            ...missionData,
            [name]: value
        })
    }

    const fetchData = async () => {
        try {
            setloading(false)
            const res = await getAllCmsData('/admin/about-page');
            console.log(res?.data)
            setaboutData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setmissionData({
            sectionHeadline: aboutData?.section_01?.headline || '',
            sectionSecondaryHeadline: aboutData?.section_01?.secondary_headline || '',
            founderHeadline: aboutData?.section_03?.headline || '',
            founderSecondaryHeadline: aboutData?.section_03?.secondary_headline || '',
        })
        setsectionDescription(aboutData?.section_01?.description || '')
        setSectionAboutImage(aboutData?.section_01?.about_us_image || null)
        setfounderDescription(aboutData?.section_03?.description || '')
        setfounderImage(aboutData?.section_03?.image || null)

        const mappedSections = aboutData?.section_02?.mission_vision_values?.length > 0 && aboutData?.section_02?.mission_vision_values?.map((section, index) => ({
            id: section.id || index + 1,
            type: section?.type,
            title: section?.title || '',
            icon_image: section?.icon || null,
            description: section?.description || ''
        }))

        setvalues(mappedSections)
    }, [aboutData])

    const [values, setvalues] = useState([
        {
            id: 1,
            type: 'mission',
            icon_image: null,
            title: '',
            description: ''
        },
        {
            id: 2,
            type: 'vision',
            icon_image: null,
            title: '',
            description: ''
        },
        {
            id: 3,
            type: 'values',
            icon_image: null,
            title: '',
            description: ''
        },
    ])


    const handleSubmit = async () => {
        try {
            setloading(true)
            const formData = new FormData()
            formData.append('section_one[headline]', missionData?.sectionHeadline || "")
            formData.append('section_one[secondary_headline]', missionData?.sectionSecondaryHeadline || "")
            formData.append('section_one[description]', sectionDescription || "")
            if (sectionAboutImage instanceof File) {
                formData.append('section_one[about_us_image]', sectionAboutImage)
            }
            if (values.length > 0) {
                values.forEach((e, index) => {
                    formData.append(`mission_vision_values[${index}][type]`, e?.type || "")
                    if (e?.icon_image && e?.icon_image instanceof File) {
                        formData.append(`mission_vision_values[${index}][icon_image]`, e?.icon_image)
                    }
                    formData.append(`mission_vision_values[${index}][title]`, e?.title || "")
                    formData.append(`mission_vision_values[${index}][description]`, e?.description || "")

                })
            }
            formData.append('founder[headline]', missionData.founderHeadline || "")
            formData.append('founder[secondary_headline]', missionData.founderSecondaryHeadline || "")
            formData.append('founder[description]', founderDescription || "")
            if (founderImage && founderImage instanceof File) {
                formData.append('founder[image]', founderImage)
            }
            const res = await putAllCmsData('/admin/about-page', formData);
            console.log(res)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>About Us</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/cms-about'))}>About Us</span></small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div>
                            <Button children={'Cancel'} styles={{
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '17px',
                                fontWeight: '600'
                            }} />
                        </div>

                        <div onClick={handleSubmit}>
                            <Button children={'Save'} styles={{
                                fontSize: '15px'
                            }} />
                        </div>
                    </div>
                </div>
                <CmsAboutSections onChange={onChange} missionData={missionData} founderImage={founderImage} setfounderImage={setfounderImage} setfounderDescription={setfounderDescription} founderDescription={founderDescription} sectionDescription={sectionDescription} setsectionDescription={setsectionDescription} sectionAboutImage={sectionAboutImage} setSectionAboutImage={setSectionAboutImage} setvalues={setvalues} values={values} />
            </div>
        </>
    )
}

export default CmsAbout
