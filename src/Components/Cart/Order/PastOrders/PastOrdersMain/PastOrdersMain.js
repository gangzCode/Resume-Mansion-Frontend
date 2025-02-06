import React from 'react'
import OrderPlacedHero from './Components/OrderPlacedHero/OrderPlacedHero'
import OrderNav from '../../OrderNav/OrderNav'
import OrderStatusCard from './Components/OrderStatusCard/OrderStatusCard'
import Price from './Components/PriceSection/PriceSection'
function PastOrdersMain() {
  return (
    <div className='class_continer'>
      <OrderNav />
      <OrderPlacedHero />
      <OrderStatusCard />
      <Price />
    </div>
  )
}

export default PastOrdersMain
