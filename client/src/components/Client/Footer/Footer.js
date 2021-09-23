import styles from './Footer.module.scss';
import vkLogo from './assets/img/vk.png';
import instaLogo from './assets/img/instagram.png';

function Footer() {
  return (
    <div className={styles.container}>
      {/* <a className={styles.footer__link} href="#" target="_blank"> */}
      {/* <img className={styles.footer__img} alt="" src={instagramLogo} /> */}

      <div className={styles.hours}>
        <h6 className={styles.header}> МЫ ОТКРЫТЫ</h6>
        <p className={styles.p}>с 12:00 – до 23:55</p>
      </div>
      <div className={styles.hours}>
        <h6 className={styles.header}> БРОНИРОВАНИЕ</h6>
        <p className={styles.p}><a href="tel:+79108650101">+7 (910) 865-01-01</a></p>
        

        <p className={styles.p}>Забронируйте столик</p>
      </div>
      <div className={styles.hours}>
        <h6 className={styles.header}>Социальные сети</h6>
        <div className={styles.logos__container}>
          <a href='https://vk.com/tochkaobninsk' target='_blank' rel='noreferrer'>
            <img src={vkLogo} alt='VK'></img>
          </a>

          <a href='https://www.instagram.com/tochka_rest/' target='_blank' rel='noreferrer'>
            <img src={instaLogo} alt='INST'></img>
          </a>
        </div>
      </div>
      <div className={styles.hours}>
        <h6 className={styles.header}> ПОСЕТИТЕ НАС</h6>
        <p className={styles.p}>Ленина проспект 121, Обнинск</p>
      </div>
    </div>
  );
}

export default Footer;
