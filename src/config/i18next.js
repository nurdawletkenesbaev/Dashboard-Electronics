import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next)
    .init({
        fallbackLng : 'eng',
        interpolation: {
            escapeValue: false    
        },
        resources : {
            eng : {
                translation: {
                    "back": "Back",
                    "languages": "Languages",
                    "light-mode": "Light mode",
                    "dark-mode": "Dark mode",
                    "settings": "Settings",
                    "categories": "Categories",
                    "products": "Products",
                    "create-category": "Create category",
                    "create-product": "Create product",
                    "category-name":"Category name",
                    "enter-the-category-name":"Enter the category name",
                    "product-name": "Product name",
                    "enter-the-product-name": "Enter the product name",
                    "product-price": "Price",
                    "enter-the-product-price": "Enter the price",
                    "product-image-url": "Image URL address. (Min 3)",
                    "image-url": "Image URL address",
                    "enter-the-product-image-url": "Enter the image URL",
                    "product-rating": "Rating",
                    "enter-the-product-rating": "Enter the rating",
                    "product-description": "Description",
                    "enter-the-product-description": "Enter the description",
                    "select-category": "Select a category",
                    "search": 'Search',
                    "select-language": "Select a language",
                    "delete-this-category": "Delete this category?",
                    "delete-this-product": "Delete this product?",
                    "delete": "Delete",
                    "cancel": "Cancel"
                }
            },
            rus : {
                translation: {
                    "back": "Назад",
                    "languages": "Языки",
                    "light-mode": "Светлый режим",
                    "dark-mode": "Темный режим",
                    "settings": "Настройки",
                    "categories": "Категории",
                    "products": "Продукты",
                    "create-category": "Создать категорию",
                    "create-product": "Создать продукт",
                    "category-name":"Имя категории",
                    "enter-the-category-name":"Введите имя категории",
                    "product-name": "Имя продукта",
                    "enter-the-product-name": "Введите имя продукта",
                    "product-price": "Цена",
                    "enter-the-product-price": "Введите цену",
                    "product-image-url": "URL-адрес изображения. Мин(3)",
                    "image-url": "URL-адрес изображения",
                    "enter-the-product-image-url": "Введите URL-адрес изображения",
                    "product-rating": "Рейтинг",
                    "enter-the-product-rating": "Введите рейтинг",
                    "product-description": "Описание",
                    "enter-the-product-description": "Введите описание",
                    "select-category": "Выберите категорию",
                    "search": "Поиск",
                    "select-language": "Выберите язык",
                    "delete-this-category": "Удалить эту категорию?",
                    "delete-this-product": "Удалить этот продукт?",
                    "delete": "Удалить",
                    "cancel": "Отмена"
                }
            },
            qar : {
                translation: {
                    "back": "Artqa",
                    "languages": "Tiller",
                    "light-mode": "Jaqtı rejim",
                    "dark-mode": "Qarańǵı rejim",
                    "settings": "Sazlamalar",
                    "categories": "Kategoriyalar",
                    "products": "Ónimler",
                    "create-category": "Kategoriya jaratıw",
                    "create-product": "Ónim jaratıw",
                    "category-name":"Kategoriya atı",
                    "enter-the-category-name":"Kategoriya atın kiritiń",
                    "product-name": "Ónim atı",
                    "enter-the-product-name": "Ónim atın kiritiń",
                    "product-price": "Baha",
                    "enter-the-product-price": "Bahanı kiritiń",
                    "product-image-url": "Súwrettiń URL mánzili. (Min 3)",
                    "image-url": "Súwrettiń URL mánzili",
                    "enter-the-product-image-url": "Súwrettiń URL mánzilin kiritiń",
                    "product-rating": "Reyting",
                    "enter-the-product-rating": "Reytingdi kiritiń",
                    "product-description": "Sıpatlama",
                    "enter-the-product-description": "Sıpatlama kiritiń",
                    "select-category": "Kategoriyanı saylań",
                    "search": "Izlew",
                    "select-language": "Tildi tańlań",
                    "delete-this-category": "Bul kategoriya óshirilsinbe?",
                    "delete-this-product": "Bul ónim óshirilsinbe?",
                    "delete": "Óshiriw",
                    "cancel": "Biykar qılıw"
                }
            }
        },
        lng : "eng",
        
    })

    export default i18n