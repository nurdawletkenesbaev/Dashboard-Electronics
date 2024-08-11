import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import { Outlet } from 'react-router-dom'
import { MainContext } from '../store/context'
import { categoryData, menuAction, productData } from '../store/actions'

const MainLayout = () => {
  const { state, dispatch } = useContext(MainContext)

  const productsUrl = 'https://electronics-data-1f9x.onrender.com/products'
  const categoryUrl = 'https://electronics-data-1f9x.onrender.com/categories'

  useEffect(() => {
    categoryData(categoryUrl, dispatch)
    productData(productsUrl, dispatch)
  }, [])


  return (
    <div className='flex relative p-[10px] gap-[10px]'>
      <Sidebar />
      <div className='w-full border-[1px] border-gray-300 rounded-md shadow-md overflow-hidden'>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </div>

      <div onClick={() => menuAction(false, dispatch)} className={`absolute backdrop-blur-[2px] top-0 bottom-0 left-0 right-0 ${state.openMenu ? 'z-[4]' : '-z-10'}`}></div>
    </div>
  )
}

export default MainLayout
