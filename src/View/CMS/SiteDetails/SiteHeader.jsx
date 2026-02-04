import React from 'react'
import upload from '../../../assets/Vector (8).svg'
const SiteHeader = ({ pageHeaderlogo, setpageheaderlogo, headerLogo, setheaderLogo, siteDetailsForm }) => {

    return (
        <>
            <div className='site_header_logo_wrapper'>
                <div className='site_left_header_logo'>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',

                        }}>Header Logo<span>*</span></label>
                        <div className='files_upload_wrapper'>
                            {!headerLogo || !siteDetailsForm.header_logo && <>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            </>}
                            <input onChange={((e) => setheaderLogo(e.target.files[0]))} type='file' />
                            {headerLogo && <img style={{
                                width: '100%',
                                height: '95%',
                                objectFit: 'contain'
                            }} src={URL.createObjectURL(headerLogo)} />}
                            {siteDetailsForm.header_logo && !headerLogo && <img style={{
                                width: '100%',
                                height: '95%',
                                objectFit: 'contain'
                            }} src={siteDetailsForm.header_logo} />}

                        </div>
                    </div>
                </div>
                <div className='site_left_header_logo'>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',

                        }}>Page Header Image<span>*</span></label>
                        <div className='files_upload_wrapper'>
                            {!pageHeaderlogo || !siteDetailsForm.page_header_image && <>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            </>}

                            {pageHeaderlogo && <img style={{
                                width: '100%',
                                height: '95%',
                                objectFit: 'contain'
                            }} src={URL.createObjectURL(pageHeaderlogo)} />}

                            {siteDetailsForm.page_header_image && !pageHeaderlogo && <img style={{
                                width: '100%',
                                height: '95%',
                                objectFit: 'contain'
                            }} src={siteDetailsForm.page_header_image} />}
                            <input onChange={((e) => setpageheaderlogo(e.target.files[0]))} type='file' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteHeader
