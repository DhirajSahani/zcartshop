import React from 'react'
import { useAppContext } from '../context/AppContext'

const AllProducts = () => {

    const {products} =useAppContext()
  return (
    <div className='mt-16 flex flex-col'>
        <div>
            <p>All Products</p>
            <div className=''>

            </div>
        </div>

    </div>
  )
}

export default AllProducts