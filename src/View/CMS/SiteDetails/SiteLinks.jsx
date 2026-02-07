import React from 'react'
import Input from '../../../Components/Input'

const SiteLinks = ({ handleChange, siteDetailsForm,siteErrors }) => {
    return (
        <>
            <div className='site_links_grid_wrapper'>
                <div>
                    <Input onChange={handleChange} value={siteDetailsForm.facebook_url} name={'facebook_url'} label={'Facebook URL'} placeholder={'Enter facebook profil url..'} />

                    {siteErrors?.facebook_url && <small style={{
                        marginLeft: '5px',
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '3px'
                    }}>* {siteErrors?.facebook_url[0]}</small>}
                </div>
                <div>
                    <Input onChange={handleChange} name={'instagram_url'} value={siteDetailsForm.instagram_url} label={'Instagram URL'} placeholder={'Enter instagram profile url'} />

                    {siteErrors?.instagram_url && <small style={{
                        marginLeft: '5px',
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '3px'
                    }}>* {siteErrors?.instagram_url[0]}</small>}
                </div>
                <div>
                    <Input onChange={handleChange} value={siteDetailsForm.linkedin_url} name={'linkedin_url'} label={'LinkedIn URL'} placeholder={'Enter linkedin profile url'} />

                    {siteErrors?.linkedin_url && <small style={{
                        marginLeft: '5px',
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '3px'
                    }}>* {siteErrors?.linkedin_url[0]}</small>}
                </div>
            </div>
        </>
    )
}

export default SiteLinks
