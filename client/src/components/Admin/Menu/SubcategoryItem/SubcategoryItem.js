import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import {GET_DISHES} from '../../../../redux/actionTypes/actionType'
import Dish from '../Dish/Dish';

function SubcategoryItem(props) {

  const dispatch = useDispatch();
  const {categoryName, categoryId } = useParams()

  useEffect(() => {
    fetch('http://localhost:1234/api/menu/categories/' + categoryId)
      .then((res) => res.json())
      .then((categories) => dispatch({ type: GET_DISHES, payload: categories }))
  }, [dispatch, categoryId]);

  const dishes =  useSelector((state) => state.dishesReducer.dishes);
  console.log(dishes, 'DISHES')

  return (
    <>
     {dishes.map((dish)=> <Dish  key={dish.id} dish={dish}/>)}
     <Link to={`/menu/add/${categoryName}/${categoryId}`} className="uk-button uk-button-default">Добавить позицию</Link>
    </>
  );
}

export default SubcategoryItem;