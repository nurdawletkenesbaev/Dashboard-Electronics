import axios from "axios";

export async function categoryData(url, dispatch) {
    try {
        dispatch({
            type: 'Fetching_category_data'
        })
        const res = await axios.get(url)
        dispatch({
            type: 'Fetched_category_data',
            payload: res.data ? res.data : []
        })
    }
    catch {
        dispatch({
            type: 'Fetched_category_data_error'
        })
    }
}

export async function postCategory(url, data) {
    try {
        const res = await axios.post(url, data)
    }
    catch {

    }
}

export async function deleteCategory(url, id) {
    try {
        const res = await axios.delete(`${url}/${id}`)
    }
    catch { }
}

export async function editCategory(url, id, data) {
    try {
        const res = await axios.put(`${url}/${id}`, data)
    }
    catch { }
}


export async function productData(url, dispatch) {
    try {
        dispatch({
            type: 'Fetching_product_data'
        })
        const res = await axios.get(url)
        dispatch({
            type: 'Fetched_product_data',
            payload: res.data ? res.data : []
        })
    }
    catch {
        dispatch({
            type: 'Fetched_product_data_error'
        })
    }
}


export async function postProduct(url, data) {
    try {
        const res = await axios.post(url, data)
    }
    catch { }
}

export async function deleteProduct(url, id) {
    try {
        const res = await axios.delete(`${url}/${id}`)
        console.log(res)
    }
    catch { }
}

export async function editProduct(url, id, data) {
    try {
        const res = await axios.put(`${url}/${id}`, data)
    }
    catch { }
}

export function menuAction(payload, dispatch) {
    dispatch({
        type: 'Open_menu',
        payload
    })
}


export function selectLangAction(payload, dispatch) {
    dispatch({
        type: 'Select_lang',
        payload
    })
}

export function toggleSettingModal(payload, dispatch) {
    dispatch({
        type: 'Setting_modal',
        payload
    })
}