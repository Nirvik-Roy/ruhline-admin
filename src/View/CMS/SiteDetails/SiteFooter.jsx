import React, { useState } from 'react'
import upload from '../../../assets/Vector (8).svg'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import Input from '../../../Components/Input'
const SiteFooter = () => {

    return (
        <>
            <div className='site_header_logo_wrapper'>
                <div className='site_left_header_logo'>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',

                        }}>Footer Logo<span>*</span></label>
                        <div className='files_upload_wrapper'>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            <input type='file' />
                        </div>
                    </div>
                </div>
                <div className='site_left_header_logo'>
                   <CustomTextEditor label={'Footer Description'} required={true}/>
                   <div style={{
                    marginTop:'20px'
                   }}>
                   <Input label={'Copyright'} required={true} defaultValue={'© 2025 Ruhline. All rights reserved.'}/>

                   </div>
                </div>
            </div>
        </>
    )
}

export default SiteFooter
