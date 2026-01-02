import React from 'react'
import Input from '../../../Components/Input'

const SiteLinks = () => {
    return (
        <>
            <div className='site_links_grid_wrapper'>
                <Input label={'Facebook URL'} defaultValue={'www.facebook.com'} />
                <Input label={'Instagram URL'} defaultValue={'www.instagram.com'} />
                <Input label={'LinkedIn URL'} defaultValue={'www.facebook.com'} />
            </div>
        </>
    )
}

export default SiteLinks
