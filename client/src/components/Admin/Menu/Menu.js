import React, { useState } from 'react';
import { useHistory } from 'react-router';
import CategoryList from './CategoryList/CategoryList';
import styles from './Menu.module.scss';

function Menu() {
  const history = useHistory();

  const [actualCategory, setActualCategory] = useState('MENU'); // через useState меняем категорию меню и в зависимости от этого рендерим компонент

  return (
    <div className={styles.mainblock}>
      <div onClick={() => setActualCategory('Салаты')}>
        <h1 style={{ color: `white`, textAlign: 'center' }}>Меню</h1>
        <button onClick={() => history.push('/category/new')} className={styles.buttonMain}>
          Добавить категорию или подкатегорию
        </button>
      </div>

      {/* условный рендеринг ниже */}

      <div>{actualCategory === 'MENU' && <CategoryList />} </div>
    </div>
  );
}

export default Menu;
