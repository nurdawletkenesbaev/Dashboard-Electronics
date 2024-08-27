import React, { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../store/context'
import { categoryData, editProduct, postProduct, productData } from '../../store/actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Select, Textarea } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const ProductForm = ({ updateData, id, setModal }) => {
    const { state, dispatch } = useContext(MainContext)

    const {t} = useTranslation()
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
            <label htmlFor="name">{t('product-name')}</label>
            <Input required defaultValue={updateData?.title} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setData({
                        ...data,
                        title: value
                    })
                }
            }} className='mb-[10px]' type="text" placeholder={t('enter-the-product-name')} id='name' />

            <label htmlFor="price">{t('product-price')}</label>
            <Input required defaultValue={updateData?.price} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setData({
                        ...data,
                        price: value
                    })
                }
            }} className='mb-[10px]' type="text" placeholder={t('enter-the-product-price')} id='price' />

            <label htmlFor="image-url1">{t('product-image-url')}(1)</label>
            <Input required defaultValue={updateData?.images?.[0]} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setImg1(value)
                }
            }} className='mb-[10px]' type="url" placeholder={t('enter-the-product-image-url')} id='image-url1' />

            <label htmlFor="image-url2">{t('product-image-url')}(2)</label>
            <Input required defaultValue={updateData?.images[1]} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setImg2(value)
                }
            }} className='mb-[10px]' type="url" placeholder={t('enter-the-product-image-url')} id='image-url2' />

            <label htmlFor="image-url3">{t('product-image-url')}(3)</label>
            <Input required defaultValue={updateData?.images[2]} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setImg3(value)
                }
            }} className='mb-[10px]' type="url" placeholder={t('enter-the-product-image-url')} id='image-url3' />

            <label htmlFor="rating">{t('product-rating')}</label>
            <Input required defaultValue={updateData?.rating} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setData({
                        ...data,
                        rating: value
                    })
                }
            }} className='mb-[10px]' type="text" placeholder={t('enter-the-product-rating')} id='rating' />

            <label htmlFor="description">{t('product-description')}</label>
            <Textarea required defaultValue={updateData?.description} onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 0) {
                    setData({
                        ...data,
                        description: value
                    })
                }
            }} className='mb-[10px]' name="" id="description" placeholder={t('enter-the-product-description')}></Textarea>

            <label htmlFor="select">{t('select-category')}</label>
            <Select placeholder={t('select-category')} required defaultValue={updateData?.categoryId} onChange={(e) => {
                const value = e.target.value
                if (value.length > 0) {
                    setData({
                        ...data,
                        categoryId: `${value}`
                    })
                }
            }} name="select" id="select">
                {
                    state.categories?.map(item => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))
                }
            </Select>

            <div className='flex justify-end my-[20px]'>
                <Button colorScheme='blue' type='submit'>Send</Button>
            </div>

            <ToastContainer />
        </form>
    )
}

export default ProductForm
