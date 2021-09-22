import React from 'react'
import Subcategory from '../Subcategory/Subcategory'
import styles from './Category.module.scss'

function Category({ category }) {
  return (
    <>
      <div className={styles.category__container}>
        <p className={styles.category__name}>{category.name}</p>
        <div className={styles.category__element}>
          {category.categories.map((category) => (
            <Subcategory key={category.id} subcategory={category} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Category
