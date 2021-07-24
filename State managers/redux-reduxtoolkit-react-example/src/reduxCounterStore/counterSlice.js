import {
    createSlice
} from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increment: state => state + 1,
        decrement: state => state - 1,
        increase: (state, action) => state + action.payload,
        reset: state =>  0,
    },
})

export const {
    increment,
    decrement,
    increase,
    reset
} = counterSlice.actions

export default counterSlice.reducer