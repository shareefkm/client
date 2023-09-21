import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name:"admin",
    initialState:{
        admin:null,
        token:null
    },
    reducers:{
        adminLogin:(state,action)=>{
            const {admin, token} = action.payload
            state.admin = admin
            state.token = token
        },
        adminLogout:(state, action) =>{
            state.admin = null
            state.token = null
        }
    }
})

export const { adminLogin, adminLogout } = adminSlice.actions
export default adminSlice.reducer