import React from 'react'
import { Link } from 'react-router-dom'

import styles from './ContentAbout.module.scss'

function ContentAbout() {
  return (
    <div className={styles.main__container}>
     
      <div className={styles.about__img}>
      </div>
      <div className={styles.text_container}>
        <p className={styles.about__gold}>Настоящая</p>
        <p className={styles.about__title}>РУССКАЯ КУХНЯ</p>
        <p className={styles.about__text}>
          “Кулинария похожа на моду. Нам всегда нравится меняться к лучшему.
          Когда мы путешествуем в разные регионы Италии – в Венецию, Ломбардию,
          Тоскану – и видим новые ингредиенты, то мы пробуем использовать их в
          своих новых блюдах.”
        </p>
        <button className={styles.about__btn}>
          <Link className={styles.about__btn__text} to="/about">
            Подробнее
          </Link>
        </button>
      </div>
    </div>
  )
}

export default ContentAbout
