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
import CmsAbout from './View/CMS/CmsAbout/CmsAbout'
import CmsTermsConditions from './View/CMS/CmsTermsConditions/CmsTermsConditions'
import CmsPrivacy from './View/CMS/CmsPrivacy/CmsPrivacy'
import CmsRefundPolicy from './View/CMS/CmsRefundPolicy/CmsRefundPolicy'
import CmsContact from './View/CMS/CmsContact/CmsContact'
import CmsFaq from './View/CMS/CmsFaq/CmsFaq'
import FaqMentee from './View/CMS/CmsFaq/FaqMentee'
import FaqMentor from './View/CMS/CmsFaq/FaqMentor'
import CmsArticles from './View/CMS/CmsArticles/CmsArticles'
import CmsAddArticles from './View/CMS/CmsArticles/CmsAddArticles'
import CmsArticleCategories from './View/CMS/CmsArticles/CmsArticleCategories'
import Programs from './View/Programs/Programs'
import ProgramCategories from './View/Programs/ProgramCategories/ProgramCategories'
import CardsCategories from './View/Programs/CardsCategories/CardsCategories'
import SingleCategories from './View/Programs/CardsCategories/SingleCategories'
import HabitTypes from './View/Programs/HabitTypes/HabitTypes'
import GoalTypes from './View/Programs/GoalTypes/GoalTypes'
import QuotesCategories from './View/Programs/QuotesCategories/QuotesCategories'
import SingleQutoesCategories from './View/Programs/QuotesCategories/SingleQutoesCategories'

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
            <Route path='cms' element={<CmsCategories />} />
            <Route path='cms/site-details' element={<SiteDetails/>}/>
            <Route path='cms/cms-home' element={<CmsHome/>}/>
            <Route path='cms/cms-about' element={<CmsAbout/>}/>
            <Route path='cms/terms-conditions' element={<CmsTermsConditions/>}/>
            <Route path='cms/privacy-policy' element={<CmsPrivacy/>}/>
            <Route path='cms/refund-policy' element={<CmsRefundPolicy/>}/>
            <Route path='cms/contact-queries' element={<CmsContact/>}/>
            <Route path='cms/faq/categories' element={<CmsFaq/>}/>
            <Route path='cms/faq/mentee' element={<FaqMentee/>}/>
            <Route path='cms/faq/mentor' element={<FaqMentor/>}/>
            <Route path='cms/articles' element={<CmsArticles/>}/>
            <Route path='cms/add-articles' element={<CmsAddArticles/>}/>
            <Route path='cms/article-categories' element={<CmsArticleCategories/>}/>
            <Route path='programs' element={<Programs/>}/>
            <Route path='programs/categories' element={<ProgramCategories/>}/>
            <Route path='programs/card/categories' element={<CardsCategories/>}/>
            <Route path='programs/card/categories/:id' element={<SingleCategories/>}/>
            <Route path='programs/habit-types' element={<HabitTypes/>}/>
            <Route path='programs/goal-types' element={<GoalTypes/>}/>
            <Route path='programs/quote-categories' element={<QuotesCategories/>}/>
            <Route path='programs/quote-categories/:id' element={<SingleQutoesCategories/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
