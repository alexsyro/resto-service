import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORY, GET_MEASURES } from '../../../../redux/actionTypes/actionType';
import Category from '../Category/Category';
import styles from './CategoryList.module.scss';

const { REACT_APP_URL } = process.env;

function CategoryList(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${REACT_APP_URL}api/menu/categories`, { credentials: 'include' })
      .then((res) => res.json())
      .then((categories) => dispatch({ type: GET_CATEGORY, payload: categories }));
  }, [dispatch]);

  fetch(`${REACT_APP_URL}api/menu/measures`, { credentials: 'include' })
    .then((res) => res.json())
    .then(({ measures }) => dispatch({ type: GET_MEASURES, payload: measures }));

  const allCategories = useSelector((state) => state.menuReducer.menu);

  return (
    <div className={styles.category}>
      {allCategories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;
