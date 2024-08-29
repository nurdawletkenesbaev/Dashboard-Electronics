import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import { Outlet, useLocation } from 'react-router-dom'
import { MainContext } from '../store/context'
import { categoryData, editProduct, menuAction, productData, toggleSettingModal } from '../store/actions'
import { Box, useColorModeValue } from '@chakra-ui/react'

const MainLayout = () => {
  const { state, dispatch } = useContext(MainContext)

  const productsUrl = 'https://electronics-data-1f9x.onrender.com/products'
  const categoryUrl = 'https://electronics-data-1f9x.onrender.com/categories'

  useEffect(() => {
    categoryData(categoryUrl, dispatch)
    productData(productsUrl, dispatch)
  }, [])

  const borderColor = useColorModeValue('gray.400', 'gray.600')
  const bgColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box backgroundColor={bgColor} className='flex relative p-[10px] gap-[10px]'>
      <Sidebar />
      <Box borderColor={borderColor} className='w-full border-[1px] rounded-md shadow-md overflow-hidden'>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Box>

      <div onClick={() => {
        menuAction(false, dispatch)
        toggleSettingModal(false, dispatch)
      }} className={`absolute backdrop-blur-[2px] top-0 bottom-0 left-0 right-0 ${state.openMenu ? 'z-[4]' : '-z-10'}`}></div>
    </Box>
  )
}

export default MainLayout
