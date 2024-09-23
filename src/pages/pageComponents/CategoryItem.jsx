import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import React, { useContext, useRef, useState } from 'react'
import { categoryData, deleteCategory, editCategory, deleteProduct, productData } from "../../store/actions";
import { MainContext } from "../../store/context";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Input, useColorModeValue } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

const CategoryItem = ({ item }) => {
  const {t} = useTranslation()
  const {ref, inView} = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  const { state, dispatch } = useContext(MainContext)
  const url = 'https://electronics-data-1f9x.onrender.com/categories'
  const updateForm = useRef()

  const [modal, setModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const bgColor = useColorModeValue('gray.100', 'gray.700')
  const borderColor = useColorModeValue('gray.400', 'gray.600')

  function deleteProducts(id) {
    return state.products.filter(filterItem => filterItem.categoryId === id)
  }

  const navigate = useNavigate()
  function filteredCategory(item){
    navigate(`/categories/${item.slug}-${item.id}`)
  }
  function deleteItem(url, id) {
    deleteCategory(url, id).then(d => categoryData(url, dispatch)).then(d => productData('https://electronics-data-1f9x.onrender.com/products', dispatch))
    // deleteProducts(id).forEach(item => {
    //   deleteProduct('https://electronics-data-1f9x.onrender.com/products', item.id).then(d => productData('https://electronics-data-1f9x.onrender.com/categories', dispatch))
    // })
  }

  function handleSubmit(e, id) {
    e.preventDefault()
    const inputValue = e.target['update-input'].value.trim()
    if (inputValue.length > 0) {
      editCategory(url, id, {
        title: inputValue
      }).then(d => categoryData(url, dispatch))
      setModal(false)
      updateForm.current.reset()
    }
    else {
      e.target['update-input'].focus()
      e.target['update-input'].style.border = '2px solid red'
      setTimeout(() => {
        e.target['update-input'].style.transform = ''
      }, 100);
    }
  }


  if (!item) {
    return (
      <div className="flex justify-between p-[10px] border-[1px] items-center border-gray-300 animate-pulse gap-[10px]">
        <div className="w-[150px] h-[20px] bg-gray-300"></div>
        <div className="flex justify-end gap-[5px]">
          <div className="w-[25px] h-[25px] bg-gray-300"></div>
          <div className="w-[25px] h-[25px] bg-gray-300"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <Box ref={ref} borderColor={borderColor} backgroundColor={bgColor} className={`relative flex justify-between pr-[10px] gap-[20px] border-[1px] items-center shadow-md rounded-[4px] ${inView ? 'top-0 opacity-100' : 'top-[30px] opacity-0'} duration-300`}>
        <p onClick={() => filteredCategory(item)} className="font-medium w-full p-[10px] cursor-pointer">{item?.title}</p>
        <div className="flex justify-end gap-[5px]">
          <button onClick={() => {
            setModal(true)
            setModalType('update')
          }} className="text-blue-500 text-[22px] font-semibold active:scale-95 hover:scale-105"><BiEditAlt /></button>
          <button onClick={() => {
            setModal(true)
            setModalType('delete')
          }} className="text-red-500 text-[22px] font-semibold active:scale-95 hover:scale-105"><RiDeleteBin5Line /></button>
        </div>
      </Box>

      <div className={`fixed z-[2] ${modal ? 'flex backdrop-blur-[2px]' : 'hidden'} top-0 bottom-0 right-0 flex justify-center  left-0 bg-inherit  duration-500 ease items-start`}>
        {
          modalType === 'delete' ?
            <Box backgroundColor={bgColor} className='absolute z-10 top-10 p-[20px] bg-white h-auto border-[1px] border-gray-300 shadow-lg rounded-sm'>
              <p>{t('delete-this-category')}</p>
              <div className='flex justify-end gap-3 pt-3'>
                <Button colorScheme="blue" onClick={() => setModal(false)}>{t('cancel')}</Button>
                <Button colorScheme="red" onClick={() => deleteItem(url, item.id)} >{t('delete')}</Button>
              </div>
            </Box>
            :
            <Box backgroundColor={bgColor} className="absolute top-10 z-10  p-[20px] bg-white h-auto border-[1px] border-gray-300 shadow-lg rounded-sm">
              <form onSubmit={(e) => handleSubmit(e, item.id)} ref={updateForm} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p>Update category</p>
                  <IconButton onClick={() => setModal(false)} className="p-[5px] rounded-sm">
                    <IoMdClose size={20} />
                  </IconButton>
                </div>
                <div>
                  <Input autoFocus name="sd" id="update-input" type="text" defaultValue={item.title} className="outline-none min-w-[300px] py-[7px] px-[10px] border-gray-300 border-[1px]" />
                </div>
                <div className="flex justify-end">
                  <Button colorScheme="blue" type='submit' >Update</Button>
                </div>
              </form>
            </Box>
        }
        <div onClick={() => setModal(false)} className={`absolute top-0 bottom-0 right-0  left-0 bg-black opacity-50 justify-center items-start z-[3]`}></div>
      </div>


    </div>
  )
}

export default CategoryItem

