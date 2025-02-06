import React from 'react'
import CartNav from '../CartNav/CartNav'
import EmptyContent from './Components/EmptyContent/EmptyContent'
import PriceContent from './Components/PriceContent/PriceContent'
import './emptyCart.css'
function EmptyCart() {
  return (
    <div className='class_continer emptycart_bk'>
      <CartNav />
      <div className='emptycart_bk'>
        <div className='continer_main_box'>
          <div className='container'>
            <EmptyContent />
            <PriceContent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
