import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name:"employee",
    initialState:{
        _id:null,
        employee:null,
        token:null,
        isBlocked:false
    },
    reducers:{
        employeeLogin: (state,action)=>{
            const {employee,token,_id} = action.payload
            state.employee = employee
            state.token = token
            state._id = _id
        },
        isBlocked: (state,action)=>{
            const {isBlocked} = action.payload
            state.isBlocked = isBlocked
        },
        employeeLogout: (state,action)=>{
            state.employee = null
            state.token = null
            state._id = null
        }
    }
})

export const { employeeLogin, employeeLogout } = employeeSlice.actions
export default employeeSlice.reducer