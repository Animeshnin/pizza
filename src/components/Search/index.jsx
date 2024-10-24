import React from 'react'

import styles from './search.module.scss'

export default function Search({searchInput, setSearchInput}) {
  return (
    <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className={styles.root} placeholder='Поиск пиццы...'></input>
  )
}
