import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {totalmem} from "node:os";

export type CartItemSlice = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    items: CartItemSlice[];
    typePizza: string
}


const initialState : CartSliceState = {
    totalPrice: 0,
    items: [],
    typePizza: 'тонкое'
};

const cartSlice = createSlice({
    // Этот слайс отвечает за создание корзины
    name: 'cart',
    initialState,
    // reducers в нем хранятся функции которые, изменяют наши state(переменные)
    reducers: {
        addItems: (state, action: PayloadAction<CartItemSlice>) => {
            // Создаем findId в котором осуществляется поиск существующего объекта, если оно существует, то увеличивает его количество на 1. Если нет добавляет его в массив
            const findId = state.items.find((item) => item.id == action.payload.id)


            if(findId){
                findId.count++;
            } else {
                state.items.push({...action.payload, count: 1});
            }

            state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.count), 0);
        },
        removeItems: (state, action: PayloadAction<{id: number, price: number, count: number}>) => {
                state.totalPrice -=action.payload.price * action.payload.count;
                state.items = state.items.filter(obj => obj.id !== action.payload.id)

        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },
        plusItems: (state, action: PayloadAction<number>) => {
            const findId = state.items.find((item) => item.id === action.payload)

            if(findId) {
                findId.count++;
                state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.count), 0);

            }
        },
        minusItems: (state, action: PayloadAction<number>) => {
            const findId = state.items.find((item) => item.id === action.payload)
            if (findId) {
                findId.count--;
                state.totalPrice -= findId.price * findId.count;
                if (findId.count === 0){

                    state.items = state.items.filter(obj => obj.id !== action.payload)
                }
            }
        }
    }
})



const selectCart = (state: RootState ) => state.cart;

export const {addItems, removeItems, clearItems, plusItems, minusItems} = cartSlice.actions;

export  default cartSlice.reducer