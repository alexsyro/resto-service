import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../Category/Category';
import {categoryListAC} from '../../../redux/actionCreators/categoryListAC'

function CategoryList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryListAC())
  }, [dispatch]);

  const allCategories =  useSelector((state) => state.menuReducer.menu);

  return (
    <>
      {allCategories.map((category)=> <Category key={category.id} category={category}/>)}
    </>
  );
}

export default CategoryList
