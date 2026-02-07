import React from 'react'
import upload from '../../../assets/Vector (8).svg'
const SiteHeader = ({ pageHeaderlogo, setpageheaderlogo, headerLogo, setheaderLogo, siteDetailsForm, siteErrors }) => {

    return (
        <>
            <div className='site_header_logo_wrapper'>
                <div className='site_left_header_logo'>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',

                        }}>Header Logo<span>*</span></label>
                        <div className='files_upload_wrapper'>
                            {/* 3) Placeholder — only if neither new file nor existing logo */}
                            {!headerLogo && !siteDetailsForm.header_logo && (
                                <>
                                    <img src={upload} alt="placeholder" />
                                    <p>
                                        Drag your files or <span>Browse</span>
                                    </p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                </>
                            )}

                            {/* 1) New file preview */}
                            {headerLogo && (
                                <img
                                    style={{ width: "100%", height: "95%", objectFit: "contain" }}
                                    src={URL.createObjectURL(headerLogo)}
                                    alt="new header logo"
                                />
                            )}

                            {/* 2) Existing logo — only if no new file selected */}
                            {!headerLogo && siteDetailsForm.header_logo && (
                                <img
                                    style={{ width: "100%", height: "95%", objectFit: "contain" }}
                                    src={siteDetailsForm.header_logo}
                                    alt="existing header logo"
                                />
                            )}

                            {/* File input */}
                            <input
                                type="file"
                                onChange={(e) => setheaderLogo(e.target.files[0])}
                            />
                        </div>
                        {siteErrors?.header_logo && <small style={{
                            marginLeft: '25px',
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '3px'
                        }}>* {siteErrors?.header_logo[0]}</small>}
                    </div>
                </div>
                <div className='site_left_header_logo'>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',

                        }}>Page Header Image<span>*</span></label>
                        <div className='files_upload_wrapper'>
                            {!pageHeaderlogo && !siteDetailsForm.page_header_image && <>
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

                        {siteErrors?.page_header_image && <small style={{
                            marginLeft: '25px',
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '3px'
                        }}>* {siteErrors?.page_header_image[0]}</small>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteHeader
