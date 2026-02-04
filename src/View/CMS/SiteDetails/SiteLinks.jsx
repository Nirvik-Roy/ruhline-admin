import React from 'react'
import Input from '../../../Components/Input'

const SiteLinks = ({ handleChange, siteDetailsForm }) => {
    return (
        <>
            <div className='site_links_grid_wrapper'>
                <div>
                    <Input onChange={handleChange} value={siteDetailsForm.facebook_url} name={'facebook_url'} label={'Facebook URL'} placeholder={'Enter facebook profil url..'} />
                </div>
                <div>
                    <Input onChange={handleChange} name={'instagram_url'} value={siteDetailsForm.instagram_url} label={'Instagram URL'} placeholder={'Enter instagram profile url'} />
                </div>
                <div>
                    <Input onChange={handleChange} value={siteDetailsForm.linkedin_url} name={'linkedin_url'} label={'LinkedIn URL'} placeholder={'Enter linkedin profile url'} />
                </div>
            </div>
        </>
    )
}

export default SiteLinks
