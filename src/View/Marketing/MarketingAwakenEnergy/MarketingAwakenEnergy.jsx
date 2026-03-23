import React from 'react'
import './MarketingAwakenEnergy.css'
import img from '../../../assets/8cdd6a215a999874e08da8972eafa3e12d242875.jpg'
import Button from '../../../Components/Button'
const MarketingAwakenEnergy = () => {
  return (
    <>
          <section className="rlbnr66_shell">
              <div className="rlbnr66_inner universal_container">
                  <div
                      className="rlbnr66_banner"
                      style={{ backgroundImage: `url(${img})` }}
                  >
                      <h2 className="rlbnr66_title">
                          Awaken energy, embrace mindful living
                      </h2>
                      <p className="rlbnr66_text">
                          Step onto your mat and let go of the chaos around you. Our guided
                          yoga and meditation sessions help you reconnect with your inner
                          peace.
                      </p>
                      <Button children={'Buy Now'} styles={{
                          padding:'14px 44px',
                          backgroundColor:'#fff',
                          color:'var(--primary-color)',
                          fontWeight:'600',
                          marginInline:'auto'
                      }}></Button>
                  </div>
              </div>
          </section>
    </>
  )
}

export default MarketingAwakenEnergy
