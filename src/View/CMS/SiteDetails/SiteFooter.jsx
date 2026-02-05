import upload from '../../../assets/Vector (8).svg'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import Input from '../../../Components/Input'
const SiteFooter = ({ footerLogo, setfooterLogo, setfooterDescription, handleChange, siteDetailsForm, footerDescription }) => {
    return (
        <>
            <div className='site_header_logo_wrapper'>
                <div className='site_left_header_logo'>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',

                        }}>Footer Logo<span>*</span></label>
                        <div className='files_upload_wrapper'>
                            {!footerLogo && !siteDetailsForm.footer_logo && <>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            </>}
                            <input onChange={((e) => setfooterLogo(e.target.files[0]))} type='file' />
                            {footerLogo && <img style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }} src={URL.createObjectURL(footerLogo)} />}
                            {siteDetailsForm.footer_logo && !footerLogo && <img style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }} src={siteDetailsForm.footer_logo} />}
                        </div>
                    </div>
                </div>
                <div className='site_left_header_logo'>
                    <CustomTextEditor defaultValue={siteDetailsForm.footer_description || footerDescription} onChange={((data) => setfooterDescription(data))} label={'Footer Description'} required={true} />
                    <div style={{
                        marginTop: '20px'
                    }}>
                        <Input onChange={handleChange} value={siteDetailsForm.copyright} label={'Copyright'} name={'copyright'} required={true} placeholder={'Enter copyright detail'} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteFooter
