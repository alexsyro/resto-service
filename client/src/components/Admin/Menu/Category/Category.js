import React from 'react';
import Subcategory from '../Subcategory/Subcategory'

function Category({category}) {

  return (
    <>
      <p>{category.name}</p>
      {category.categories.map((category)=> <Subcategory key={category.id} subcategory={category}/>)}
    </>
  );
}

export default Category;
