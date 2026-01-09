import React from 'react'
import laptopImg from '../../../assets/Group (2).svg'
import './CmsFaq.css'
import { useNavigate } from 'react-router-dom'
const CmsFaq = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>FAQ</h1>
                        <small><span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/faq/categories'))}>FAQ</span></small>
                    </div>
                </div>
                <div className='coaches_shift_card_wrapper'>
                    {['Mentee', 'Mentor'].map((e, i) => (
                        <div onClick={(() => navigate(e === 'Mentee' ? '/dashboard/cms/faq/mentee' : '/dashboard/cms/faq/mentor'))} key={e} className='coaches_shift_card'>
                            <img src={laptopImg} />
                            <p>{e}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CmsFaq
