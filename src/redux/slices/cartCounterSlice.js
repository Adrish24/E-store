import { createSlice } from "@reduxjs/toolkit";


const cartCounterSlice = createSlice({
    name: 'cart-counter',
    initialState:{
        count: 0,
    },
    reducers:{
        setCount: (state, action) => {
            state.count = action.payload
            sessionStorage.setItem('cart-counter', JSON.stringify(action.payload))
        }
    }
})

export default cartCounterSlice.reducer;
export const { setCount } = cartCounterSlice.actions