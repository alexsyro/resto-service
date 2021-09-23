import React from 'react';
import { Link } from 'react-router-dom'
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
        <div className={styles.contacts__div__text}>
          <h1 className={styles.contacts_h1}>
            Наши
          </h1>
          <h1 className={styles.contacts_h1}>
            Контакты:
          </h1>
        </div>
      </div>
      <div className={styles.contacts_mapCard}>
        <div className={styles.contacts_map}>
          <YMaps>
            <Map width={480} height={240}
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
        <div className={styles.contacts_mapInfo}>
          <p className={styles.contacts__p}>Ленина проспект 121, Обнинск</p>
          <p className={styles.contacts__p}>+7 (910) 865-01-01</p>
          <p className={styles.contacts__p}>Мы открыты для вас с 12:00 - до 23:55</p>
          <button className={styles.contacts__button}>
            <Link className={styles.contacts_button__text} to="/book">
              Забронировать
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contacts

