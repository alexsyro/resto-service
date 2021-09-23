import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Subactegory.model.scss'

function Subcategory({ subcategory }) {
  return (
    <div className={styles.subcategory__container}>
      <Link className={styles.subcategory__link} to={`/menu/subcategory/${subcategory.id}`}>
        <button >{subcategory.name}</button>
      </Link>
    </div>
  )
}

export default Subcategory
