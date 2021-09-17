import React from 'react'
import styles from './Content.module.scss'
import video from './Videos/intro_video.mp4'

function Content() {
  return (
    <div className={styles.video__container}>
      <video autoPlay muted loop className={styles.video}>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  )
}

export default Content
