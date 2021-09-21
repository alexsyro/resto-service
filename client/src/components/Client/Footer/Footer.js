import styles from './Footer.module.scss'
// import instagramLogo from './assets/img/instagram.png'

function Footer() {
  return (
    <div className={styles.container}>
      {/* <a className={styles.footer__link} href="#" target="_blank"> */}
      {/* <img className={styles.footer__img} alt="" src={instagramLogo} /> */}

      <div className={styles.hours}>
        <h6 className={styles.header}> МЫ ОТКРЫТЫ</h6>
        <p>Пн – Пт 12:00 – 23:00</p>
        <p>Сб – Вс 13:00 – 23:00</p>
      </div>
      <div className={styles.hours}>
        <h6> БРОНИРОВАНИЕ</h6>
        <p>+7 (962) 724-89-40</p>
        <p>Забронируйте столик</p>
      </div>
      <div className={styles.hours}>
        <h6> ПОСЕТИТЕ НАС</h6>
        <p>Санкт-Петербург, Литейный пр-т, 7</p>
      </div>
      {/* <div>
        <p>© Copyright Итальянский ресторан Il Milanese by Marco  2019</p>
      </div> */}
      {/* </a> */}
    </div>
  )
}

export default Footer
