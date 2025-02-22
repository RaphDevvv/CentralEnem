import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userslice'

export default configureStore({
    reducer: {
        user : useReducer
    }
})