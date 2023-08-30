import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        token:null
    },
    reducers:{
        setCredentials:(state,action)=>{
            const {user, token} = action.payload
            state.user = user
            state.token = token
        },
        userLogout:(state, action) =>{
            state.user = null
            state.token = null
        }
    }
})

export const {setCredentials, userLogout} = userSlice.actions
export default userSlice.reducer
// export const SelectCurrentUser = (state) => state.auth.user
// export const SelectCurrentToken = (state) => state.auth.token