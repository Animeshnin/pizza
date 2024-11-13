import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {CartItemSlice} from "./cartSlice";

type FetchPizzaArgs = {
    currentPage: number;
    categoryId: number;
    sortType: string;
    searchInput: string;

}

type Pizza = {
    id: number;
    imageUrl: string;
    title: string;
    sizes: number[];
    types: number[];
    price: number;
    category: number;
    rating: number;
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', async ({currentPage, categoryId, sortType, searchInput} : FetchPizzaArgs, ) => {
        const {data} = await axios.get(`https://67037090bd7c8c1ccd416a91.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ``}&sortBy=${sortType}&${searchInput ? `&search=${searchInput}` : ''}&order=desc`)

        return data as Pizza[]
    },)




interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error'
}


const initialState: PizzaSliceState = {
    items: [],
    status: 'loading',
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        getPizza: (state, action: PayloadAction<Pizza[]>) => {
            state.items = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = "loading"
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
                state.items = action.payload
                state.status = "success"
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = "error"
                state.items = []
            })
    }
})

export const {getPizza, } = pizzasSlice.actions;

export  default pizzasSlice.reducer