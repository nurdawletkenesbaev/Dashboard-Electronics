import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MainContext } from '../store/context'
import ProductItem from './pageComponents/ProductItem'

const FilterCategories = () => {
  const{state} = useContext(MainContext)
  const{slug} = useParams()

  const selectCategory = state.categories.find(categoryItem => `${categoryItem.slug}-${categoryItem.id}` === slug)
  const filteredProducts = state.products.filter(productItem => productItem.categoryId === selectCategory.id)
  return (
    <div className='flex flex-col gap-20px'>
      <h1 className='py-[15px] text-center text-[30px] font-semibold border-b-[1px] border-gray-300'>
        {selectCategory.title}
      </h1>
      {
          <div className='grid gap-[7px] sm:gap-[15px] p-[10px] sm:p-[20px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))]'>
            {
              
              filteredProducts.map(item => (
                <ProductItem key={item.id} item={item} />
              ))
            }
          </div>
      }
    </div>
  )
}

export default FilterCategories
