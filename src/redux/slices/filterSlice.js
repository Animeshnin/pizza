import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: {
        name: "популярности",
        sort: "rating",
    }
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId =  action.payload
        },
        setSortType: (state, action) => {
            state.sort = action.payload
        },
        setFilters: (state, action) => {
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sortType = action.payload.sortType

        }
    }
})

export const {setCategoryId, setSortType, setFilters} = filterSlice.actions;

export  default filterSlice.reducer