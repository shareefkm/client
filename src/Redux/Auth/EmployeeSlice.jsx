import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name:"employee",
    initialState:{
        employee:null,
        token:null,
        isBlocked:false
    },
    reducers:{
        employeeLogin: (state,action)=>{
            const {employee,token} = action.payload
            state.employee = employee
            state.token = token
        },
        isBlocked: (state,action)=>{
            const {isBlocked} = action.payload
            state.isBlocked = isBlocked
        },
        employeeLogout: (state,action)=>{
            state.employee = null
            state.token = null
        }
    }
})

export const { employeeLogin, employeeLogout } = employeeSlice.actions
export default employeeSlice.reducer