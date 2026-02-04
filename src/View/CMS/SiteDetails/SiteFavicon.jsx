import upload from '../../../assets/Vector (8).svg'
const SiteFavicon = ({ setSiteFavicon, siteFavicon }) => {
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
                    {!siteFavicon && <>
                        <img src={upload} />
                        <p>Drag your files or <span>Browse</span></p>
                        <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                    </>}
                    {siteFavicon && <img style={{
                        width:'100%',
                        height:'95%',
                        objectFit:'contain'
                    }} src={URL.createObjectURL(siteFavicon)} />}
                    <input onChange={handleFaviconImage} type='file' />
                </div>
            </div>
        </>
    )
}

export default SiteFavicon
