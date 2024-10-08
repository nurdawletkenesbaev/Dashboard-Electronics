import React, { useContext, useEffect } from 'react'
import ProductItem from './pageComponents/ProductItem'
import { MainContext } from '../store/context'

const Products = () => {
  const { state } = useContext(MainContext)
  
  return (
    <div>
      {
          <div className='grid gap-[7px] sm:gap-[15px] p-[10px] sm:p-[20px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] xl:grid-cols-4'>
            {
              state.isProductsLoading ?
              [1, 2, 3, 4, 5, 6].map(item => (
                <ProductItem key={item} />
              ))
              :
              state.products.map(item => (
                <ProductItem key={item.id} item={item} />
              ))
            }
          </div>
      }
    </div>

  )
}

export default Products
