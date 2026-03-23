import React from 'react'
import MarketingNavbar from '../MarketingNavbar/MarketingNavbar'
import MarketingHero from '../MarketingHero/MarketingHero'
import MarketingProgramDetails from '../MarketingProgramDetails/MarketingProgramDetails'
import MarketingSessionDetails from '../MarketingSessionDetails/MarketingSessionDetails'
import MarketingLearnSection from '../MarketingLearnSection/MarketingLearnSection'
import MarketingWhatwedo from '../MarketingWhatwedo/MarketingWhatwedo'
import MarketingBenefits from '../MarketingBenefits/MarketingBenefits'
import MarketingFaq from '../MarketingFaq/MarketingFaq'
import MarketingFooter from '../MarketingFooter/MarketingFooter'
import MarketingAwakenEnergy from '../MarketingAwakenEnergy/MarketingAwakenEnergy'

const MarketingHomePage = () => {
    return (
        <>
            <MarketingNavbar />
            <MarketingHero />
            <MarketingProgramDetails />
            <MarketingSessionDetails />
            <MarketingLearnSection />
            <MarketingAwakenEnergy/>
            <MarketingWhatwedo />
            <MarketingBenefits/>
            <MarketingFaq/>
            <MarketingFooter/>
        </>
    )
}

export default MarketingHomePage
