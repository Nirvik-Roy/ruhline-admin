import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout/MainLayout'
import Login from './View/Login/Login'
import Dashboard from './View/Dashboard/Dashboard'
import Coaches from './View/Coaches/Coaches'
import SingleCoache from './View/Coaches/SingleCoache/SingleCoache'
import CoachesShift from './View/Coaches/CoachesShift/CoachesShift'
import Customers from './View/Customers/Customers'
import SingleCustomer from './View/Customers/SingleCustomer/SingleCustomer'
import Disputes from './View/Support/Disputes'
import Coupons from './View/Coupons/Coupons'
import OurStaff from './View/OurStaff/OurStaff'
import Roles from './View/Roles/Roles'
import Billings from './View/Billings/Billings'
import SingleBilling from './View/Billings/SingleBilling'
import CmsCategories from './View/CMS/CmsCategories/CmsCategories'
import SiteDetails from './View/CMS/SiteDetails/SiteDetails'
import CmsHome from './View/CMS/CmsHome/CmsHome'
import CmsAbout from './View/CMS/CmsHome/CmsAbout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/dashboard'} element={<MainLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='coaches' element={<Coaches />} />
            <Route path='coaches/single-coache/:id' element={<SingleCoache />} />
            <Route path='coaches/working-shift' element={<CoachesShift />} />
            <Route path='customers' element={<Customers />} />
            <Route path='customers/single-customer/:id' element={<SingleCustomer />} />
            <Route path='support/disputes' element={<Disputes />} />
            <Route path='coupons' element={<Coupons />} />
            <Route path='staff' element={<OurStaff />} />
            <Route path='roles' element={<Roles />} />
            <Route path='billings' element={<Billings />} />
            <Route path='billings/single-bill/:id' element={<SingleBilling />} />
            <Route path='cms/categories' element={<CmsCategories />} />
            <Route path='cms/site-details' element={<SiteDetails/>}/>
            <Route path='cms/cms-home' element={<CmsHome/>}/>
            <Route path='cms/cms-about' element={<CmsAbout/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
