import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/request';
// import ls from 'localstorage-slim';

const initialState = {
    products: [],
    product: [],
    isLoading: false
};

export const getProducts = createAsyncThunk('products', async () => {
    try {
        const request = await axiosPrivate.get('/products');
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});
export const getProductById = createAsyncThunk('product', async (id) => {
    try {
        const request = await axiosPrivate.get(`/products/${id}`);
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});

export const updateProduct = createAsyncThunk('update', async (payload) => {
    try {
        console.log(payload);
        const request = await axiosPrivate.put(`/products/${payload.id}`, payload);
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});

export const product = createSlice({
    name: 'Blog',
    initialState,
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            // console.log('from products: ', action.payload);
            state.products = action.payload;
        },
        [getProducts.rejected]: (state) => {
            state.isLoading = false;
        },
        [getProductById.pending]: (state) => {
            state.isLoading = true;
        },
        [getProductById.fulfilled]: (state, action) => {
            // console.log('from blogSlice: ', action.payload);
            state.product = action.payload;
        },
        [getProductById.rejected]: (state) => {
            state.isLoading = false;
        },
        [updateProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            console.log('from blogSlice: ', action.payload);
            // state.product = action.payload;
        },
        [updateProduct.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const productActions = product.actions;

export default product.reducer;
