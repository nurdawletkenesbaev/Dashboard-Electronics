import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { MainContext } from "../store/context";
import { menuAction } from "../store/actions";
import { buttons } from "../config/constants";
import { Box, Button, border, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { state, dispatch } = useContext(MainContext)
  const btnBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.400', 'gray.600')
  const hoverColor = useColorModeValue('gray.200', 'gray.800')
  const bgColor = useColorModeValue('gray.100', 'gray.900')
  const sidebarBgColor = useColorModeValue('white', 'gray.800')

  const {i18n, t} = useTranslation()

  function stringToI18(str) {
    return str.toLowerCase().split(' ')
              .join('-')
  }

  return (
    <Box backgroundColor={sidebarBgColor} borderColor={borderColor} className={`min-w-[250px] h-[calc(100vh-22px)] border-[1px] rounded-md  ${state.openMenu ? 'absolute left-[10px] z-10 bg-white duration-300' : 'absolute left-[-260px] md:relative md:left-0'} shadow-md`}>
      <Box backgroundColor={bgColor} borderColor={borderColor} className='h-[70px] flex justify-center items-center border-b-[1px]'>
        <h1 className="text-[30px] font-semibold">Dashboard</h1>
      </Box>
      <div className="flex flex-col gap-[10px] mt-[10px] px-[8px]">
        {
          buttons.map(item => (
            <Link key={item.id} to={item.path}>
              <Button display={'flex'} borderColor={borderColor} backgroundColor={btnBg} _hover={{ backgroundColor: hoverColor }} justifyContent={'start'} onClick={() => menuAction(false, dispatch)} className={`w-full py-[10px]  font-semibold text-[18px] shadow-md active:scale-95 hover:shadow-sm border-[1px] gap-[5px] px-[20px] duration-100 ease-linear`}>
                <item.icon size={24} />
                {t(`${stringToI18(item.title)}`)}
              </Button>
            </Link>
          ))
        }
      </div>
    </Box>
  )
}

export default Sidebar
