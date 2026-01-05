import React from 'react'
import laptopImg from '../../../assets/Group (2).svg'
import { useNavigate } from 'react-router-dom'
const CmsCategories = () => {
    const navigate = useNavigate();
    const categoriesLinks = [
        {
            name: 'Site Details',
            to: '/dashboard/cms/site-details'
        },
        {
            name: 'Home Page',
            to: '/dashboard/cms/cms-home'
        },
        {
            name: 'About Us',
            to: '/dashboard/cms/cms-about'
        },
        {
            name: ' Contact Inquiries',
            to: '/dashboard/cms/contact-queries'
        },
        {
            name: 'FAQ',
            to: '/dashboard/cms/faq/categories'
        },
        {
            name: 'Terms & Conditions',
            to: '/dashboard/cms/terms-conditions'
        },
        {
            name: 'Privacy Policy',
            to: '/dashboard/cms/privacy-policy'
        },
        {
            name: 'Refund Policy',
            to: '/dashboard/cms/refund-policy'
        },
        {
            name: 'Articles',
            to: '/dashboard/cms/articles'
        }
    ]
    return (
        <>
            <div className='dashboard_container'>
                <h1 style={{
                    color: 'var(--text-color)',
                    fontWeight: '600'
                }}>CMS</h1>
                <div className='coaches_shift_card_wrapper'>
                    {categoriesLinks.map((e, i) => (
                        <div onClick={(() => navigate(e.to))} key={e} className='coaches_shift_card' style={{
                            cursor: 'pointer'
                        }}>
                            <img src={laptopImg} />
                            <p>{e.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CmsCategories
