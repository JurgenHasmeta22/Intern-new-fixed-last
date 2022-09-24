import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICategory from "../../../interfaces/ICategory";
import ICurrency from "../../../interfaces/ICurrency";
import IDashboard from "../../../interfaces/IDashboard";
import { TProduct } from "../../../interfaces/TProduct";

const initialState: IDashboard = {
  products: [],
  productsFiltered: [],
  productItem: null,
  categories: [],
  currencies: [],
  categorySelected: "Default",
  searchTerm: "",
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
      state.productsFiltered = action.payload;
    },
    invalidateProducts(state) {
      state.products = [];
    },
    setProductItem(state, action: PayloadAction<TProduct>) {
      state.productItem = action.payload;
    },
    invalidateProductItem(state) {
      state.productItem = null;
    },
    setCategories(state, action: PayloadAction<ICategory[] | undefined>) {
      state.categories = action.payload;
    },
    invalidateCategories(state) {
      state.categories = [];
    },
    setCurrencies(state, action: PayloadAction<ICurrency[] | undefined>) {
      state.currencies = action.payload;
    },
    invalidateCurrencies(state, action: PayloadAction<any>) {
      state.currencies = action.payload;
    },
    setCategorySelected(state, action: PayloadAction<string>) {
      state.categorySelected = action.payload;
    },
    invalidateCategorySelected(state, action: PayloadAction<any>) {
      state.currencies = action.payload;
    },
    invalidateProductsFiltered(state, action: PayloadAction<any>) {
      state.productsFiltered = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    invalidateSearchTerm(state) {
      state.searchTerm = "";
    },
    setCategorySelectedObject(state, action: PayloadAction<ICategory>) {
      state.categorySelectedObject = action.payload;
    },
    invalidateCategorySelectedObject(state) {
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
