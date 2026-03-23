import React from 'react'
import './MarketingFooter.css'
import img from "../../../assets/Rectangle 6740.png";
import logo from '../../../assets/Frame 1984078480 (1).png'
import Button from '../../../Components/Button';
const MarketingFooter = () => {
    return (
        <>
            <footer className="rlftrx10_shell">
                <div
                    className="rlftrx10_top_banner"
                    style={{ backgroundImage: `url(${img})` }}
                >
                    <div className="rlftrx10_overlay">
                        <h2 className="rlftrx10_title">
                            Awaken energy, embrace mindful living
                        </h2>
                        <p className="rlftrx10_text">
                            Step onto your mat and let go of the chaos around you. Our guided yoga and meditation sessions help you reconnect with your inner peace, build flexibility, and restore harmony between your mind, body, and soul.
                        </p>
                      <Button styles={{
                        marginInline:'auto',
                        padding:'15px 40px',
                        background:'#fff',
                        color:'var(--primary-color)',
                        fontWeight:'600',
                        marginTop:'40px'
                      }} children={'Visit Ruhline'}/>
                    </div>
                </div>

                <div className="rlftrx10_bottom_bar">
                    <div className="rlftrx10_bottom_inner universal_container">
                        <div className="rlftrx10_logo">

                            <img src={logo}/>
                        </div>
                        <div className="rlftrx10_copy">
                            © 2025 All Rights Reserved | Designed and Developed by Web Prism
                            Dynamics
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default MarketingFooter
