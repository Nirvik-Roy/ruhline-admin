import upload from '../../../assets/Vector (8).svg'
const SiteFavicon = ({ setSiteFavicon, siteFavicon, siteDetailsForm, siteErrors }) => {
    const handleFaviconImage = (e) => {
        setSiteFavicon(e.target.files[0])
    }
    return (
        <>
            <div className='input_form' style={{
                paddingLeft: '20px'
            }}>
                <label style={{
                    fontSize: '15px',
                }}>Upload Favicon<span>*</span></label>
                <div className='files_upload_wrapper'>
                    {/* 3) Placeholder (only if neither file nor existing image) */}
                    {!siteFavicon && !siteDetailsForm.favicon && (
                        <>
                            <img src={upload} alt="placeholder" />
                            <p>
                                Drag your files or <span>Browse</span>
                            </p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                        </>
                    )}

                    {/* 1) New file preview */}
                    {siteFavicon && (
                        <img
                            style={{
                                width: "100%",
                                height: "95%",
                                objectFit: "contain",
                            }}
                            src={URL.createObjectURL(siteFavicon)}
                            alt="new favicon"
                        />
                    )}

                    {/* 2) Existing image preview (only if no new file) */}
                    {!siteFavicon && siteDetailsForm.favicon && (
                        <img
                            style={{
                                width: "100%",
                                height: "95%",
                                objectFit: "contain",
                            }}
                            src={siteDetailsForm.favicon}
                            alt="existing favicon"
                        />
                    )}

                    <input type="file" onChange={handleFaviconImage} />
                </div>
            </div>

            {siteErrors?.favicon && <small style={{
                marginLeft:'25px',
                color:'red',
                fontSize:'12px',
                marginTop:'3px'
            }}>* {siteErrors?.favicon[0]}</small>}
        </>
    )
}

export default SiteFavicon
