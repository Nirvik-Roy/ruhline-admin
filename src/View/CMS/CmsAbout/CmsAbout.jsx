import React from 'react'
import Button from '../../../Components/Button'
import CmsAboutSections from './CmsAboutSections'
const CmsAbout = () => {
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>About Us</h1>
                        <small> CMS / About Us</small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div>
                            <Button children={'Cancel'} styles={{
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '17px',
                                fontWeight: '600'
                            }} />
                        </div>

                        <div>
                            <Button children={'Save'} styles={{
                                fontSize: '15px'
                            }} />
                        </div>
                    </div>
                </div>
                <CmsAboutSections />
            </div>
        </>
    )
}

export default CmsAbout
