import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import React, { useContext, useState } from 'react'
import { useLocation } from "react-router-dom";
import { menuAction } from "../store/actions";
import { MainContext } from "../store/context";
import { buttons } from "../config/constants";
import { Box, Input, InputGroup, InputLeftElement, useColorMode, useColorModeValue } from "@chakra-ui/react";

const Header = () => {
  const { pathname } = useLocation()
  const { state, dispatch } = useContext(MainContext)

  const selectIcon = buttons.find(item => item.path === pathname)
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('gray.100', 'gray.900')
  const borderColor = useColorModeValue('gray.400', 'gray.600')

  return (
    <Box backgroundColor={bgColor} borderColor={borderColor} className='h-[70px] w-[100%] md:w-[calc(100vw-283px)] border-b-[1px] flex justify-between items-center px-[20px]'>
      <div className="flex gap-2 items-center text-[20px] font-medium">
        {selectIcon?.icon()}
        {selectIcon?.title}
      </div>
      <div className="relative w-[30%] sm:w-[50%] flex gap-[20px] justify-end">
        <InputGroup>
          <InputLeftElement>
            <CiSearch />
          </InputLeftElement>
          <Input borderColor={borderColor} type="text" placeholder='Search...' className="border-[1px] w-full hidden sm:block" />
        </InputGroup>
        <button className="block sm:hidden text-[24px]">
          <CiSearch />
        </button>
        {/* <button className="absolute top-[8px] hidden sm:block text-gray-400 left-[3px] text-[22px]">
          <CiSearch />
        </button> */}
        <button className="block text-[25px] text-gray-700 md:hidden" onClick={() => menuAction(!state.openMenu, dispatch)}><RiMenu4Line /></button>
        <button onClick={toggleColorMode} className="text-[20px]">
          {colorMode === 'light' ? <BsMoonStars /> : <BsSun />}
        </button>
      </div>
    </Box>
  )
}

export default Header
