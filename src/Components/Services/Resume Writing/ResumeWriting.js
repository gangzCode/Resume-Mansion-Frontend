import React from 'react'
import NavBar from '../../NavBar/NavBar'
import HeroSection from './Components/HeroSection/HeroSection'
import ElevateSection from './Components/ElevateSection/ElevateSection'
import Pricing from './Components/Pricing/Pricing'
import InvestSection from './Components/InvestSection/InvestSection'
import CraftSection from './Components/CraftSection/CraftSection'
import QandA from './Components/Q&A/QandA'
import Footer from '../../Footer/Footer'
function ResumeWriting() {
    return (
        <div className='class_continer'>
            <NavBar />
            <HeroSection />
            <ElevateSection />
            <Pricing />
            <InvestSection />
            <CraftSection />
            <QandA />
            <Footer />
        </div>
    )
}

export default ResumeWriting
