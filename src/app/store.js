import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/storeUser';

export default configureStore({
    reducer:userReducer,
})