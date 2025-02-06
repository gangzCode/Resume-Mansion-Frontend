import React from 'react'
import NavBar from '../NavBar/NavBar'
import HeroSection from './Components/HeroSection/HeroSection'
import DataSet from './Components/DataSet/DataSet'
import Footer from '../Footer/Footer'
function CookiePolicy() {
    return (
        <div className='class_continer'>
            <NavBar />
            <HeroSection />
            <DataSet />
            <Footer />
        </div>
    )
}

export default CookiePolicy
