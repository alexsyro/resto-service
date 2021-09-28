import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { sagaGetCategoriesAC } from '../../../redux/actionCreators/categoriesAC';
import CategoryList from './CategoryList/CategoryList';
import CategoryTree from './CategoryTree/CategoryTree';
import styles from './Menu.module.scss';

function Menu() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sagaGetCategoriesAC());
  }, []);

  return (
    <div className={styles.mainblock}>
      <CategoryTree/>
      <div>
        <h1 style={{ color: `white`, textAlign: 'center' }}>Меню</h1>
        <button onClick={() => history.push('/category/new')} className={styles.buttonMain}>
          Изменить или добавить
        </button>
      </div>
      <div>
        <CategoryList />
      </div>
    </div>
  );
}

export default Menu;
