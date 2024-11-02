import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems: (state, action) => {

            const findId = state.items.find((item) => item.id === action.payload?.id)

            if(findId){
                findId.count++;
            } else {
                state.items.push({...action.payload, count: 1});
            }

            state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.count), 0);
        },
        removeItems: (state, action) => {
                state.totalPrice -=action.payload.price * action.payload.count;
                state.items = state.items.filter(obj => obj.id !== action.payload.id)

        },
        clearItems: (state, action) => {
            state.items = []
            state.totalPrice = 0
        },
        plusItems: (state, action) => {
            const findId = state.items.find((item) => item.id === action.payload)

            if(findId) {
                findId.count++;
            }
        },
        minusItems: (state, action) => {
            const findId = state.items.find((item) => item.id === action.payload)

            if (findId) {
                findId.count--;
                if (findId.count === 0){
                    state.items = state.items.filter(obj => obj.id !== action.payload)
                }
            }
        }
    }
})

export const {addItems, removeItems, clearItems, plusItems, minusItems} = cartSlice.actions;

export  default cartSlice.reducer