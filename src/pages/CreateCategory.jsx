import React, { useContext, useRef } from 'react'
import { categoryData, postCategory } from '../store/actions'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from '../store/context';
import { Button, Input } from '@chakra-ui/react';

const CreateCategory = () => {
  const createCategoryForm = useRef()
  const url = 'https://electronics-data-1f9x.onrender.com/categories'
  const createForm = useRef()

  const { dispatch } = useContext(MainContext)

  function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return str;
  }

  function handleSubmit(e) {
    e.preventDefault()

    const inputValue = e.target['create-product-input'].value.trim()
    if (inputValue.length > 0) {
      postCategory(url, {
        title: inputValue,
        slug: string_to_slug(inputValue)
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

  }
  return (
    <form ref={createForm} onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-[15px] p-[20px]'>
      <label htmlFor="create-product-input">Category name</label>
      <Input ref={createCategoryForm} type="text" id='create-product-input' placeholder='Enter the category name' className='border-gray-300 py-[7px] px-[15px] border-[1px] outline-none' />
      <div className='flex justify-end'>
        <Button type='submit' colorScheme='blue'>Submit</Button>
      </div>
      <ToastContainer />
    </form>
  )
}

export default CreateCategory
