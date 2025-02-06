import React, { useState } from 'react'
import OrderNav from '../OrderNav/OrderNav'
import OrderPlacedHero from './Components/OrderPlacedHero/OrderPlacedHero'
import OrderPlacedChat from './Components/OrderPlacedChat/OrderPlacedChat'
import OrderDetails from './Components/OrderDetails/OrderDetails'
import './OrderPlaced.css'

function OrderPlaced() {
  const [activeSection, setActiveSection] = useState('chat'); // To toggle sections in mobile view

  return (
    <div className='class_continer'>
      <OrderNav />
      <OrderPlacedHero />
      <div className='continer_main_box_chat'>
        <div className='container_chat'>
          <div className='main_chat_sub'>
            <div className="btn_continer">
              <button
                onClick={() => setActiveSection('chat')}
                className={`chat_btn_nav ${activeSection === 'chat' ? 'btn_active' : ''}`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveSection('details')}
                className={`chat_btn_nav ${activeSection === 'details' ? 'btn_active' : ''}`}
              >
                Order details
              </button>
            </div>
            <div className="data_continer main_chat_sub">
              <div className={`main_chat_sub_lft chat_section ${activeSection === 'chat' ? 'visible' : 'hidden'}`}>  <OrderPlacedChat /></div>
              <div className={`main_chat_sub_right  details_section ${activeSection === 'details' ? 'visible' : 'hidden'}`}>  <OrderDetails /></div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default OrderPlaced
