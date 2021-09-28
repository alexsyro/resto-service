import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../Category/Category';
import { sagaGetCategoriesAC } from '../../../redux/actionCreators/categoriesAC';

function CategoryList() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(sagaGetCategoriesAC());
  }, [dispatch]);

  return (
    <>
      {categories.map((category)=> <Category key={category.id} category={category}/>)}
    </>
  );
}

export default CategoryList
