import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
    typePizza: 'тонкое'
};

const cartSlice = createSlice({
    // Этот слайс отвечает за создание корзины
    name: 'cart',
    initialState,
    // reducers в нем хранятся функции которые изменяют наши state(переменные)
    reducers: {
        addItems: (state, action) => {
            // Создаем findId в котом осуществляется поиск сущетсвуещего объекта, если оно существует, то увеличивает его количество на 1. Если нет добавляет его в массив
            const findId = state.items.find((item) => item.id === action.payload.id)


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



const selectCart = (state) => state.cart;

export const {addItems, removeItems, clearItems, plusItems, minusItems} = cartSlice.actions;

export  default cartSlice.reducer