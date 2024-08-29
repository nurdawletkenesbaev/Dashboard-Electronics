import { Box, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const Content = ({ children }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const {pathname} = useLocation()

  const wrapper = useRef()
  useEffect(() => {
    wrapper.current.scrollTop = 0
  }, [pathname])
  return (
    <Box ref={wrapper} backgroundColor={bgColor} className='min-h-[calc(100vh-95px)] max-h-[calc(100vh-95px)] overflow-y-auto'>
      <div >
        {children}
      </div>
    </Box>
  )
}

export default Content
