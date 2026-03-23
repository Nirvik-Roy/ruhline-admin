import React from 'react'
import img from "../../../assets/Frame 1984078966.png";
import './MarketingLearnSection.css'
import tick from '../../../assets/Vector.svg'
const MarketingLearnSection = () => {
    const items = [1, 2, 3, 4];
    return (
        <>
            <section className="rllearn55_shell">
                <div className="rllearn55_inner universal_container">
                    <div className="rllearn55_grid">
                        <div className="rllearn55_content">
                            <h2 className="rllearn55_title">What You’ll Learn</h2>

                            <div className="rllearn55_list">
                                {items.map((item) => (
                                    <div className="rllearn55_list_item" key={item}>
                                       <img src={tick}/>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rllearn55_img_wrap">
                            <img src={img} alt="Learn" className="rllearn55_img" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MarketingLearnSection
