import React from 'react'
import style from "./pagination.module.scss"
import ReactPaginate from "react-paginate";


export default function Pagination({handleClickPage}) {
  return (
    <ReactPaginate
    className={style.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => handleClickPage(e.selected + 1 )}
    pageRangeDisplayed={4}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
/>
  )
}
