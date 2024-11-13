import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SortType = {
    name: string;
    type: 'rating' | 'title' | 'price';
}

interface FilterSliceState {
    categoryId: number,
    currentPage: number,
    sortType: number;
    sort: SortType
}


const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 0,
    sortType: 0,
    sort: {
        name: "популярности",
        type: "rating",
    }
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId =  action.payload
        },
        setSortType: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sortType = action.payload.sortType

        }
    }
})


export const {setCategoryId, setSortType, setFilters} = filterSlice.actions;

export  default filterSlice.reducer