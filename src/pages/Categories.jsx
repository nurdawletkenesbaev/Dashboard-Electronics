import React, { useContext, useEffect } from 'react'
import { MainContext } from '../store/context'
import CategoryItem from './pageComponents/CategoryItem'

const Categories = () => {
  const { state } = useContext(MainContext)

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 px-[40px] py-[10px] gap-[10px] relatvie mt-[10px]'>
      {
        state.isCategoriesLoading ?
          [1, 2, 3, 4, 5].map(item => (
            <CategoryItem key={item} />
          ))
          :
          state.categories.map(item => (
            <CategoryItem item={item} key={item.id} />
          ))
      }
    </div>
  )
}

export default Categories
