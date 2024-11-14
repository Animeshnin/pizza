import qs from 'qs'
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import PizzaBlox from "../components/PizzaBlock/PizzaBlox";
import {useEffect, useRef, useState} from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import {setCategoryId, setFilters} from "../redux/slices/filter/slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizzasSlice";
import {RootState} from "../redux/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


export const Home = () => {
    //  навигация в сайте
    const navigate = useNavigate();
    // хук useLocation показывает текущее местоположение в сайта
    const location = useLocation()
    const dispatch = useDispatch();

    const isSearch = useRef(false)
    const  isMounted = useRef(false);
    const categoryId : number = useTypedSelector((state ) => state.filter.categoryId);
    const sortType = useTypedSelector((state) => state.filter.sort.type);
    const items = useTypedSelector((state) => state.pizzas.items);

    const status = useTypedSelector((state) => state.pizzas.status);

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id));
    }

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchInput, setSearchInput] = useState<string>('')




    useEffect(() => {
        // если адресная строка после localhost не пустая
        if(location.search){
            // Парсим с адресной строки данные. Пример sortType=rating стал частью объекта и теперь выглядит так:
            // sortType: 'rating'
            const params = qs.parse(location.search.substring(1));
            const sort = list.find((obj ) => obj.name === params.sort) ;


            dispatch(setFilters({
                ...params,
                // @ts-ignore
                sort
            }))
            // Переводим isSearch в true, первая загрузка страницы. Ссылка пустая. Пропускаем следующий useEffect

            isSearch.current = true

        }

    }, []);

    useEffect(() => {
        // При первой загрузке сайта не делать запрос на сервер
        if(!isSearch.current){
            // @ts-ignore
            dispatch(fetchPizzas({currentPage, categoryId, sortType, searchInput}))
        }

        isSearch.current = false
    //     В случае первой загрузке
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

    const pizzas = items.filter((obj: any) => {
        return obj.title.toLowerCase().includes(searchInput.toLowerCase());

    }).map((obj: any) => <PizzaBlox key={obj.id} {...obj}/>)


    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories categoryId={categoryId} setCategoryId={(id: number) => onChangeCategory(id)}/>
                    <Sort />
                </div>
                <Search searchInput={searchInput} setSearchInput={(e: string) => setSearchInput(e)}/>

                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : pizzas}
                </div>
                <Pagination handleClickPage={(number: number) => setCurrentPage(number)} />
            </div>
        </>
    );
};
