import React from 'react';
import styles from './About.module.scss';
import main_header from '../../../images/main_header.jpg';


function About() {
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
                “Кулинария похожа на моду. Нам всегда нравится меняться к лучшему.
                Когда мы путешествуем в разные регионы Италии – в Венецию, Ломбардию,
                Тоскану – и видим новые ингредиенты, то мы пробуем использовать их в
                своих новых блюдах.”
              </p>
            </div>
          </div>

          <div className={styles.main__container}>


            <div className={styles.text_container}>
              <p className={styles.about__small}>Простая </p>
              <p className={styles.about__title}>Философия </p>
              <p className={styles.about__text}>
                Натуральность продуктов в изящно простом кулинарном прочтении.
                Этим, в принципе, славится итальянская кухня, завоевавшая гастрономические
                подиумы мира именно удивительно вкусной простотой решений.
              </p>
            </div>
            <div className={styles.about__philosophy}>
            </div>
          </div>

          <div className={styles.about__container}>
            <p className={styles.about__small}> Любимый</p>
            <p className={styles.about__title}> Шеф-повар</p>

            <div className={styles.paragraph}>
              <div className={styles.chef__img}>
              </div>
              <div className={styles.text_container}>
                <p className={styles.about__text}>
                  Благодаря бабушке я сам занялся кулинарными экспериментами
                  и первое свое блюдо приготовил в 13 лет. Это было ризотто с морепродуктами.
                  И одобрение моего опыта семьей вдохновило еще больше
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
