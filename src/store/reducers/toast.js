// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    ToastStatus: false
};

// ==============================|| SLICE - MENU ||============================== //

const toast = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        openToast(state, action) {
            state.ToastStatus = action.payload.status;
        }
    }
});

export default toast.reducer;

export const { openToast } = toast.actions;
