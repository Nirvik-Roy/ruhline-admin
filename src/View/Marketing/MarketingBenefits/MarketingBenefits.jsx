import React from 'react'
import './MarketingBenefits.css'
import img from "../../../assets/woman-digital-disconnecting-home-by-doing-yoga 2.png";
const MarketingBenefits = () => {
    const items = [1, 2, 3, 4, 5, 6];

    return (
        <>
            <section className="rlben88_shell">
                <div className="rlben88_inner universal_container">
                    <div className="rlben88_grid">
                        <div className="rlben88_content">
                            <div className="rlben88_title_row">
                                <h2 className="rlben88_title">Our Benifits</h2>
                                <span className="rlben88_line"></span>
                            </div>

                            <div className="rlben88_list">
                                {items.map((item) => (
                                    <div className="rlben88_item" key={item}>
                                        <span className="rlben88_tick">✔</span>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rlben88_img_wrap">
                            <img src={img} alt="Benefits" className="rlben88_img" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MarketingBenefits
