import { MdOutlineStarPurple500 } from "react-icons/md";
import { BiImage } from "react-icons/bi";
import React, { useContext, useEffect, useState } from 'react'
import { deleteCategory, productData } from '../../store/actions'
import { MainContext } from '../../store/context'
import ProductForm from './ProductForm'
import { useNavigate } from "react-router-dom";

const ProductItem = ({ item }) => {
    const { dispatch } = useContext(MainContext)
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState('delete')

    const navigate = useNavigate()
    function detailedProduct(item) {
        navigate(`/products/${item.slug}-${item.id}`)
    }

    const url = 'https://electronics-data-1f9x.onrender.com/products'

    function deleteItem(url, id) {
        deleteCategory(url, id).then(d => productData(url, dispatch))
        setModal(false)
    }

    if (!item) {
        return (
            <div className='flex flex-col justify-between gap-[10px] border-[1px] border-gray-300 p-[15px] animate-pulse'>
                <div className='flex border-[1px] h-[200px] justify-center items-center text-[40px] text-gray-600 border-gray-300 p-[10px]'>
                    <BiImage />
                </div>
                <div className='flex flex-col justify-between'>
                    <div className="w-[150px] h-[20px] border-gray-300"></div>
                    <div className='mt-[5px]'>
                        <span className='text-orange-500 font-bold text-[16px]'>$price</span>
                        <div className='flex justify-between gap-[10px] mt-[5px]'>
                            <button className='py-[5px] rounded-sm  text-white flex-1 bg-gray-500'>Update</button>
                            <button className='py-[5px] rounded-sm  text-white flex-1 bg-gray-500'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="">
            <div className='flex w-[240px] h-full flex-col justify-between gap-[5px] sm:gap-[10px] border-[1px] border-gray-300 p-[8px] sm:p-[15px] rounded-md shadow-lg'>
                <div onClick={() => detailedProduct(item)} className='h-[200px] border-[1px] border-gray-300 p-[5px] sm:p-[10px] rounded-md  cursor-pointer hover:p-0 duration-200'>
                    <img src={item?.images[0]} alt="" className='w-full h-full object-contain' />
                </div>
                <div className='flex flex-1 flex-col justify-between'>
                    <p className='flex  font-semibold text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]'>{item.title.length > 25 ? `${item.title.slice(0, 22)}...` : item.title}</p>

                    <div className='mt-[5px]'>
                        <div className="flex justify-between items-center">
                            <span className='text-green-500 font-bold text-[14px] md:text-[15px] lg:text-[16px] flex items-center'><span className="text-[17px] text-orange-500">$</span>{item.price}</span>
                            <div className="text-[19px] text-orange-500 flex items-center justify-center">
                                <span><MdOutlineStarPurple500 /></span>
                                <span className="text-[14px] text-green-500 md:text-[15px] lg:text-[16px] font-semibold">{item.rating}</span>
                            </div>
                        </div>

                        <div className='flex justify-between gap-[10px] mt-[5px]'>
                            <button onClick={() => {
                                setModalType('update')
                                setModal(true)
                            }} className='py-[5px] duration-100 rounded-[3px] border-[1px] hover:scale-105 active:scale-95 text-gray-800 shadow-md active:shadow-sm font-semibold flex-1 text-[14px] md:text-[15px] lg:text-[16px]'>Update</button>
                            <button onClick={() => {
                                setModalType('delete')
                                setModal(true)
                            }} className='py-[5px] duration-100 rounded-[3px] border-[1px] hover:scale-105 active:scale-95 text-gray-800 shadow-md active:shadow-sm font-semibold flex-1 text-[14px] md:text-[15px] lg:text-[16px]'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`fixed z-[2] ${modal ? 'flex backdrop-blur-[2px]' : 'hidden'} top-0 bottom-0 right-0 flex justify-center  left-0 bg-inherit  duration-500 ease items-start`}>
                {
                    modalType === 'update' ?
                        <div className="absolute top-10 bottom-10 overflow-y-auto z-10 w-[400px]  p-[20px] bg-white h-auto border-[1px] border-gray-300 shadow-lg rounded-sm">
                            <ProductForm updateData={item} id={item.id} setModal={setModal} />
                        </div>
                        :
                        <div className='absolute z-10 top-10 p-[20px] bg-white h-auto border-[1px] border-gray-300 shadow-lg rounded-sm'>
                            <p>Are you sure this category deleted?</p>
                            <div className='flex justify-end gap-3 pt-3'>
                                <button onClick={() => setModal(false)} className='py-[7px] px-[20px] bg-indigo-500 text-white rounded-sm border-gray-300 border-[1px]'>Cancel</button>
                                <button onClick={() => deleteItem(url, item.id)} className='py-[7px] px-[20px] rounded-sm bg-red-500 text-white'>Delete</button>
                            </div>
                        </div>

                }
                <div onClick={() => setModal(false)} className={`absolute top-0 bottom-0 right-0  left-0 bg-transparent justify-center items-start z-[3]`}></div>
            </div>
        </div>


    )
}

export default ProductItem
