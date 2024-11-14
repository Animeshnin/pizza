export type TCartItemSlice = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

export interface ICartSliceState {
    totalPrice: number;
    items: TCartItemSlice[];
    typePizza: string
}