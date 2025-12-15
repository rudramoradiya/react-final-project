import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
    loading: true,
}

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
            state.loading=false;

        },
        logout:(state)=>{
            state.status=false; 
            state.userData=null;
            state.loading=false;
        },
        setAuthLoading:(state, action)=>{
            state.loading = action.payload;
        }
    }
});

export const {login,logout,setAuthLoading} = authSlice.actions;
export default authSlice.reducer;