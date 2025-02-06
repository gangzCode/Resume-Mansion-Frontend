import React from 'react'
import NavBar from '../NavBar/NavBar'
import HeroSection from './Components/HeroSection/HeroSection'
import ImageSection from './Components/ImageSection/ImageSection'
import Accomplishments from './Components/Accomplishments/Accomplishments'
import MissionVision from './Components/MissionVision/MissionVision'
import Working from './Components/Working/Working'
import ClientComponent from '../Home/Components/ClientComponents/ClientComponents'
import Footer from '../Footer/Footer'
import ContactUs from '../Home/Components/ContactUs/ContactUs'
import Boosting from './Components/Boosting/Boosting'
function About() {
  return (
    <div className='class_continer'>
      <NavBar />
      <HeroSection />
      <ImageSection />
      <Accomplishments />
      <MissionVision />
      <Working />
      <ClientComponent />
      <Boosting />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default About
