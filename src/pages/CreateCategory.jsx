import React, { useContext, useRef } from 'react'
import { categoryData, postCategory } from '../store/actions'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from '../store/context';

const CreateCategory = () => {
  const createCategoryForm = useRef()
  const url = 'https://electronics-data-1f9x.onrender.com/categories'
  const createForm = useRef()

  const{ dispatch} = useContext(MainContext)

  function handleSubmit(e) {
    e.preventDefault()

    const inputValue = e.target['create-product-input'].value.trim()
    if (inputValue.length > 0) {
      postCategory(url, {
        title: inputValue
      }).then(d => categoryData(url, dispatch))
      toast.success('Created category successfully', {
        position: "top-right",
        autoClose: 3999,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        createForm.current.reset()
    }
    else{
      e.target['create-product-input'].focus()
      e.target['create-product-input'].style.border = '2px solid red'
      setTimeout(() => {
        e.target['create-product-input'].style.border = ''
      }, 1000);
    }
    
  }
  return (
    <form ref={createForm} onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-[15px] p-[20px]'>
      <label htmlFor="create-product-input">Category name</label>
      <input ref={createCategoryForm} type="text" id='create-product-input' placeholder='Enter the category name' className='border-gray-300 py-[7px] px-[15px] border-[1px] outline-none' />
      <div className='flex justify-end'>
        <button type='submit' className='bg-indigo-500 py-[7px] px-[15px] rounded-sm active:scale-95 text-white'>Submit</button>
      </div>
      <ToastContainer/>
    </form>
  )
}

export default CreateCategory
