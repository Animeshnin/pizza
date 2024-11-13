import React, { useState } from "react";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {addItems, CartItemSlice} from "../../redux/slices/cartSlice";
import Modal from "../Modal/Modal";
import {RootState} from "../../redux/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


type PizzaBloxProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
}

export default function PizzaBlox({ id ,imageUrl, title, price, sizes, types } : PizzaBloxProps) {
  const [activeTypeName, setActiveTypeName] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const count = useTypedSelector(state =>  state.cart.items.find(obj => obj.id === id))
  const [sizePizza, setSizePizza] = useState(0);
  const typeName = ["тонкое", "традиционное"];
  const sizesValue = [20, 30, 40];

  const addCount = count ? count.count : 0
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const obj: CartItemSlice = {
      id,
      title,
      price,
      imageUrl,
      type: typeName[activeTypeName],
      size: sizesValue[sizePizza],
      count: 0,
    }

    dispatch(addItems(obj))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img onClick={() => setModalActive(true)} className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((size, i) => (
              <li
                key={i}
                onClick={() => setActiveTypeName(i)}
                className={activeTypeName === i ? "active" : ""}
              >
                {typeName[size]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size: number, i: number) => (
              <li
                onClick={() => setSizePizza(i)}
                key={i}
                className={sizePizza === i ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addCount > 0 && <i>{addCount}</i>}
          </button>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <img className="pizza-block__image" src={imageUrl} alt={'Pizza'}/>
        <div>
          <div className={'pizza-block-right'}>
            <h4 className="pizza-block__title">Пицца {title}</h4>
          </div>
          <div className={'pizza-block-text '}>
            <p>Тут нет ничего интересного. Хотел просто сделать пересоздаваемое модальное окно</p>
          </div>
        </div>

      </Modal>

    </div>
  );
}
