import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { setSortType} from "../redux/slices/filter/slice";


type SortType = {
  name: string;
  type: 'rating' | 'title' | 'price';
}

export const list : SortType[] = [
  {
    name: "популярности",
    type: 'rating',
  },
  {
    name: "цене",
    type: 'price',
  },
  {
    name: "алфавиту",
    type: 'title',
  }
]


export default function Sort() {
  const [active, setActive] = useState(false)
  const sortType = useSelector((state : { filter: { sort: { name: string, type: string }}}) => state.filter.sort);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLSpanElement>(null);


  const updateStateActiveAndSort = (text : SortType) => {
    setActive(prev => !prev)
    dispatch(setSortType(text))
  }

  useEffect(() => {
    const handleClickBody = (e: MouseEvent ) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setActive(false)

      }
    }

    document.body.addEventListener('click', handleClickBody)

    return  () =>   document.body.removeEventListener('click', handleClickBody)

  }, []);

  return (
    <div  className="sort">
    <div className="sort__label">
      <svg
        width="10"
        className={active ? '' : 'luka'}
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
          fill="#2C2C2C"
        />
      </svg>
      <b>Сортировка по:</b>
      <span ref={sortRef}  onClick={() => setActive(prev => !prev)}>{sortType.name}</span>
    </div>
    {active && (
        <div className="sort__popup">
        <ul>
          {list.map((obj, index) => (
            <li key={index} onClick={() => updateStateActiveAndSort(obj)} className={sortType.name === obj.name ? 'active' : ''}>{obj.name}</li>
          ))}
        </ul>
      </div>) 
      }
    
  </div>
  )
}
