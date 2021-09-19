import React from 'react'
import { Link } from 'react-router-dom'

import styles from './ContentSlider.module.scss'

function ContentSlider() {
  return (
    <div className={styles.main__container}>
      <div className={styles.slider}>
        <div className={styles.slides}>
          <input id={styles.r1} type="radio" name="r" />
          <input id={styles.r2} type="radio" name="r" />
          <input id={styles.r3} type="radio" name="r" />
          <input id={styles.r4} type="radio" name="r" />

          <div className={`${styles.slide} ${styles.s1}`}>
            <img src="https://bm.img.com.ua/food/orig/0/bd/192fe9ed458a15c6dbeed30064a30bd0.jpg" />
          </div>
          <div className={styles.slide}>
            <img src="https://image.freepik.com/free-photo/white-fruit-platter-isolated-on-black-background_114579-12188.jpg" />
          </div>
          <div className={styles.slide}>
            <img src="https://lh3.googleusercontent.com/proxy/pDgTwMciHXZYYzNeDu_iNyr4-XGftJrYAMqA8RvpwerQ5touD3ajOh4r7ySjJqbaSpssEaM0OKIERcmSjbUoyXs22WNTXIaswmusFQYJZabsF0WGp81r__HgmxLTmBIr-RMEdM1TOL3IQ_nUieGOecHpVxrD8NXRv5BKl4QVywLzac6_AkA2CsBTcmniBnzQNcCa" />
          </div>
          <div className={styles.slide}>
            <img src="https://s1.1zoom.ru/b5050/57/The_second_dishes_Meat_products_Potato_Black_540792_3840x2400.jpg" />
          </div>
        </div>

        <div className={styles.navigation}>
          <label for={styles.r1} className={styles.bar}></label>
          <label for={styles.r2} className={styles.bar}></label>
          <label for={styles.r3} className={styles.bar}></label>
          <label for={styles.r4} className={styles.bar}></label>
        </div>
      </div>

      <button className={styles.slider__btn}>
        <Link className={styles.slider__btn__text} to="/menu">
          Меню
        </Link>
      </button>
    </div>
  )
}

export default ContentSlider
