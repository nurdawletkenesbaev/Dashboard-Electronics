import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import React, { useContext, useState } from 'react'
import { useLocation } from "react-router-dom";
import { menuAction, selectLangAction } from "../store/actions";
import { MainContext } from "../store/context";
import { buttons } from "../config/constants";
import { Box, Button, IconButton, Input, InputGroup, InputLeftElement, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { pathname } = useLocation()
  const { state, dispatch } = useContext(MainContext)

  const selectIcon = buttons.find(item => item.path === pathname)
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('gray.100', 'gray.900')
  const borderColor = useColorModeValue('gray.400', 'gray.600')
  const btnBgColor = useColorModeValue('white', 'gray.800')

  const [openLang, setOpenLang] = useState(false)

  const { i18n, t } = useTranslation()

  function stringToI18(str) {
    return str.toLowerCase().split(' ')
      .join('-')
  }

  return (
    <Box backgroundColor={bgColor} borderColor={borderColor} className='h-[70px] w-[100%] md:w-[calc(100vw-283px)] border-b-[1px] flex justify-between items-center px-[20px]'>
      {
        selectIcon&&<div className="flex gap-2 items-center text-[20px] font-medium">
        <span>{selectIcon?.icon()}</span>
        <span>{t(`${stringToI18(selectIcon?.title)}`)}</span>
      </div>
      }
      <div className={`${selectIcon ? 'relative w-[30%] sm:w-[50%] flex gap-[20px] justify-end' : 'w-full flex justify-end gap-[20px] items-center'}`}>
        <InputGroup display={{ base: 'none', lg: 'block' }}>
          <InputLeftElement >
            <CiSearch />
          </InputLeftElement>
          <Input borderColor={borderColor} type="text" placeholder={t('search')} className="border-[1px] w-full" />
        </InputGroup>
        <button className="hidden sm:flex text-[24px] items-center">
          <CiSearch />
        </button>
        <Box className="relative hidden sm:block">
          <Button onClick={() => setOpenLang(!openLang)} border={'1px'} width={'60px'} borderColor={borderColor}>{state.selectLang}</Button>
          <Box border={'1px'} borderColor={borderColor} backgroundColor={btnBgColor} className={`absolute bottom-[-120px] right-[-16px] z-10 p-[4px] rounded-md ${!openLang && 'hidden'}`} >
            <Button onClick={() => {
              selectLangAction('Qar', dispatch)
              setOpenLang(false)
              i18n.changeLanguage('qar')
            }} border={'1px'} size={'lg'} borderColor={borderColor} className="m-[3px]" display={state.selectLang === 'Qar' && 'none'}>Qar</Button>
            <Button onClick={() => {
              selectLangAction('Rus', dispatch)
              setOpenLang(false)
              i18n.changeLanguage('rus')
            }} border={'1px'} size={'lg'} borderColor={borderColor} className="m-[3px]" display={state.selectLang === 'Rus' && 'none'}>Rus</Button>
            <Button onClick={() => {
              selectLangAction('Eng', dispatch)
              setOpenLang(false)
              i18n.changeLanguage('eng')
            }} border={'1px'} size={'lg'} borderColor={borderColor} className="m-[3px]" display={state.selectLang === 'Eng' && 'none'}>Eng</Button>
          </Box>
        </Box>
        <button className="block text-[25px] md:hidden" onClick={() => menuAction(!state.openMenu, dispatch)}><RiMenu4Line /></button>
        <button onClick={toggleColorMode} className="text-[20px] hidden sm:block">
          {colorMode === 'light' ? <BsMoonStars /> : <BsSun />}
        </button>
      </div>
    </Box>
  )
}

export default Header
