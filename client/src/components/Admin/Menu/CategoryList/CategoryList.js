import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GET_CATEGORY} from '../../../../redux/actionTypes/actionType'
import Category from '../Category/Category';

function CategoryList(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:1234/api/menu/categories')
    .then((res) => res.json())
    .then((categories) =>  dispatch({ type: GET_CATEGORY, payload: categories }))
  }, [dispatch]);

  const allCategories =  useSelector((state) => state.menuReducer.menu);

  return (
    <>
      {allCategories.map((category)=> <Category key={category.id} category={category}/>)}
    </>
  );
}

export default CategoryList;
