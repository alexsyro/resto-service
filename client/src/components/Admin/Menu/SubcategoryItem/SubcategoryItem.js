import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GET_DISHES } from '../../../../redux/actionTypes/actionType';
import Dish from '../Dish/Dish';
import styles from './SubcategoryItem.module.scss'

function SubcategoryItem(props) {
  const dispatch = useDispatch();
  const {  categoryId } = useParams();

  useEffect(() => {
    fetch('http://localhost:1234/api/menu/categories/' + categoryId, { credentials: 'include' })
      .then((res) => res.json())
      .then((categories) => dispatch({ type: GET_DISHES, payload: categories }));
  }, [dispatch, categoryId]);

  const dishes = useSelector((state) => state.dishesReducer.dishes);
  console.log(dishes, 'DISHES');

  return (
    <div>
    <div className={styles.dish__block}>
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </div>
      <Link to={`/menu/subcategory/${categoryId}/new`} className='uk-button uk-button-default'>
        Добавить позицию
      </Link>
    </div>
  );
}

export default SubcategoryItem;
