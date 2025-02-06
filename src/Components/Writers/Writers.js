import React from 'react'
import NavBar from '../NavBar/NavBar'
import HeroWriters from './Components/HeroWriters/HeroWriters'
import WritersProfile from './WritersProfile/WritersProfile'
import Section3 from './Components/Section3/Section3'
import QandA from './Components/QandA/QandA'
import Footer from '../Footer/Footer'
function Writers() {
    return (
        <div className='class_continer'>
            <NavBar />
            <HeroWriters />
            <WritersProfile />
            <Section3 />
            <QandA />
            <Footer />
        </div>
    )
}

export default Writers
