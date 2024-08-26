import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Content = ({ children }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  return (
    <Box backgroundColor={bgColor} className='min-h-[calc(100vh-95px)] max-h-[calc(100vh-95px)] overflow-y-auto'>
      <div >
        {children}
      </div>
    </Box>
  )
}

export default Content
