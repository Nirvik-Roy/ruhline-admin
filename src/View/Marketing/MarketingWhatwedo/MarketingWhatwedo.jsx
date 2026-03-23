import React from 'react'
import './MarketingWhatwedo.css'
const MarketingWhatwedo = () => {
    const cards = [1, 2, 3, 4];
    return (
        <>
            <section className="rlwdo77_shell">
                <div className="rlwdo77_inner universal_container">
                    <h2 className="rlwdo77_title">What we do</h2>

                    <div className="rlwdo77_grid">
                        {cards.map((item) => (
                            <div className="rlwdo77_card" key={item}>
                                <div className="rlwdo77_card_header">
                                    <h3>Lorem ipsum</h3>
                                    <span></span>
                                </div>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="rlwdo77_dots">
                        <span className="rlwdo77_dot rlwdo77_dot_active"></span>
                        <span className="rlwdo77_dot"></span>
                        <span className="rlwdo77_dot"></span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MarketingWhatwedo
