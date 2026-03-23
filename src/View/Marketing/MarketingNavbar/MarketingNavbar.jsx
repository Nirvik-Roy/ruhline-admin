import React from 'react'
import './MarketingNavbar.css'
import logo from '../../../assets/Frame 1984078480.png'
const MarketingNavbar = () => {
  return (
    <>
          <header className="rlnavx11_navbar_shell">
              <div className="rlnavx11_navbar_inner universal_container">
                  <div className="rlnavx11_logo_wrap">
                      <img src={logo}/>
                  </div>

                  <nav className="rlnavx11_nav_links">
                      <a href="#!" className="rlnavx11_nav_link rlnavx11_nav_link_active">
                          Home
                      </a>
                      <a href="#!" className="rlnavx11_nav_link">
                          About Program
                      </a>
                      <a href="#!" className="rlnavx11_nav_link">
                          Pricing
                      </a>
                  </nav>
              </div>
          </header>
    </>
  )
}

export default MarketingNavbar
