import React from 'react'
import Button from '../../../Components/Button'
import img from '../../../assets/image (2).png'
import editsvg from '../../../assets/Frame 237764.svg'
import deleteSvg from '../../../assets/Group 80927.svg'
import './CmsArticles.css'
import { useNavigate } from 'react-router-dom'
const CmsArticles = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Articles</h2>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/articles'))}>Articles</span></small>

                    </div>

                    <div className='coaches_button_wapper'>
                        <div onClick={(() => navigate('/dashboard/cms/article-categories'))} >
                            <Button children={'Article Categories'} styles={{
                                color: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>

                        <div onClick={(() => navigate('/dashboard/cms/add-articles'))}>
                            <Button children={'Add Article'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='cms_articles_grid_wrapper'>
                    <div className='cms_card_articles'>
                        <div className='cms_card_img'>
                            <img className='edit_cms_card_img' src={editsvg} />
                            <img className='delete_cms_card_img' src={deleteSvg} />
                            <img className='cms_img456' src={img} />
                        </div>

                        <div className='cms_articles_para'>
                            <div className='cms_articles_title'>
                                <p>Yoga</p>
                                <small>10 Days ago</small>
                            </div>
                            <div className='cms_articles_para'>
                                <h3>How Life Coaching is useful</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor...</p>
                            </div>
                        </div>
                    </div>

                    <div className='cms_card_articles'>
                        <div className='cms_card_img'>
                            <img className='edit_cms_card_img' src={editsvg} />
                            <img className='delete_cms_card_img' src={deleteSvg} />
                            <img className='cms_img456' src={img} />
                        </div>
                        <div className='cms_articles_para'>
                            <div className='cms_articles_title'>
                                <p>Life coaching</p>
                                <small>10 Days ago</small>
                            </div>
                            <div className='cms_articles_para'>
                                <h3>How Life Coaching is useful</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor...</p>
                            </div>
                        </div>
                    </div>

                    <div className='cms_card_articles'>
                        <div className='cms_card_img'>
                            <img className='edit_cms_card_img' src={editsvg} />
                            <img className='delete_cms_card_img' src={deleteSvg} />
                            <img className='cms_img456' src={img} />
                        </div>
                        <div className='cms_articles_para'>
                            <div className='cms_articles_title'>
                                <p>Yoga</p>
                                <small>10 Days ago</small>
                            </div>
                            <div className='cms_articles_para'>
                                <h3>How Life Coaching is useful</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CmsArticles
