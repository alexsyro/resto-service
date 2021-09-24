import React from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import styles from './ContentAbout.module.scss'

function ContentAbout() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.main__container}>

      <div className={styles.about__img}>
      </div>
      <div className={styles.text_container}>
        <p className={styles.about__gold}> {t('about.1')}</p>
        <p className={styles.about__title}> {t('about.2')}</p>
        <p className={styles.about__text}>
          “{t('about.3')}”
        </p>
        <button className={styles.about__btn}>
          <Link className={styles.about__btn__text} to="/about">
          {t('about.4')}
          </Link>
        </button>
      </div>
    </div>

  )
}
export default ContentAbout
