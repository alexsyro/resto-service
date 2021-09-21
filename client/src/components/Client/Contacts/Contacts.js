import React from 'react';
import styles from './Contacts.module.scss';
import { YMaps, Map, ZoomControl, Placemark } from 'react-yandex-maps';
import main_header from '../../../images/main_header.jpg';

function Contacts() {
  return (
    <div className={styles.contacts__container}>
      <div className={styles.contacts__header}>
        <img className={styles.contacts__img}
          src={main_header}
          alt="contacts header" />
        <span className={styles.contacts__span}>Наши</span>
        <h1 className={styles.contacts_h1}>
          Контакты
        </h1>
      </div>
      <div className={styles.contacts_mapCard}>
        <div className={styles.contacts_map}>
          <YMaps>
            <Map
              defaultState={{
                center: [55.107190, 36.591894],
                zoom: 15,
                controls: [],
              }}
            >
              <ZoomControl options={{ float: 'right' }} />
              <Placemark geometry={[55.107190, 36.591894]} />
            </Map>
          </YMaps>
        </div>
        <div className={styles.mapInfo}>
          <span className={styles.contacts__span}>Давайте</span>
          <h1 className={styles.contacts__h1}>Знакомиться</h1>
        </div>
        <p className={styles.contacts__p}>Ленина проспект 121, Обнинск</p>
        <p className={styles.contacts__p}>+7 (910) 865-01-01</p>
        <p className={styles.contacts__p}>Мы открыты для вас с 12:00 - 23:55</p>
        <button className={styles.contacts__button}>Забранировать стол</button>
      </div>
    </div>
  )
}

export default Contacts

