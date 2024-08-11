import React from 'react'

const Content = ({ children }) => {
  return (
    <div className='min-h-[calc(100vh-95px)] max-h-[calc(100vh-95px)] overflow-y-auto'>
      <div >
        {children}
      </div>
    </div>
  )
}

export default Content
