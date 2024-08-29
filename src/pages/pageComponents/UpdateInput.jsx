import React from 'react'
import { useTranslation } from 'react-i18next'

const UpdateInput = ({data, index, item, setData}) => {
    const {t} = useTranslation()
    return (
        <div  className="flex flex-col items-center border-[1px] border-gray-300 p-[10px] rounded-md">
            <div className="w-[180px] my-[10px] h-[150px] rounded-md p-[5px] border-gray-300 border-[1px]">
                <img src={item} alt="" className="w-full h-full rounded-md object-contain" />
            </div>
            <label htmlFor={`imgUrl${index + 1}`} className="font-bold">{`${t('image-url')}-${index + 1}`}</label>
            <input id={`imgUrl${index + 1}`} onChange={(e) => {
                const value = e.target.value
                if (value.length > 0) {
                    setData({
                        ...data,
                        images: [
                            ...data.images.filter((filterItem, filterIndex) => filterIndex < index),
                            value,
                            ...data.images.filter((filterItem, filterIndex) => filterIndex > index)
                        ]
                    })
                }
            }} required defaultValue={item} type="text" className="w-full py-[5px] px-[10px] mb-[5px] rounded-md border-[1px] border-gray-300 outline-blue-500" placeholder="Enter the image url" />
        </div>
    )
}

export default UpdateInput
