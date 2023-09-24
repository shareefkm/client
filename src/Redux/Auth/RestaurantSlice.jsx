import { createSlice } from "@reduxjs/toolkit";

export const restaurantSlice = createSlice({
    name:"restaurant",
    initialState:{
        _id:null,
        restaurant:null,
        token:null
    },
    reducers:{
        restaurantLogin:(state,action)=>{
            const {restaurant, token, _id} = action.payload
            state.restaurant = restaurant
            state.token = token
            state._id = _id
        },
        restaurantLogout:(state, action) =>{
            state.restaurant = null
            state.token = null
            state._id = null
        }
    }
})

export const { restaurantLogin, restaurantLogout } = restaurantSlice.actions
export default restaurantSlice.reducer