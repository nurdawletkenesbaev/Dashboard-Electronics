import React, { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../store/context'
import { categoryData, editProduct, postProduct, productData } from '../../store/actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = ({ updateData, id, setModal }) => {
    const { state, dispatch } = useContext(MainContext)

    const [img1, setImg1] = useState('1')
    const [img2, setImg2] = useState('2')
    const [img3, setImg3] = useState('3')

    useEffect(() => {
        if (updateData) {
            setImg1(updateData.images[0])
            setImg2(updateData.images[1])
            setImg3(updateData.images[2])
        }
    }, [])

    const createProductForm = useRef()
    const [data, setData] = useState(
        updateData ? updateData
            :
            {
                title: '',
                price: '',
                description: '',
                categoryId: ''
            }
    )

    const categoryUrl = 'https://electronics-data-1f9x.onrender.com/categories'
    const productUrl = 'https://electronics-data-1f9x.onrender.com/products'

    useEffect(() => {
        categoryData(categoryUrl, dispatch)
    }, [])

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
        if (updateData) {
            editProduct(productUrl, id, {
                ...data,
                images: [img1, img2, img3],
                slug: string_to_slug(data.title)
            }).then(d => productData(productUrl, dispatch))
            createProductForm.current.reset()
            setModal(false)
        }
        else {
            console.log('post')
            postProduct(productUrl, {
                ...data,
                images: [img1, img2, img3],
                slug: string_to_slug(data.title)
            }).then(d => productData(productUrl, dispatch))
            createProductForm.current.reset()
            toast.success('Created product successfully', {
                position: "top-right",
                autoClose: 3999,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    return (
        <form ref={createProductForm} onSubmit={(e) => handleSubmit(e)} action="" className='flex flex-col gap-[5px]'>
            <label htmlFor="name">Name</label>
            <input required defaultValue={updateData?.title} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setData({
                        ...data,
                        title: value
                    })
                }
            }} className='outline-none py-[5px] px-[10px] border-[1px] border-gray-300 rounded-sm mb-[10px]' type="text" placeholder='Enter the name' id='name' />

            <label htmlFor="price">Price</label>
            <input required defaultValue={updateData?.price} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setData({
                        ...data,
                        price: value
                    })
                }
            }} className='outline-none py-[5px] px-[10px] border-[1px] border-gray-300 rounded-sm mb-[10px]' type="text" placeholder='Enter the price' id='price' />

            <label htmlFor="image-url1">Image url(1)</label>
            <input required defaultValue={updateData?.images?.[0]} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setImg1(value)
                }
            }} className='outline-none py-[5px] px-[10px] border-[1px] border-gray-300 rounded-sm mb-[10px]' type="url" placeholder='Enter the image url' id='image-url1' />

            <label htmlFor="image-url2">Image url(2)</label>
            <input required defaultValue={updateData?.images[1]} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setImg2(value)
                }
            }} className='outline-none py-[5px] px-[10px] border-[1px] border-gray-300 rounded-sm mb-[10px]' type="url" placeholder='Enter the image url' id='image-url2' />

            <label htmlFor="image-url3">Image url(3)</label>
            <input required defaultValue={updateData?.images[2]} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setImg3(value)
                }
            }} className='outline-none py-[5px] px-[10px] border-[1px] border-gray-300 rounded-sm mb-[10px]' type="url" placeholder='Enter the image url' id='image-url3' />

            <label htmlFor="rating">Rating</label>
            <input required defaultValue={updateData?.rating} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setData({
                        ...data,
                        rating: value
                    })
                }
            }} className='outline-none py-[5px] px-[10px] border-[1px] border-gray-300 rounded-sm mb-[10px]' type="text" placeholder='Enter the rating' id='rating' />

            <label htmlFor="description">Description</label>
            <textarea required defaultValue={updateData?.description} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setData({
                        ...data,
                        description: value
                    })
                }
            }} className='outline-none py-[5px] px-[10px] border-[1px] border-gray-300 rounded-sm mb-[10px]' name="" id="description" placeholder='Enter the description'></textarea>

            <label htmlFor="select">Select a category</label>
            <select placeholder='Select a category' required defaultValue={updateData?.categoryId} onChange={(e) => {
                const value = e.target.value
                if (value.length > 0) {
                    setData({
                        ...data,
                        categoryId: `${value}`
                    })
                }
            }} name="select" id="select" className='outline-none py-[5px] px-[10px] border-[1px] border-gray-300 rounded-sm'>
                {
                    state.categories?.map(item => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))
                }
            </select>

            <div className='flex justify-end my-[20px]'>
                <button type='submit' className='py-[7px] px-[20px] bg-indigo-500 rounded-sm text-white  active:scale-95'>Send</button>
            </div>

            <ToastContainer />
        </form>
    )
}

export default ProductForm
