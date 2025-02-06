import React from 'react'
import './home.css'
import NavBar from '../NavBar/NavBar'
import Hero from './Components/Hero/Hero'
import ClientComponents from './Components/ClientComponents/ClientComponents'
import CareerBoosting from './Components/CareerBoostingComponents/CareerBoosting'
import Services from './Components/Services/Services'
import Reviews from './Components/ClientReviews/Reviews'
import ContactUs from './Components/ContactUs/ContactUs'
import QandA from './Components/Q&A/QandA'
import Footer from '../Footer/Footer'
function Home() {
  return (
    <div >
      <div className='class_continer'>
        <NavBar />
        <Hero />
        <ClientComponents />
        <CareerBoosting />
        <Services />
         <Reviews/>
        <ContactUs/>
        <QandA/>
        <Footer/> 
      </div>
    </div>
  )
}

export default Home
