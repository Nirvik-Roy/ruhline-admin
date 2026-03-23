import React from 'react'
import heroImg from "../../../assets/WhatsApp Image 2025-11-10 at 2.16.44 PM (1) 1.png";
import './MarketingHero.css'
import Button from '../../../Components/Button';
const MarketingHero = () => {
    return (
        <>
            <section className="rlhero22_shell">
                <div className="rlhero22_grid">
                    <div className="rlhero22_left_panel">
                        <h1 className="rlhero22_title">
                            Awaken energy,
                            <br />
                            embrace mindful living
                            <br />
                            SAR67
                        </h1>

                        <p className="rlhero22_text">
                            Step onto your mat and let go of the chaos around you. Our guided
                            yoga and meditation sessions help you reconnect with your inner
                            peace, build flexibility, and restore harmony between your mind,
                            body, and soul.
                        </p>

                        <Button children={'Buy Now'} styles={{
                            backgroundColor:'#fff',
                            color:'var(--primary-color)',
                            margin:'20px 0',
                            width:'150px'
                        }}/>

                        <div className="rlhero22_date_box">
                            <div className="rlhero22_date_item">
                                <h3>03</h3>
                                <span>MM</span>
                            </div>
                            <div className="rlhero22_date_item">
                                <h3>12</h3>
                                <span>DD</span>
                            </div>
                            <div className="rlhero22_date_item">
                                <h3>2021</h3>
                                <span>YYYY</span>
                            </div>
                        </div>
                    </div>

                    <div className="rlhero22_right_panel">
                        <img src={heroImg} alt="Leaves" className="rlhero22_img" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default MarketingHero
