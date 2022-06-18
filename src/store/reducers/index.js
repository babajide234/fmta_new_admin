// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authSlice from './authSlice';
import blogSlice from './blog';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, authSlice, blogSlice });

export default reducers;
