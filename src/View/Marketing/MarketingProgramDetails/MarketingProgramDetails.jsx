import React from 'react'
import img from "../../../assets/Frame 1984078770.png";
import './MarketingProgramDetails.css'
import Button from '../../../Components/Button';
const MarketingProgramDetails = () => {
    return (
        <>
            <section className="rlprog33_shell">
                <div className="rlprog33_inner universal_container">
                    <div className="rlprog33_grid">
                        <div className="rlprog33_img_wrap">
                            <img src={img} alt="Program" className="rlprog33_img" />
                        </div>

                        <div className="rlprog33_content">
                            <span className="rlprog33_kicker">PROGRAM DETAILS</span>
                            <h2 className="rlprog33_title">30-Day Mindful Yoga Journey</h2>
                            <p className="rlprog33_text">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                            </p>
                           <Button children={'Buy Now'} styles={{
                            fontWeight:'600',
                            padding:'15px 50px'
                           }}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MarketingProgramDetails
