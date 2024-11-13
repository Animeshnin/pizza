import React from 'react'

import styles from './search.module.scss'

type SearchProps = {
    searchInput: string;
    setSearchInput: (searchInput: string) => void
}

export default function Search({searchInput, setSearchInput} : SearchProps) {
    return (
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className={styles.root}
               placeholder='Поиск пиццы...'></input>
    )
}
