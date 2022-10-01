
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../hooks/http.hook'

const apiURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PRO_API_URL



const initialState = {
    user:{
        email:"",
        username:"",
        favoriteDragons:[]
    },
    userLoadingStatus:"idle",
    isAuth:localStorage.getItem('token')
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData) => {
        const {request} = useHttp();
        return await request(`${apiURL}/login`,"POST",JSON.stringify(loginData));
    }
);
export const registrationUser = createAsyncThunk(
    'user/registrationUserUser',
    async (newUser) => {
        const {request} = useHttp();
        return await request(`${apiURL}/registration`,"POST",JSON.stringify(newUser));
    }
);

export const fetchUser = createAsyncThunk(
    'orders/fetchUser',
    async () => {
        const {request} = useHttp();
        return await request(`${apiURL}/user`,"GET",null,{"Authorization":`Bearer ${localStorage.getItem('token')}`});
    }
);

export const logOut = createAsyncThunk(
    'orders/logOut',
    async () => {
        const {request} = useHttp();
        return await request(`${apiURL}/logOut`,"POST",null,{"Authorization":`Bearer ${localStorage.getItem('token')}`});
    }
);

export const sendActivationCode = createAsyncThunk(
    'orders/sendActivationCode',
    async (activationCode) => {
        const {request} = useHttp();
        return await request(`${apiURL}/login2FA`,"POST",JSON.stringify(activationCode));
    }
);

export const editUser = createAsyncThunk(
    'orders/editUser',
    async (newData) => {
        const {request} = useHttp();
        return await request(`${apiURL}/editUser`,"POST",JSON.stringify(newData),{"Authorization":`Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json'});
    }
);

export const addFavoriteDragon = createAsyncThunk(
    'orders/addFavoriteDragon',
    async (favoriteDragon) => {
        const {request} = useHttp();
        return await request(`${apiURL}/addDragon`,"POST",JSON.stringify(favoriteDragon),{"Authorization":`Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json'});
    }
);
export const deleteFavoriteDragon = createAsyncThunk(
    'orders/deleteFavoriteDragon',
    async (dragon) => {
        const {request} = useHttp();
        return await request(`${apiURL}/deleteDragon`,"POST",JSON.stringify(dragon),{"Authorization":`Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json'});
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
            
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, state => {state.userLoadingStatus = 'loading'})

            .addCase(loginUser.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                localStorage.setItem('token',action.payload.token)
                state.isAuth = action.payload.activated;
            })

            .addCase(loginUser.rejected, state => {
                state.userLoadingStatus = 'error';
            })
            .addCase(registrationUser.pending, state => {state.userLoagingStatus = 'loading'})

            .addCase(registrationUser.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
            })

            .addCase(registrationUser.rejected,(state) => {
                state.userLoadingStatus = 'error';
            })
            .addCase(fetchUser.pending, state => {state.userLoadingStatus = 'loading'})

            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                const {username,email,favoriteDragons,isActivated} = action.payload;
                state.user = {username,email,favoriteDragons}
                state.isAuth = isActivated
            })

            .addCase(fetchUser.rejected, state => {
                state.userLoadingStatus = 'error';
            })
            .addCase(logOut.pending, state => {state.userLoadingStatus = 'loading'})

            .addCase(logOut.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                state.isAuth = false;
                state.user.username = ''
                state.user.email = ''
                state.user.favoriteDragons = []
                localStorage.removeItem('token')
            })

            .addCase(logOut.rejected, state => {
                state.userLoadingStatus = 'error';
            })
            .addCase(sendActivationCode.pending, state => {state.userLoadingStatus = 'loading'})
                

            .addCase(sendActivationCode.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                localStorage.setItem('token',action.payload.token)
                state.isAuth = action.payload.activated;

            })

            .addCase(sendActivationCode.rejected, state => {
                state.userLoadingStatus = 'error';
            })

            .addCase(editUser.pending, state => {state.userLoadingStatus = 'loading'})
                

            .addCase(editUser.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                state.user = action.payload;
            })

            .addCase(editUser.rejected, (state,action) => {
                state.userLoadingStatus = 'error';
            })

            .addCase(addFavoriteDragon.pending, state => {state.ordersLoagingStatus = 'loading'})

            .addCase(addFavoriteDragon.fulfilled, (state, action) => {
                state.ordersLoagingStatus = 'idle';
                state.user.favoriteDragons = action.payload;
            })

            .addCase(addFavoriteDragon.rejected, state => {
                state.ordersLoagingStatus = 'error';
            })

            .addCase(deleteFavoriteDragon.pending, state => {state.ordersLoagingStatus = 'loading'})

            .addCase(deleteFavoriteDragon.fulfilled, (state, action) => {
                state.ordersLoagingStatus = 'idle';
                state.user.favoriteDragons = action.payload;
            })

            .addCase(deleteFavoriteDragon.rejected, state => {
                state.ordersLoagingStatus = 'error';
            })

            .addDefaultCase(() => {})
    }
});

const {actions,reducer} = userSlice;

export default reducer;
export const {

 } = actions;
