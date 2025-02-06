import React from 'react'
import NavBar from '../NavBar/NavBar'
import ContactHero from './Components/ContactHero/ContactHero'
import ContactFrom from './Components/ContactFrom/ContactFrom'
import QandA from './Components/QandA/QandA'
import Footer from '../Footer/Footer'

function ContactUs() {
    return (
        <div className='class_continer'>
            <NavBar />
            <ContactHero />
            <ContactFrom />
            <QandA />
            <Footer />
        </div>
    )
}

export default ContactUs
