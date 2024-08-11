import React, { useReducer } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Categories from './pages/Categories'
import Products from './pages/Products'
import CreateCategory from './pages/CreateCategory'
import CreateProduct from './pages/CreateProduct'
import { initialState, reducer } from './store/reducer'
import { MainContext } from './store/context'
import ProductDetail from './pages/ProductDetail'
import FilterCategories from './pages/FilteredCategory'
import PageNotFound from './pages/PageNotFound'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Categories />} />
        <Route path='/products' element={<Products />} />
        <Route path='/create-category' element={<CreateCategory />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/products/:slug' element={<ProductDetail />} />
        <Route path='/categories/:slug' element={<FilterCategories />} />
        <Route path='/*' element={<PageNotFound />} />
      </Route>
    )
  )
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MainContext.Provider value={{state, dispatch}}>
      <RouterProvider router={router} />
    </MainContext.Provider>
  )
}

export default App
