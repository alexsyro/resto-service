
import React, { useState } from 'react';
import CategoryList from './CategoryList/CategoryList';

function Menu() {

  const [actualCategory, setActualCategory] = useState('MENU') // через useState меняем категорию меню и в зависимости от этого рендерим компонент


  return (
    <>
      <div onClick={() => setActualCategory('Салаты')}> MENU</div>

      {/* условный рендеринг ниже */}

      <div>{actualCategory === 'MENU' && <CategoryList />} </div>
    
    </>
  );
}

export default Menu;
