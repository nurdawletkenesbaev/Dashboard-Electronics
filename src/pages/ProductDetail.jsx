import { AiFillStar } from "react-icons/ai"; 
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MainContext } from '../store/context'
import ReactStarsRating from 'react-awesome-stars-rating';

const ProductDetail = () => {
    const {slug} = useParams()
    
    const {state} = useContext(MainContext)


    const selectProduct = state.products?.find(productItem => `${productItem.slug}-${productItem.id}` === slug)
    const [activeImage, setActiveImage] = useState(selectProduct?.images[0])
    
  return (
    <div className='flex flex-col lg:flex-row justify-between p-[20px] gap-[20px]'>
      <div className='flex-1 flex justify-between gap-[10px] items-center'>
        <div className='w-[33%] flex flex-col gap-[10px]'>
            <div onClick={() => setActiveImage(selectProduct?.images[0])} className='flex justify-center items-center p-[10px] border-[1px] border-gray-300 rounded-md  cursor-pointer h-[120px]'>
                <img src={selectProduct?.images[0]} alt="" className='w-full h-full object-contain'/>
            </div>
            <div onClick={() => setActiveImage(selectProduct?.images[1])} className='flex justify-center items-center p-[10px] border-[1px] border-gray-300 rounded-md cursor-pointer h-[120px]'>
                <img src={selectProduct?.images[1]} alt="" className='w-full h-full object-contain'/>
            </div>
            <div onClick={() => setActiveImage(selectProduct?.images[2])} className='flex justify-center items-center p-[10px] border-[1px] border-gray-300 rounded-md  cursor-pointer h-[120px]'>
                <img src={selectProduct?.images[2]} alt="" className='w-full h-full object-contain'/>
            </div>
        </div>
        <div className='w-[67%] h-[350px] flex justify-center items-center p-[20px] border-[1px] border-gray-300 rounded-md'>
            <img src={activeImage} alt="" className='w-full h-full object-contain'/>
        </div>
      </div>
      <div className='flex-1 flex flex-col gap-[15px] justify-center'>
        <h2 className="font-semibold text-[24px]">{selectProduct?.title}</h2>
        <div className="flex justify-start items-center gap-[4px]">
            <ReactStarsRating stars={5} value={selectProduct?.rating} className='flex' />
            <span className="text-green-500">{selectProduct?.rating}/5</span>
        </div>
        <p className="text-green-500"><span className="text-yellow-500 mr-[4px] font-bold">$</span>{selectProduct?.price}</p>
        <div className="max-h-[150px] overflow-y-auto border-[1px] border-gray-300 p-[20px] rounded-md" >
            {selectProduct?.description}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
