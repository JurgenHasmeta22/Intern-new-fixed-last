import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICategory from "../../../interfaces/ICategory";
import ICurrency from "../../../interfaces/ICurrency";
import IDashboard from "../../../interfaces/IDashboard";
import { TProduct } from "../../../interfaces/TProduct";

const initialState: IDashboard = {
  products: [],

  //@ts-ignore
  productsFiltered: [],

  //@ts-ignore
  productItem: null,

  //@ts-ignore
  categories: [],

  //@ts-ignore
  currencies: [],

  categorySelected: "Default",

  //@ts-ignore
  searchTerm: "",

  //@ts-ignore
  categorySelectedObject: null,
};

const dashboardStore = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    setProducts(state, action: PayloadAction<[]>) {
      state.products = action.payload;
    },

    setProductsFiltered(state, action: PayloadAction<[]>) {
      //@ts-ignore
      state.productsFiltered = action.payload;
    },

    invalidateProducts(state) {
      state.products = [];
    },

    setProductItem(state, action: PayloadAction<TProduct>) {
      //@ts-ignore
      state.productItem = action.payload;
    },

    invalidateProductItem(state) {
      //@ts-ignore
      state.productItem = null;
    },

    setCategories(state, action: PayloadAction<ICategory[] | undefined>) {
      //@ts-ignore
      state.categories = action.payload;
    },

    invalidateCategories(state) {
      //@ts-ignore
      state.categories = [];
    },

    setCurrencies(state, action: PayloadAction<ICurrency[] | undefined>) {
      //@ts-ignore
      state.currencies = action.payload;
    },

    invalidateCurrencies(state) {
      //@ts-ignore
      state.currencies = action.payload;
    },

    setCategorySelected(state, action: PayloadAction<string>) {
      //@ts-ignore
      state.categorySelected = action.payload;
    },

    invalidateCategorySelected(state) {
      //@ts-ignore
      state.currencies = action.payload;
    },

    invalidateProductsFiltered(state) {
      //@ts-ignore
      state.productsFiltered = action.payload;
    },

    setSearchTerm(state, action: PayloadAction<string>) {
      //@ts-ignore
      state.searchTerm = action.payload;
    },

    invalidateSearchTerm(state) {
      //@ts-ignore
      state.searchTerm = "";
    },

    setCategorySelectedObject(state, action: PayloadAction<ICategory>) {
      //@ts-ignore
      state.categorySelectedObject = action.payload;
    },

    invalidateCategorySelectedObject(state) {
      //@ts-ignore
      state.categorySelectedObject = null;
    },
  },
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
  invalidateCategorySelected,
  setProductsFiltered,
  invalidateProductsFiltered,
  setSearchTerm,
  invalidateSearchTerm,
  setCategorySelectedObject,
  invalidateCategorySelectedObject,
} = dashboardStore.actions;
