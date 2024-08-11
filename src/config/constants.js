import { BsBag } from "react-icons/bs"; 
import { BsBagPlus } from "react-icons/bs"; 
import { BiLayerPlus } from "react-icons/bi"; 
import { BiCategory } from "react-icons/bi";

export const buttons = [
    {
      id: 1,
      title: 'Categories',
      icon: BiCategory,
      path: '/'
    },
    {
      id: 2,
      title: 'Products',
      icon:  BsBag,
      path: '/products'
    },
    {
      id: 3,
      title: 'Create category',
      icon:  BiLayerPlus,
      path: '/create-category'
    },
    {
      id: 4,
      title: 'Create product',
      icon:  BsBagPlus,
      path: '/create-product'
    }
  ]