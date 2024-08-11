import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { MainContext } from "../store/context";
import { menuAction } from "../store/actions";
import { buttons } from "../config/constants";

const Sidebar = () => {
  const {state, dispatch} = useContext(MainContext)
  
  return (
    <div className={`min-w-[250px] border-gray-300 h-[calc(100vh-22px)] border-[1px] bg-white rounded-md px-[8px] ${state.openMenu ? 'absolute left-[10px] z-10 bg-white duration-300' : 'absolute left-[-260px] md:relative md:left-0'} shadow-md`}>
      <div className='h-[70px] flex justify-center items-center border-b-[1px] border-gray-300'>
        <h1 className="text-[30px] font-semibold">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-[10px] mt-[10px]">
        {
          buttons.map(item => (
            <Link key={item.id} to={item.path}>
              <button onClick={() => menuAction(false, dispatch)} className="w-full py-[10px]  font-semibold text-[18px] shadow-md active:scale-95 active:shadow-sm border-[1px] border-gray-300 hover:bg-gray-100 flex justify-start items-center gap-[5px] px-[20px] duration-100 ease-linear rounded-[3px]">
                <item.icon size={24} />
                {item.title}
              </button>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar
