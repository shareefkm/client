import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:"user",
    initialState:{
        _id: null,
        user:null,
        token:null,
        selectedChat:null,
    },
    reducers:{
        setCredentials:(state,action)=>{
            const {user, token, _id} = action.payload
            state.user = user
            state.token = token
            state._id = _id
        },
        userLogout:(state, action) =>{
            state.user = null
            state.token = null
            state._id = null
        },
        setSelectedChat:(state,action)=>{
            state.selectedChat = action.payload
        }
    }
})

export const {setCredentials, userLogout} = userSlice.actions
export default userSlice.reducer
