import {
    createSlice
} from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
        title: 'Hello world'
    },
    reducers: {
        increment: state => {
            state.count++;
        },
        decrement: state => {
            state.count--;
        },
        increase: (state, action) => {
            state.count += action.payload;
        },
        reset: state => {
            state.count = 0;
        },
    },
})

export const {
    increment,
    decrement,
    increase,
    reset
} = counterSlice.actions

export default counterSlice.reducer