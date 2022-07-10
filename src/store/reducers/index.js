// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authSlice from './authSlice';
import blogSlice from './blog';
import toast from './toast';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, authSlice, blogSlice, toast });

export default reducers;
