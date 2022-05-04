import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '../../../interfaces/TProduct';

export interface IBankAccount {
    id?: number
    code: string
    name: string
    currencyId: number
    balance: number
    clientId: number
    isActive: boolean
    dateCreated: string
    dateModified: null
}

export interface ICartStore {
    products: ICartProduct[]
    totalValue: number
    selectedBankAccount: IBankAccount | null
    selectedBankAccountName: IBankAccountName | null
    selectedBankAccountNameOnly: string
    bankAccounts: IBankAccount[]
}

export interface ICartProduct {
    product: TProduct
    quantity: number
}

export interface IQuantityPayload {
    productId: number
    quantity: number
}

export interface IBankAccountName {
    name: string
}

const calculateTotalPrice = (storeState: ICartStore) => {
    let totPrice = 0;
    storeState.products.forEach((x) => totPrice += x.product.price * x.quantity);
    return totPrice;
}

const initValue : ICartStore = { 
    products: [], 
    totalValue: 0, 
    selectedBankAccount: null, 
    selectedBankAccountName: null, 
    selectedBankAccountNameOnly: "",
    bankAccounts: [] 
}

const cartStore = createSlice({

  name: 'cart',

  initialState: initValue,

  reducers: {

    addProduct(state, action:PayloadAction<ICartProduct>) {

        const index = state.products.findIndex(prod => prod.product.id === action.payload.product.id)

        if(index === -1) {
            state.products.push(action.payload);
        }
        
        else {
            state.products[index].quantity += action.payload.quantity
        }

        state.totalValue = calculateTotalPrice(state);

    },

    deleteProductById(state,action:PayloadAction<number>) {
        state.products = state.products.filter(x => x.product.id !== action.payload);
        state.totalValue = calculateTotalPrice(state);
    },

    changeProductQuantity(state, action:PayloadAction<IQuantityPayload>) {
        let productFound = state.products.find(x => x.product.id === action.payload.productId);
        productFound.quantity = action.payload.quantity;
        state.totalValue = calculateTotalPrice(state);
    },

    invalidateCart() {
        return initValue;
    },

    setSelectedBankAccount(state, action:PayloadAction<IBankAccount>) {
        state.selectedBankAccount = action.payload
    },

    setSelectedBankAccountName(state, action:PayloadAction<IBankAccountName>) {
        state.selectedBankAccountName = action.payload
    },

    setSelectedBankAccountNameOnly(state, action:PayloadAction<string>) {
        state.selectedBankAccountNameOnly = action.payload
    },

    setBankAccounts(state, action:PayloadAction<IBankAccount[]>) {
        state.bankAccounts = action.payload
    }

  }

});

export default cartStore;

export const { 
    addProduct, 
    deleteProductById, 
    changeProductQuantity, 
    invalidateCart, 
    setSelectedBankAccount, 
    setSelectedBankAccountName,
    setBankAccounts,
    setSelectedBankAccountNameOnly
} = cartStore.actions;