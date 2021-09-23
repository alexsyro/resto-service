
import React, { useState } from 'react';
import CategoryList from './CategoryList/CategoryList';
import styles from './Menu.module.scss'

function Menu() {

  const [actualCategory, setActualCategory] = useState('MENU') // через useState меняем категорию меню и в зависимости от этого рендерим компонент


  return (
      <div className={styles.mainblock}>
        <div onClick={() => setActualCategory('Салаты')}> 
          <h1 style={{color: `white`}}>Меню</h1>
        </div>

        {/* условный рендеринг ниже */}

        <div>{actualCategory === 'MENU' && <CategoryList />} </div>
      </div>
  );
}

export default Menu;
