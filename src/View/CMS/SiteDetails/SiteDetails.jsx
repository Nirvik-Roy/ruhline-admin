import React, { Activity, useEffect, useState } from 'react'
import './SiteDetails.css'
import Button from '../../../Components/Button'
import SiteFavicon from './SiteFavicon'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SiteLinks from './SiteLinks'
import ContactInfo from './ContactInfo'
import { useNavigate } from 'react-router-dom'
import { getSiteDetails, postSiteDetails } from '../../../utils/cms'
import Loaders from '../../../Components/Loaders/Loaders'
const SiteDetails = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [siteDetails, setsiteDetails] = useState()
    const [siteErrors, setsiteErrors] = useState()
    const [siteFavicon, setSiteFavicon] = useState();
    const [headerLogo, setheaderLogo] = useState();
    const [pageHeaderlogo, setpageheaderlogo] = useState();
    const [footerLogo, setfooterLogo] = useState();
    const [footerDescription, setfooterDescription] = useState()
    const [sitetabs, setsiteTabs] = useState({
        favicon: true,
        header: false,
        footer: false,
        socialMedia: false,
        contactInfo: false
    })

    const [siteDetailsForm, setsiteDetailsForm] = useState({
        favicon: '',
        header_logo: '',
        page_header_image: '',
        footer_logo: '',
        footer_description: '',
        copyright: '',
        facebook_url: '',
        instagram_url: '',
        linkedin_url: '',
        address_line_1: '',
        address_line_2: '',
        landmark: '',
        city_id: '',
        state_id: '',
        country_id: '',
        zipcode: ''
    })

    const fetchSiteDetails = async () => {
        try {
            setloading(true)
            const res = await getSiteDetails();
            setsiteDetails(res?.data);
            console.log(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchSiteDetails()
    }, [])

    useEffect(() => {
        setsiteDetailsForm({
            favicon: siteDetails?.favicon || '',
            header_logo: siteDetails?.header_logo || '',
            page_header_image: siteDetails?.page_header_image || '',
            footer_logo: siteDetails?.footer_logo || '',
            footer_description: siteDetails?.footer_description || '',
            copyright: siteDetails?.copyright || '',
            facebook_url: siteDetails?.social_media?.facebook_url || '',
            instagram_url: siteDetails?.social_media?.instagram_url || '',
            linkedin_url: siteDetails?.social_media?.linkedin_url || '',
            address_line_1: siteDetails?.address?.address_line_1 || '',
            address_line_2: siteDetails?.address?.address_line_2 || '',
            landmark: siteDetails?.address?.landmark || '',
            city_id: siteDetails?.address?.city_id || '',
            state_id: siteDetails?.address?.state_id || '',
            country_id: siteDetails?.address?.country_id || '',
            zipcode: siteDetails?.address?.zipcode || ''
        })
    }, [siteDetails])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsiteDetailsForm({
            ...siteDetailsForm,
            [name]: value
        })
    }
    const siteTabsFunc = (i) => {
        setsiteTabs({
            favicon: i === 1 ? true : false,
            header: i === 2 ? true : false,
            footer: i === 3 ? true : false,
            socialMedia: i === 4 ? true : false,
            contactInfo: i === 5 ? true : false
        })
    }

    const hanleSubmit = async () => {
        try {
            setloading(true);
            const formData = new FormData();
            { siteFavicon && formData.append('favicon', siteFavicon) }
            { headerLogo && formData.append('header_logo', headerLogo) }
            { pageHeaderlogo && formData.append('page_header_image', pageHeaderlogo) }
            { footerLogo && formData.append('footer_logo', footerLogo) }
            { footerDescription && formData.append('footer_description', footerDescription) }
            { siteDetailsForm.copyright && formData.append('copyright', siteDetailsForm.copyright) }
            { siteDetailsForm.facebook_url && formData.append('facebook_url', siteDetailsForm.facebook_url) }
            { siteDetailsForm.instagram_url && formData.append('instagram_url', siteDetailsForm.instagram_url) }
            { siteDetailsForm.linkedin_url && formData.append('linkedin_url', siteDetailsForm.linkedin_url) }
            { siteDetailsForm.address_line_1 && formData.append('address_line_1', siteDetailsForm.address_line_1) }
            { siteDetailsForm.address_line_2 && formData.append('address_line_2', siteDetailsForm.address_line_2) }
            { siteDetailsForm.landmark && formData.append('landmark', siteDetailsForm.landmark) }
            { siteDetailsForm.city_id && formData.append('city_id', siteDetailsForm.city_id) }
            { siteDetailsForm.state_id && formData.append('state_id', siteDetailsForm.state_id) }
            { siteDetailsForm.country_id && formData.append('country_id', siteDetailsForm.country_id) }
            { siteDetailsForm.zipcode && formData.append('zipcode', siteDetailsForm.zipcode) }
            const res = await postSiteDetails(formData);
            setsiteErrors(res)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const cancelAll = () =>{
        setsiteDetailsForm({
            favicon:  '',
            header_logo:  '',
            page_header_image:   '',
            footer_logo:  '',
            footer_description:   '',
            copyright:   '',
            facebook_url:  '',
            instagram_url:   '',
            linkedin_url:   '',
            address_line_1:  '',
            address_line_2:  '',
            landmark:  '',
            city_id:  '',
            state_id:  '',
            country_id: '',
            zipcode:   ''
        })
    }



    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Site Details</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/site-details'))}>Site Details</span></small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div onClick={(() => cancelAll())}>
                            <Button children={'Cancel'} styles={{
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '17px',
                                fontWeight: '600'
                            }} />
                        </div>

                        <div onClick={(() => hanleSubmit())}>
                            <Button children={'Save'} styles={{
                                fontSize: '15px'
                            }} />
                        </div>

                    </div>
                </div>

                <div className='site_details_wrapper'>
                    <div className='site_left_wrapper'>
                        {['Favicon', 'Header', 'Footer', 'Social Media Links', 'Contact Info'].map((e, i) => (
                            <h2 style={i === index ? {
                                borderRadius: '8px',
                                border: '1px solid rgba(217, 217, 217, 1)',
                                color: 'var(--primary-color)',
                                transition: '0.2s linear all'
                            } : { transition: '0.2s linear all' }} onClick={(() => {
                                setIndex(i)
                                siteTabsFunc(i + 1)
                            })} key={i}>{e}</h2>
                        ))}

                    </div>
                    <div className='site_right_wrapper'>
                        {<Activity mode={sitetabs.favicon ? 'visible' : 'hidden'}>
                            <SiteFavicon siteDetailsForm={siteDetailsForm} siteFavicon={siteFavicon} setSiteFavicon={setSiteFavicon} />
                        </Activity>
                        }
                        {
                            <Activity mode={sitetabs.header ? 'visible' : 'hidden'}>
                                <SiteHeader siteDetailsForm={siteDetailsForm} pageHeaderlogo={pageHeaderlogo} setpageheaderlogo={setpageheaderlogo} headerLogo={headerLogo} setheaderLogo={setheaderLogo} />
                            </Activity>
                        }

                        {
                            <Activity mode={sitetabs.footer ? 'visible' : 'hidden'}>
                                <SiteFooter footerDescription={footerDescription} siteDetailsForm={siteDetailsForm} handleChange={handleChange} setfooterDescription={setfooterDescription} footerLogo={footerLogo} setfooterLogo={setfooterLogo} />
                            </Activity>
                        }

                        {
                            <Activity mode={sitetabs.socialMedia ? 'visible' : 'hidden'}>
                                <SiteLinks handleChange={handleChange} siteDetailsForm={siteDetailsForm} />
                            </Activity>
                        }
                        {
                            <Activity mode={sitetabs.contactInfo ? 'visible' : 'hidden'}>
                                <ContactInfo handleChange={handleChange} siteDetailsForm={siteDetailsForm} />
                            </Activity>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteDetails
