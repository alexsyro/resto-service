import styles from './Footer.module.scss'
import instagramLogo from './assets/img/instagram.png'

function Footer() {
  return (
    <div className={styles.container}>
      <a className={styles.footer__link} href="#" target="_blank">
        <img className={styles.footer__img} src={instagramLogo} />
      </a>
    </div>
  )
}

export default Footer
