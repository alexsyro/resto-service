import React from 'react';
import styles from './Contacts.module.scss';

function Contacts() {
  return (
    <div className={styles.contacts__container}>
      <div className={styles.contacts__header}>
        <img className={styles.contacts__img}
          src="https://ilmilanese.ru/wp-content/uploads/2018/03/interior.jpg"
          alt="contacts header" />
        <span className={styles.contacts__span}>Наши</span>
        <h1 className={styles.contacts_h1}>
          Контакты
        </h1>
      </div>
      <div className={styles.contacts_mapCard}>
        <div id="map" className={styles.map}> здесь должна быть карта</div>
        <div className={styles.mapInfo}>
          <span className={styles.contacts__span}>Давайте</span>
          <h1 className={styles.contacts__h1}>Знакомиться</h1>
        </div>
        <p className={styles.contacts__p}>Обнинск, какая-то улица</p>
        <p className={styles.contacts__p}>Какой-то телефон</p>
        <button className={styles.contacts__button}>Забранировать стол</button>
      </div>
    </div>
  )
}

export default Contacts
