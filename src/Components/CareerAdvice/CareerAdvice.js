import React from 'react'
import NavBar from '../NavBar/NavBar'
import CareerHero from './Components/CareerHero/CareerHero'
import CarrerBlogSection from './Components/CarrerBlogSection/CarrerBlogSection'
import Footer from '../Footer/Footer'
function CareerAdvice() {
    return (
        <div className='class_continer'>
            <NavBar />
            <CareerHero />
            <CarrerBlogSection />
            <Footer />
        </div>
    )
}

export default CareerAdvice
