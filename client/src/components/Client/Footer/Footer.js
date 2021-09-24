import styles from './Footer.module.scss'
import vkLogo from './assets/img/vk.png'
import instaLogo from './assets/img/instagram.png'
import { useTranslation } from 'react-i18next';

function Footer() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.container}>
      {/* <a className={styles.footer__link} href="#" target="_blank"> */}
      {/* <img className={styles.footer__img} alt="" src={instagramLogo} /> */}

      <div className={styles.hours}>
        <h6 className={styles.header}> {t('footer.1')}</h6>
        <p className={styles.p}>{t('footer.2')}</p>
        <p className={styles.p}>{t('footer.3')}</p>
      </div>
      <div className={styles.hours}>
        <h6 className={styles.header}> {t('footer.4')}</h6>
        <p className={styles.p}><a href="tel:+79108650101">+7 (910) 865-01-01</a></p>
        <p className={styles.p}>{t('footer.5')}</p>
      </div>
      <div className={styles.hours}>
        <h6 className={styles.header}>{t('footer.6')}</h6>
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
        <h6 className={styles.header}> {t('footer.7')}</h6>
        <p className={styles.p}>{t('footer.8')}</p>
      </div>
    </div>
  );
}

export default Footer;
