import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'utils/request';
// import ls from 'localstorage-slim';

const initialState = {
    users: [],
    manufacturers: [],
    vendors: [],
    user: [],
    manufacturer: [],
    vendor: [],
    hospitals: [],
    cat: [],
    subCat: [],
    isLoading: false
};

export const getUsers = createAsyncThunk('users', async () => {
    try {
        const request = await axiosPrivate.get('/buyers');
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});

export const getVendors = createAsyncThunk('vendors', async () => {
    try {
        const request = await axiosPrivate.get('/vendors');
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});
export const getManufacturers = createAsyncThunk('manufacturers', async () => {
    try {
        const request = await axiosPrivate.get('/manufacturers');
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});
export const getHospital = createAsyncThunk('hospital', async () => {
    try {
        const request = await axiosPrivate.get('/hospitals');
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});
export const getUserById = createAsyncThunk('user', async (id) => {
    try {
        const request = await axiosPrivate.get(`/users/${id}`);
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});
export const getCat = createAsyncThunk('categories', async () => {
    try {
        const request = await axiosPrivate.get('/categories');
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});
export const getSubCat = createAsyncThunk('subCategories', async (id) => {
    try {
        const request = await axiosPrivate.get(`/subcategories/${id}`);
        return request.data;
    } catch (error) {
        return console.log(error);
    }
});

export const users = createSlice({
    name: 'Users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.isLoading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },
        [getUsers.rejected]: (state) => {
            state.isLoading = false;
        },
        [getVendors.pending]: (state) => {
            state.isLoading = true;
        },
        [getVendors.fulfilled]: (state, action) => {
            state.vendors = action.payload;
            state.isLoading = false;
        },
        [getVendors.rejected]: (state) => {
            state.isLoading = false;
        },
        [getManufacturers.pending]: (state) => {
            state.isLoading = true;
        },
        [getManufacturers.fulfilled]: (state, action) => {
            state.manufacturers = action.payload;
            state.isLoading = false;
        },
        [getManufacturers.rejected]: (state) => {
            state.isLoading = false;
        },
        [getUserById.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserById.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        [getUserById.rejected]: (state) => {
            state.isLoading = false;
        },
        [getCat.pending]: (state) => {
            state.isLoading = true;
        },
        [getCat.fulfilled]: (state, action) => {
            state.cat = action.payload;
            state.isLoading = false;
        },
        [getCat.rejected]: (state) => {
            state.isLoading = false;
        },
        [getSubCat.pending]: (state) => {
            state.isLoading = true;
        },
        [getSubCat.fulfilled]: (state, action) => {
            state.subCat = action.payload;
            state.isLoading = false;
        },
        [getSubCat.rejected]: (state) => {
            state.isLoading = false;
        },

        [getHospital.pending]: (state) => {
            state.isLoading = true;
        },
        [getHospital.fulfilled]: (state, action) => {
            state.hospitals = action.payload;
            state.isLoading = false;
        },
        [getHospital.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const userActions = users.actions;

export default users.reducer;
