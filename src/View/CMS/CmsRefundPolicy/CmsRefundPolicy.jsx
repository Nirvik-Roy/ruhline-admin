import React from 'react'
import Button from '../../../Components/Button'
import '../CmsTermsConditions/CmsTermsConditions.css'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
const CmsRefundPolicy = () => {
  return (
    <>
        <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Refund Policy</h1>
                        <small> CMS / Refund Policy</small>
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
                <div className='custom_editor_wrapper'>
                    <CustomTextEditor label={'Refund Policy Description'} required={true} />
                </div>

            </div>
    </>
  )
}

export default CmsRefundPolicy
