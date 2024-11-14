export type SortType = {
    name: string;
    type: 'rating' | 'title' | 'price';
}

export interface FilterSliceState {
    categoryId: number,
    currentPage: number,
    sortType: number;
    sort: SortType
}
