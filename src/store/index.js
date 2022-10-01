import { configureStore } from '@reduxjs/toolkit';
import  user  from '../slices/userSlice.js'; 
import { dragonsApi } from '../api/dragonsApi.js';

const store = configureStore({
    reducer: {user,[dragonsApi.reducerPath]: dragonsApi.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(dragonsApi.middleware),
})
export default store;