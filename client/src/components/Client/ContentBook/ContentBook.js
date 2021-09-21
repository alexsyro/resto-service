import React from 'react'
import { Link } from 'react-router-dom'

import styles from './ContentBook.module.scss'

function ContentBook() {
  return (
    <div className={styles.main__container}>
      

      <div className={styles.all}>

      <div className={styles.book__left}>
        <div className={styles.book__left_content}>
          <p className={styles.left_title}>Еда, напитки, шоу</p>
          <p className={styles.left_text}>
            “Кулинария похожа на моду. Нам всегда нравится меняться к лучшему.
            Когда мы путешествуем в разные регионы Италии – в Венецию,
            Ломбардию, Тоскану – и видим новые ингредиенты, то мы пробуем
            использовать их в своих новых блюдах”
          </p>
          <button className={styles.book__btn}>
            <Link className={styles.book__btn__text} to="/about">
              Забронировать
            </Link>
          </button>
        </div>
      </div>

      </div>
      <div className={styles.book__right}></div>

    
    </div>
  )
}

export default ContentBook
