// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authSlice from './authSlice';
import blogSlice from './blog';
import toast from './toast';
import product from './product';
import users from './users';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, authSlice, blogSlice, toast, product, users });

export default reducers;
