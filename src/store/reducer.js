export const initialState = {
    categories: [],
    products: [],
    isProductsLoading: false,
    isCategoriesLoading: true,
    openMenu: false,
    selectLang: 'Eng'
}

export function reducer(state, action) {
    switch (action.type) {
        case 'Fetching_category_data':
            return {
                ...state,
                isCategoriesLoading: true
            }
        case 'Fetched_category_data':
            return {
                ...state,
                isCategoriesLoading: false,
                categories: action.payload
            }
        case 'Fetched_category_data_error':
            return {
                ...state,
                isCategoriesLoading: false
            }

        case 'Fetching_product_data':
            return {
                ...state,
                isProductsLoading: true
            }
        case 'Fetched_product_data':
            return {
                ...state,
                isProductsLoading: false,
                products: action.payload
            }
        case 'Fetched_product_data_error':
            return {
                ...state,
                isProductsLoading: false
            }
        case 'Open_menu':
            return {
                ...state,
                openMenu: action.payload
            }
            case 'Select_lang':
                return {
                    ...state,
                    selectLang: action.payload
                }
    }
}