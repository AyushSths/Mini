import { Filter } from 'lucide-react'
import React from 'react'

const SlideFilterButton = () => {
  return (
    <button
      className="opacity-80 text-base font-normal flex gap-x-2 items-center mx-5 px-3 py-2 bg-gray-100 bg-opacity-50 rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
    >
      <Filter size={16} className="text-base" />
      Filter
    </button>
  )
}

export default SlideFilterButton
