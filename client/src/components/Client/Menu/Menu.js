import React from 'react';
import CategoryList from '../CategoryList/CategoryList';
import styles from './Menu.module.scss';
import menu from '../../../images/menu.png';

function Menu() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <img className={styles.pic} src={menu} alt='menu' />
        </div>

        <div className={styles.block}>
          <div className={styles.categories}>
            <CategoryList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
