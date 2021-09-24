import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import styles from './ContentBook.module.scss'

function ContentBook() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.main__container}>
      

      <div className={styles.all}>

      <div className={styles.book__left}>
        <div className={styles.book__left_content}>
          <p className={styles.left_gold}>{t('book.1')}</p>
          <p className={styles.left_title}>{t('book.2')}</p>
          <p className={styles.left_text}>
            “{t('book.3')}”
          </p>
          <button className={styles.book__btn}>
            <Link className={styles.book__btn__text} to="/about">
            {t('book.4')}
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
