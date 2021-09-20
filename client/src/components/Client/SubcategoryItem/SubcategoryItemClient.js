import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import {GET_DISHES} from '../../../redux/actionTypes/actionType'
import { dishAC } from '../../../redux/actionCreators/dishAC'
import Dish from '../Dish/Dish';

function SubcategoryItem(props) {

  const dispatch = useDispatch();
  const { categoryId } = useParams()

  useEffect(() => {
    console.log(categoryId);
    // fetch('http://localhost:1234/api/menu/categories/' + categoryId)
    //   .then((res) => res.json())
    //   .then((categories) => dispatch({ type: GET_DISHES, payload: categories }))
    dispatch(dishAC(categoryId))
  }, [dispatch, categoryId]);

  const dishes = useSelector((state) => state.dishesReducer.dishes);
  console.log(dishes, 'DISHES')

  return (
    <>
      {dishes?.map((dish) => <Dish key={dish.id} dish={dish} />)}
    </>
  );
}

export default SubcategoryItem;
