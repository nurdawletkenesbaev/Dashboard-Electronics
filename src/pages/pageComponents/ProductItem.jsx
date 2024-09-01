import { RiDeleteBin5Line } from "react-icons/ri"; 
import { BiEdit } from "react-icons/bi"; 
import { AiFillDelete } from "react-icons/ai"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { CiEdit } from "react-icons/ci"; 
import { MdOutlineStarPurple500 } from "react-icons/md";
import { BiImage } from "react-icons/bi";
import React, { useContext, useEffect, useState } from 'react'
import { deleteCategory, productData } from '../../store/actions'
import { MainContext } from '../../store/context'
import ProductForm from './ProductForm'
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ProductItem = ({ item }) => {
    const {t} = useTranslation()
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

    const {ref, inView} = useInView({
        threshold: 0.2,
        triggerOnce: true
    })
    const bgColor = useColorModeValue('gray.50', 'gray.700')
    const {colorMode} = useColorMode()

    if (!item) {
        return (
            <div ref={ref} className={`${inView ? 'top-0 opacity-100' : 'top-[30px] opacity-0'} duration-300 relative flex flex-col justify-between gap-[10px] border-[1px] border-gray-300 p-[15px] animate-pulse`}>
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
            <Box backgroundColor={bgColor} ref={ref} className={`${inView ? 'top-0 opacity-100' : 'top-[30px] opacity-0'} duration-300 relative flex min-w-[190px] h-full flex-col justify-between gap-[5px] sm:gap-[10px] border-[1px] p-[8px] sm:p-[15px] rounded-md shadow-md ${colorMode === 'light' ? 'border-gray-400' : 'border-gray-600'}`}>
                <div onClick={() => detailedProduct(item)} className={`h-[200px] border-[1px] p-[5px] sm:p-[10px] rounded-md  cursor-pointer hover:p-[3px] duration-200 ${colorMode === 'light' ? 'border-gray-400' : 'border-gray-600'}`}>
                    <img src={item?.images?.[0]} alt="" className='w-full h-full object-contain' />
                </div>
                <div className='flex flex-1 flex-col justify-between'>
                    <p className='flex  font-semibold text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]'>{item.title.length > 25 ? `${item.title.slice(0, 22)}...` : item.title}</p>

                    <div className='mt-[5px]'>
                        <div className="flex justify-between items-center">
                            <span className='text-green-500 font-bold text-[14px] md:text-[15px] lg:text-[16px] flex items-center'><span className="text-[17px] text-yellow-500">$</span>{item.price}</span>
                            <div className="text-[19px] text-yellow-500 flex items-center justify-center">
                                <span><MdOutlineStarPurple500 /></span>
                                <span className="text-[14px] text-green-500 md:text-[15px] lg:text-[16px] font-semibold">{item.rating}</span>
                            </div>
                        </div>

                        <div className='flex justify-between gap-[10px] mt-[5px]'>
                            <button onClick={() => {
                                setModalType('update')
                                setModal(true)
                            }} className={`p-[5px] text-[20px] flex justify-center text-blue-700 font-bold duration-100 rounded-[3px] border-[1px] active:scale-95 shadow-md hover:shadow-sm flex-1 ${colorMode === 'light' ? 'bg-gray-200 border-gray-400' : 'bg-gray-700 border-gray-600'}`}>
                                <BiEdit />
                            </button>
                            <button onClick={() => {
                                setModalType('delete')
                                setModal(true)
                            }} className={`p-[5px] text-[20px] flex justify-center text-red-500 font-bold duration-100 rounded-[3px] border-[1px] active:scale-95 shadow-md hover:shadow-sm flex-1 ${colorMode === 'light' ? 'bg-gray-200 border-gray-400' : 'bg-gray-700 border-gray-600'}`}>
                                <RiDeleteBin5Line />
                            </button>
                        </div>
                    </div>
                </div>
            </Box>
            <div className={`fixed z-[2] ${modal ? 'flex backdrop-blur-[2px]' : 'hidden'} top-0 bottom-0 right-0 flex justify-center  left-0 bg-inherit  duration-500 ease items-start`}>
                {
                    modalType === 'update' ?
                        <Box backgroundColor={bgColor} className="absolute top-10 bottom-10 overflow-y-auto z-10 sm:w-[400px]  p-[20px] h-auto border-[1px] border-gray-300 shadow-lg rounded-sm">
                            <ProductForm updateData={item} id={item.id} setModal={setModal} />
                        </Box>
                        :
                        <Box backgroundColor={bgColor} className='absolute z-10 top-10 p-[20px] h-auto border-[1px] border-gray-300 shadow-lg rounded-sm'>
                            <p>{t('delete-this-product')}</p>
                            <div className='flex justify-end gap-3 pt-3'>
                                <Button colorScheme="blue" onClick={() => setModal(false)} >{t('cancel')}</Button>
                                <Button colorScheme="red" onClick={() => deleteItem(url, item.id)}>{t('delete')}</Button>
                            </div>
                        </Box>

                }
                <div onClick={() => setModal(false)} className={`absolute top-0 bottom-0 right-0  left-0 bg-black opacity-50 justify-center items-start z-[3]`}></div>
            </div>
        </div>


    )
}

export default ProductItem
