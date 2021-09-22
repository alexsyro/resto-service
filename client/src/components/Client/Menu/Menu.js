import React, { useState } from 'react'
import CategoryList from '../CategoryList/CategoryList'
import styles from './Menu.module.scss'
import menu from '../../../images/menu.png'

function Menu() {

  const [actualCategory, setActualCategory] = useState('MENU') // через useState меняем категорию меню и в зависимости от этого рендерим компонент


  return (
    <>
      {/* <div onClick={() => setActualCategory('Салаты')}> MENU</div> */}

      {/* условный рендеринг ниже */}

      <div className={styles.container}>
        <div >
          <img className={styles.pic}
            src={menu}
            alt="menu" />
        </div>

        <div className={styles.block}>

        <div className={styles.categories}>
          {actualCategory === 'MENU' && <CategoryList />}
        </div>

        <div className={styles.menu_picture}>
        </div>

        </div>

      </div>

    </>
  );
}

export default Menu
