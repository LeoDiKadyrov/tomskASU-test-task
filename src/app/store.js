import { configureStore } from '@reduxjs/toolkit'
import personReducer from '../features/person/personSlice.js'

export default configureStore({
    reducer: {
        persons: personReducer
    }
  })