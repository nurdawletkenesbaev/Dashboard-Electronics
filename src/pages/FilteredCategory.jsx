import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MainContext } from '../store/context'
import CategoryItem from './pageComponents/CategoryItem'
import ProductItem from './pageComponents/ProductItem'

const FilterCategories = () => {
  const{state} = useContext(MainContext)
  const{slug} = useParams()

  const selectCategory = state.categories.find(categoryItem => `${categoryItem.slug}-${categoryItem.id}` === slug)
  const filteredProducts = state.products.filter(productItem => productItem.categoryId === selectCategory.id)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-[40px] py-[10px] gap-[10px] relatvie mt-[10px]'>
      {
        state.isCategoriesLoading ?
          [1, 2, 3, 4, 5].map(item => (
            <CategoryItem key={item} />
          ))
          :
          filteredProducts.map(item => (
            <ProductItem item={item} key={item.id} />
          ))
      }
    </div>
  )
}

export default FilterCategories
