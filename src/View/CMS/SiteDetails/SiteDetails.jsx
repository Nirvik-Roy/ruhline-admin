import React, { Activity, useState } from 'react'
import './SiteDetails.css'
import Button from '../../../Components/Button'
import SiteFavicon from './SiteFavicon'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SiteLinks from './SiteLinks'
import ContactInfo from './ContactInfo'
import { useNavigate } from 'react-router-dom'
const SiteDetails = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const [siteFavicon, setSiteFavicon] = useState();
    const [headerLogo, setheaderLogo] = useState();
    const [pageHeaderlogo, setpageheaderlogo] = useState();
    const [footerLogo,setfooterLogo] = useState();
    const [footerDescription,setfooterDescription] = useState()
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsiteDetailsForm({
            ...siteDetailsForm,
            [name]: value
        })
    }
    console.log(siteDetailsForm)
    const siteTabsFunc = (i) => {
        setsiteTabs({
            favicon: i === 1 ? true : false,
            header: i === 2 ? true : false,
            footer: i === 3 ? true : false,
            socialMedia: i === 4 ? true : false,
            contactInfo: i === 5 ? true : false
        })
    }

    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Site Details</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/site-details'))}>Site Details</span></small>
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

                        <div>
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
                            <SiteFavicon siteFavicon={siteFavicon} setSiteFavicon={setSiteFavicon} />
                        </Activity>
                        }
                        {
                            <Activity mode={sitetabs.header ? 'visible' : 'hidden'}>
                                <SiteHeader pageHeaderlogo={pageHeaderlogo} setpageheaderlogo={setpageheaderlogo} headerLogo={headerLogo} setheaderLogo={setheaderLogo} />
                            </Activity>
                        }

                        {
                            <Activity mode={sitetabs.footer ? 'visible' : 'hidden'}>
                                <SiteFooter siteDetailsForm={siteDetailsForm} handleChange={handleChange} setfooterDescription={setfooterDescription} footerLogo={footerLogo} setfooterLogo={setfooterLogo} />
                            </Activity>
                        }

                        {
                            <Activity mode={sitetabs.socialMedia ? 'visible' : 'hidden'}>
                                <SiteLinks handleChange={handleChange} siteDetailsForm={siteDetailsForm} />
                            </Activity>
                        }
                        {
                            <Activity mode={sitetabs.contactInfo ? 'visible' : 'hidden'}>
                                <ContactInfo />
                            </Activity>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteDetails
