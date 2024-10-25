import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlox from "../components/PizzaBlock/PizzaBlox";
import {useEffect, useState} from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import {setCategoryId} from "../redux/slices/filterSlice";
import {useDispatch, useSelector} from "react-redux";

export const Home = () => {
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort);
    const dispatch = useDispatch();

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    console.log(categoryId)

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://67037090bd7c8c1ccd416a91.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0 ? `category=${categoryId}` : ``}&sortBy=${sortType.sort}&${searchInput ? `&search=${searchInput}` : ''}&order=desc`)
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
    }, [categoryId, sortType, searchInput, currentPage]);

    const pizzas = items.filter((obj) => {
        return obj.title.toLowerCase().includes(searchInput.toLowerCase());

    }).map((obj) => <PizzaBlox key={obj.id} {...obj}/>)


    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories categoryId={categoryId} setCategoryId={(id) => onChangeCategory(id)}/>
                    <Sort />
                </div>
                <Search searchInput={searchInput} setSearchInput={(e) => setSearchInput(e)}/>

                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : pizzas}
                </div>
                <Pagination handleClickPage={(number) => setCurrentPage(number)}/>
            </div>
        </>
    );
};
