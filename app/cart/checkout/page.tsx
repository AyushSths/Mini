import React from 'react'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'

const checkout = () => {
  return (
    <div className="h-screen bg-gray-100 px-5 pt-10">
      <div className="max-w-[1024px] mx-auto bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <CheckoutForm />
        {/* <OrderSummary /> */}
      </div>
    </div>
  )
}

export default checkout
