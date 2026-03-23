import React, { useState } from "react";
import img from "../../../assets/Rectangle 6747.png";
import './MarketingFaq.css'
const MarketingFaq = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqData = [
        {
            question: "What is Webflow and why is it the best website builder?",
            answer:
                "Webflow is a powerful visual development platform that allows designers to build fully responsive websites without writing a single line of code.",
        },
        {
            question: "What is your favorite template from BRIX Templates?",
            answer: "We focus on clean layouts, strong typography, and conversion-oriented design systems.",
        },
        {
            question: "How do you clone a Webflow Template from the Showcase?",
            answer: "You can clone available templates directly from the showcase into your Webflow dashboard.",
        },
        {
            question: "Why is BRIX Templates the best Webflow agency out there?",
            answer: "Because of consistent quality, scalable systems, and premium design execution.",
        },
    ];
    return (
        <>
            <section className="rlfaq99_shell">
                <div className="rlfaq99_inner universal_container">
                    <div className="rlfaq99_grid">
                        <div className="rlfaq99_img_wrap">
                            <img src={img} alt="FAQ" className="rlfaq99_img" />
                        </div>

                        <div className="rlfaq99_content">
                            <span className="rlfaq99_kicker">FAQ</span>
                            <h2 className="rlfaq99_title">Expert-led mindful practice</h2>

                            <div className="rlfaq99_list">
                                {faqData.map((item, index) => (
                                    <div
                                        className={`rlfaq99_item ${activeIndex === index ? "rlfaq99_item_active" : ""
                                            }`}
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <div className="rlfaq99_item_head">
                                            <h3>{item.question}</h3>
                                            <button style={activeIndex === index ? {
                                                background: 'var(--primary-color)'
                                            } : {}} className="rlfaq99_toggle_btn">
                                                {activeIndex === index ? <i style={{
                                                    color:'#fff'
                                                }} class="fa-solid fa-angle-down"></i> : <i style={{
                                                    color:'var(--primary-color)'
                                                }} class="fa-solid fa-angle-right"></i>}
                                            </button>
                                        </div>

                                        {activeIndex === index && (
                                            <p className="rlfaq99_answer">{item.answer}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MarketingFaq
