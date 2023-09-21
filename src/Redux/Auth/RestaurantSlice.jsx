import { createSlice } from "@reduxjs/toolkit";

export const restaurantSlice = createSlice({
    name:"restaurant",
    initialState:{
        restaurant:null,
        token:null
    },
    reducers:{
        restaurantLogin:(state,action)=>{
            const {restaurant, token} = action.payload
            state.restaurant = restaurant
            state.token = token
        },
        restaurantLogout:(state, action) =>{
            state.restaurant = null
            state.token = null
        }
    }
})

export const { restaurantLogin, restaurantLogout } = restaurantSlice.actions
export default restaurantSlice.reducer