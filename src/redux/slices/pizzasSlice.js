import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', async ({currentPage, categoryId, sortType, searchInput}) => {
        const {data} = await axios.get(`https://67037090bd7c8c1ccd416a91.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ``}&sortBy=${sortType}&${searchInput ? `&search=${searchInput}` : ''}&order=desc`)
        return data
    },)


const initialState = {
    items: [],
    status: 'loading',
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        getPizza: (state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = "loading"
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
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