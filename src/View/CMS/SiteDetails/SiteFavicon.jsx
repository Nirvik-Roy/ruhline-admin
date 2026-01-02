import upload from '../../../assets/Vector (8).svg'
const SiteFavicon = () => {
    return (
        <>
            <div className='input_form' style={{
                paddingLeft:'20px'
            }}>
                <label style={{
                    fontSize: '15px',
                   
                }}>Upload Favicon<span>*</span></label>
                <div className='files_upload_wrapper'>
                    <img src={upload} />
                    <p>Drag your files or <span>Browse</span></p>
                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                    <input type='file' />
                </div>
            </div>
        </>
    )
}

export default SiteFavicon
