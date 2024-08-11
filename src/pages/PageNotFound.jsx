import { HiHome } from "react-icons/hi"; 
import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className='w-full min-h-[80vh] flex flex-col gap-[20px] justify-center items-center'>
            <h1 className="text-[70px] font-bold">404</h1>
            <p className="textt-[20px]">Ooops something went wrong</p>
            <Link to={'/'}>
                <button className="py-[7px] px-[30px] border-[1px] border-gray-300 rounded-sm shadow-md bg-white flex justify-center gap-[10px] items-center hover:scale-105 active:scale-95 active:shadow-sm duration-100">
                    Back to home
                    <HiHome />
                </button>
            </Link>
        </div>
    )
}

export default PageNotFound
