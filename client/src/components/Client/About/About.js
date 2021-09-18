import React from 'react';
import styles from './About.module.scss';

function About() {
  return (
    <div className={styles.about__container}>
      <div className={styles.about__header}>
        <img className={styles.about__img}
          src="https://media-cdn.tripadvisor.com/media/photo-s/14/d3/f4/72/caption.jpg"
          alt="about header" />
        <h1 className={styles.about_h1}>
          <span className={styles.about__span}>О</span>
          НАС
        </h1>
      </div>
      <div className={styles.about__foodCard}>
        <img src="https://ilmilanese.ru/wp-content/uploads/2018/04/about_1.jpg" alt="card img" />
        <p className={styles.about__p}>“Кулинария похожа на моду. Нам всегда нравится меняться к лучшему. Когда мы путешествуем
          в разные регионы Италии – в Венецию, Ломбардию, Тоскану – и видим новые ингредиенты,
          то мы пробуем использовать их в своих новых блюдах.”</p>
      </div>
      <div className={styles.about__foodCard}>
        <span className={styles.about__span}>Философия</span>
        <h1 className={styles.about__h1}>НАШИХ БЛЮД</h1>
        <p className={styles.about__p}>Натуральность продуктов в изящно простом кулинарном прочтении.
          Этим, в принципе, славится итальянская кухня, завоевавшая гастрономические
          подиумы мира именно удивительно вкусной простотой решений.</p>
        <p className={styles.about__p}>Помидоры, сыр, ароматное оливковое масло, оливы, чеснок, каперсы, грибы – основные
          компоненты, создающие сочную аранжировку блюд в Il Milanese.</p>
        <img src="https://ilmilanese.ru/wp-content/uploads/2019/11/IMG_7396-1.jpg" alt="card img" />
      </div>
      <div className={styles.about__borderImg}>
        <img className={styles.about__img} src="http://ilmilanese.ru/wp-content/uploads/2018/04/about_3.jpg" alt="border img" />
      </div>
      <div className={styles.about__cheff}>
        <span className={styles.about__span}>Познакомьтесь</span>
        <h1 className={styles.about__h1}>C НАШИМ ШЕФ-ПОВАРОМ</h1>
        <div className={styles.about__foodCard}>
        <img src="	https://ilmilanese.ru/wp-content/uploads/2018/03/marco_chef2.jpg" alt="card img" />
        <p className={styles.about__p}>Я помню, как бабушка каждое воскресенье делала домашнюю 
        пасту, вручную раскатывая тесто. А заправляла соусом со свининой. Этот вкус дества, 
        пожалуй, похож на счастье. И бабушка все готовила исключительно вкусно</p>
        <p className={styles.about__p}>Благодаря ей я сам занялся кулинарными экспериментами 
        и первое свое блюдо приготовил в 13 лет. Это было ризотто с морепродуктами. 
        И одобрение моего опыта семьей вдохновило еще больше.</p>
      </div>
      </div>
    </div>
  )
}

export default About
