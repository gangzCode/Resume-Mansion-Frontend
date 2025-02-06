import React from 'react'
import NavBar from '../../NavBar/NavBar'
import HeroSection from './Components/HeroSection/HeroSection'
import WhySection from './Components/WhySection/WhySection'
import CraftSection from './Components/CraftSection/CraftSection'
import Pricing from './Components/Pricing/Pricing'
import InvestSection from './Components/InvestSection/InvestSection'
import QandA from './Components/Q&A/QandA'
import Footer from '../../Footer/Footer'
import Impression from './Components/Impression/Impression'
function LinkedInOptimization() {
    return (
        <div className='class_continer'>
            <NavBar />
            <HeroSection />
            <WhySection />
            <CraftSection />
            <Pricing />
            <Impression />
            <InvestSection />
            <QandA />
            <Footer />
        </div>
    )
}

export default LinkedInOptimization
