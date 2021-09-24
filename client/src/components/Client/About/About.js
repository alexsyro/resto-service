import React from 'react';
import styles from './About.module.scss';
import main_header from '../../../images/main_header.jpg';
import { useTranslation } from 'react-i18next';


function About() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <>
      <div>

        <div className={styles.about__header}>
          <img className={styles.pic}
            src={main_header}
            alt="about header" />
        </div>
        <div className={styles.ab__container}>

          <div className={styles.main__container}>

            <div className={styles.about__img}>
            </div>
            <div className={styles.text_container}>
              {/* <p className={styles.about__title}>О нас</p> */}
              <p className={styles.about__text}>
                “{t('us.1')}”
              </p>
            </div>
          </div>

          <div className={styles.main__container}>


            <div className={styles.text_container}>
              <p className={styles.about__small}>{t('us.2')} </p>
              <p className={styles.about__title}>{t('us.3')} </p>
              <p className={styles.about__text}>
              {t('us.4')}
              </p>
            </div>
            <div className={styles.about__philosophy}>
            </div>
          </div>

          <div className={styles.about__container}>
            <p className={styles.about__small}> {t('us.5')}</p>
            <p className={styles.about__title}>{t('us.6')}</p>

            <div className={styles.paragraph}>
              <div className={styles.chef__img}>
              </div>
              <div className={styles.text_container}>
                <p className={styles.about__text}>
                {t('us.7')}
                </p>
              </div>
            </div>
            <div className={styles.pictures__container}>
              <div className={styles.first__img}></div>
              <div className={styles.second__img}></div>
            </div>

          </div>

        </div>
      </div>
    </>

  )
}

export default About
