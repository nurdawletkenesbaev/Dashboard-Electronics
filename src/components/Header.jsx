import { RiMenu4Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import React, { useContext, useState } from 'react'
import { useLocation } from "react-router-dom";
import { menuAction } from "../store/actions";
import { MainContext } from "../store/context";
import { buttons } from "../config/constants";

const Header = () => {
  const { pathname } = useLocation()
  const { state, dispatch } = useContext(MainContext)

  const selectIcon = buttons.find(item => item.path === pathname)

  return (
    <div className='h-[70px] w-[100%] md:w-[calc(100vw-283px)] border-b-[1px] border-gray-300 flex justify-between items-center px-[20px] shadow-md '>
      <div className="flex gap-2 items-center text-[20px] font-medium">
        {selectIcon?.icon()}
        {selectIcon?.title}
      </div>
      <div className="relative w-[30%] sm:w-[50%] flex gap-[20px] justify-end">
        <input type="text" placeholder='Search...' className="border-[1px] w-full hidden sm:block  border-gray-300 pl-[25px] py-[7px] rounded-md outline-none" />
        <button className="block sm:hidden text-[24px]">
          <CiSearch />
        </button>
        <button className="absolute top-[8px] hidden sm:block text-gray-400 left-[3px] text-[22px]">
          <CiSearch />
        </button>
        <button className="block text-[25px] text-gray-700 md:hidden" onClick={() => menuAction(!state.openMenu, dispatch)}><RiMenu4Line /></button>
      </div>
    </div>
  )
}

export default Header
