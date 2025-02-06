import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import FAQHero from './Components/FAQHero/FAQHero'
import MainFaq from './Components/MainFaq/MainFaq'
import ContactUsFrom from './Components/ContactUsFrom/ContactUsFrom'
function FAQ() {
  return (
    <div className='class_continer'>
      <NavBar />
      <FAQHero />
      <MainFaq />
      <ContactUsFrom />
      <Footer />
    </div>
  )
}

export default FAQ
