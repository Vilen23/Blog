import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signinStart:(state)=>{
            state.loading = true;
            state.error=null;
        },
        signinSuccess:(state,action)=>{
            state.currentuser=action.payload;
            state.error=null;
            state.loading =false;
        },
        signinFailure:(state,action)=>{
            state.loading = false;
            state.error=action.payload
        }
    }
});

export const {signinFailure,signinStart,signinSuccess} = userSlice.actions;
export default userSlice.reducer;