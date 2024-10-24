import React from 'react'
import style from "./style.module.scss"
export default function NotFoundBlock() {
  return (
    <div className={style.root}>
      <h1 ><span>😕</span> <br/> Ничего не найдено</h1>
      <p>Такой страницы не существует</p>
    </div>
  )
}
