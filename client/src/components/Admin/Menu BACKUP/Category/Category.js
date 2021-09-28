import React from 'react';
import Subcategory from '../Subcategory/Subcategory'
import styles from './Category.module.scss';

function Category({category}) {

  return (
    <>
      <p className={styles.category}>{category.name}</p>
      <div className={styles.subcategory}>
      {category.categories.map((category)=> <Subcategory key={category.id} subcategory={category}/>)}
      </div>
    </>
  );
}

export default Category;
