import { RxArrowLeft } from "react-icons/rx";
import { AiOutlineSetting } from "react-icons/ai";
import { TbLanguage } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { MainContext } from "../store/context";
import { menuAction, selectLangAction, toggleSettingModal } from "../store/actions";
import { buttons } from "../config/constants";
import { Box, Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Switch, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('1')
  const [modalType, setModalType] = useState('')

  const { state, dispatch } = useContext(MainContext)
  const btnBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.400', 'gray.600')
  const hoverColor = useColorModeValue('gray.200', 'gray.800')
  const bgColor = useColorModeValue('gray.100', 'gray.900')
  const sidebarBgColor = useColorModeValue('white', 'gray.800')

  const { colorMode, toggleColorMode } = useColorMode()

  const { i18n, t } = useTranslation()

  function stringToI18(str) {
    return str.toLowerCase().split(' ')
      .join('-')
  }

  return (
    <Box backgroundColor={sidebarBgColor} borderColor={borderColor} className={`min-w-[250px] h-[calc(100vh-22px)] border-[1px] rounded-md  ${state.openMenu ? 'absolute left-[10px] z-10 bg-white duration-300' : 'absolute left-[-260px] md:relative md:left-0'} shadow-md`}>
      <Box backgroundColor={bgColor} borderColor={borderColor} className='h-[70px] flex justify-center items-center border-b-[1px]'>
        <h1 className="text-[30px] font-semibold">Dashboard</h1>
      </Box>
      {
        !state.settingModal ?
          <div className="flex flex-col gap-[10px] mt-[10px] px-[8px]">
            <button onClick={() => toggleSettingModal(true, dispatch)} className={`${colorMode === 'light' ? 'border-gray-400 bg-gray-50 hover:bg-gray-200' : 'border-gray-600 bg-gray-700 hover:bg-gray-800'} w-full py-[6px]  font-semibold text-[18px] shadow-md active:scale-95 hover:shadow-sm border-[1px] gap-[5px] px-[15px] duration-100 ease-linear flex items-center rounded-md sm:hidden`}>
              <span className="text-[24px]"><AiOutlineSetting /></span>
              {t('settings')}
            </button>
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
          :
          <div className="flex flex-col gap-[10px] mt-[10px] px-[8px]">
            <Box onClick={() => toggleSettingModal(false, dispatch)} border={'1px'} borderColor={borderColor} className="flex items-center gap-[5px] py-[7px] px-[15px] rounded-md cursor-pointer active:scale-95 duration-200">
              <span className="text-[20px]"><RxArrowLeft /></span>
              <span>{t('back')}</span>
            </Box>
            <Box onClick={() => {
              setModalType('search')
              onOpen()
            }} border={'1px'} borderColor={borderColor} className="flex items-center gap-[5px] py-[7px] px-[15px] rounded-md cursor-pointer">
              <span className="text-[20px]"><CiSearch /></span>
              <span>{t('search')}</span>
            </Box>
            <Box onClick={() => {
              setModalType('language')
              onOpen()
            }} border={'1px'} borderColor={borderColor} className="flex items-center gap-[5px] py-[7px] px-[15px] rounded-md cursor-pointer">
              <span className="text-[20px]"><TbLanguage /></span>
              <span>{t('languages')}</span>
            </Box>
            <Box border={'1px'} borderColor={borderColor} className="flex items-center justify-between gap-[5px] py-[7px] px-[15px] rounded-md">
              <FormLabel htmlFor='color-mode' mb='0' cursor={'pointer'}>
                {
                  colorMode === 'light' ? t('dark-mode')
                    : t('light-mode')
                }
              </FormLabel>
              <Switch id='color-mode' onChange={() => toggleColorMode(colorMode === 'light' ? 'dark' : 'light')} />
            </Box>

          </div>
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {
          modalType === 'language' ?
            <ModalContent>
              <ModalHeader>{t('select-language')}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction='row' display={'flex'} flexDirection={'column'}>
                    <Radio value='1' onChange={() => {
                      selectLangAction('Eng', dispatch)
                      i18n.changeLanguage('eng')
                    }}>English</Radio>
                    <Radio value='2' onChange={() => {
                      selectLangAction('Rus', dispatch)
                      i18n.changeLanguage('rus')
                    }}>Русский</Radio>
                    <Radio value='3' onChange={() => {
                      selectLangAction('Qar', dispatch)
                      i18n.changeLanguage('qar')
                    }}>Qaraqalpaqsha</Radio>
                  </Stack>
                </RadioGroup>
              </ModalBody>

              <ModalFooter>
              </ModalFooter>
            </ModalContent>
            :
            <ModalContent>
              <ModalHeader>{t('search')}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue'>Search</Button>
              </ModalFooter>
            </ModalContent>
        }
      </Modal>
    </Box>
  )
}

export default Sidebar
