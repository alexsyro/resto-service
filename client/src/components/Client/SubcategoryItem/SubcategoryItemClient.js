import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import {GET_DISHES} from '../../../redux/actionTypes/actionType'
import { dishAC } from '../../../redux/actionCreators/dishAC'
import Dish from '../Dish/Dish';
import styles from '../Dish/Dish.module.scss'


function SubcategoryItem(props) {
  const history = useHistory();
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
      <button className={styles.back} onClick={() => history.goBack()}>Назад</button>
      {dishes?.map((dish) => <Dish key={dish.id} dish={dish} />)}
    </>
  );
}

export default SubcategoryItem;
