import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlox from "../components/PizzaBlock/PizzaBlox";
import { useEffect, useState } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [sortType, setSortType] = useState(
    {
      name: "популярности",
      sort: "rating",
    }
  )  
  useEffect(() => {
    setIsLoading(true)
    fetch(`https://67037090bd7c8c1ccd416a91.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0 ? `category=${categoryId}` : `` }&sortBy=${sortType.sort}&${searchInput? `&search=${searchInput}` : ''}&order=desc`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchInput, currentPage]);

  const pizzas = items.filter((obj) => {
    if (obj.title.toLowerCase().includes(searchInput.toLowerCase())){
      return true
    }  
    return false
  }).map((obj) => <PizzaBlox key={obj.id} {...obj}/>)


  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} setCategoryId={(id) => setCategoryId(id)}/>
          <Sort sortType={sortType} setSortType={(text) => setSortType(text)}/>
        </div>
        <Search searchInput={searchInput} setSearchInput={(e) => setSearchInput(e)}/>

        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas}
        </div>
        <Pagination handleClickPage={(number) => setCurrentPage(number)}/>
      </div>
    </>
  );
};
