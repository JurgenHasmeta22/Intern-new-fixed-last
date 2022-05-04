import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICategory from '../../../interfaces/ICategory';
import ICurrency from '../../../interfaces/ICurrency';
import IDashboard from "../../../interfaces/IDashboard"
import { TProduct } from '../../../interfaces/TProduct';

const initialState: IDashboard = {

  products: [],

  //@ts-ignore
  productItem: null,

  //@ts-ignore
  categories: [],

  //@ts-ignore
  currencies: [],

  categorySelected: ""
  
}

const dashboardStore = createSlice({

  name: 'dashboard',

  initialState,
  
  reducers: {

    setProducts(state, action: PayloadAction<[]>) {
      state.products = action.payload
    },

    invalidateProducts(state) {
      state.products = []
    },

    setProductItem(state, action: PayloadAction<TProduct>) {
      //@ts-ignore
      state.productItem = action.payload
    },

    invalidateProductItem(state) {
      //@ts-ignore
      state.productItem = null
    },

    setCategories(state, action: PayloadAction<ICategory[] | undefined>) {
      //@ts-ignore
      state.categories = action.payload
    },

    invalidateCategories(state) {
      //@ts-ignore
      state.categories = []
    },

    setCurrencies(state, action: PayloadAction<ICurrency[] | undefined>) {
      //@ts-ignore
      state.currencies = action.payload
    },

    invalidateCurrencies(state) {
      //@ts-ignore
      state.currencies = action.payload
    },

    setCategorySelected(state, action: PayloadAction<string>) {
      //@ts-ignore
      state.categorySelected = action.payload
    },

    invalidateCategorySelected(state) {
      //@ts-ignore
      state.currencies = action.payload
    }

  }
  
});

export default dashboardStore;

export const { 
  setProducts, 
  invalidateProducts, 
  setProductItem, 
  invalidateProductItem,
  setCategories,
  invalidateCategories,
  setCurrencies,
  invalidateCurrencies,
  setCategorySelected,
  invalidateCategorySelected
} = dashboardStore.actions;