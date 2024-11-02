import qs from 'qs'
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import PizzaBlox from "../components/PizzaBlock/PizzaBlox";
import {useEffect, useRef, useState} from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import {setCategoryId, setFilters} from "../redux/slices/filterSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false)
    const isMounted = useRef(false);

    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort.sort);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }


    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')

    const fetchPizzas = () => {
        setIsLoading(true)
        fetch(`https://67037090bd7c8c1ccd416a91.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ``}&sortBy=${sortType}&${searchInput ? `&search=${searchInput}` : ''}&order=desc`)
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        console.log('asd')
    }

    useEffect(() => {
        if(window.location.search){
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find((obj) => obj.id === params.sort);

            dispatch(setFilters({
                ...params,
                sort
            }))
            console.log("asdasd")
            isSearch.current = true

        }

    }, []);

    useEffect(() => {

        if(!isSearch.current){

            fetchPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortType, searchInput, currentPage]);

    useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                sortType: sortType,
                categoryId: categoryId,
                searchInput: searchInput,
                currentPage: currentPage,
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true
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
