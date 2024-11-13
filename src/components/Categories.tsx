import React from 'react'

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (i : number) => void;
}


// {categoryId , setCategoryId} : CategoriesProps можно так
const Categories: React.FC<CategoriesProps> = ({categoryId , setCategoryId}) => {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
    <ul>
      {categories.map((value, i) => (
        <li key={i} onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''}>{value}</li>
      ))}
    </ul>
  </div>
  )
}

export default Categories
