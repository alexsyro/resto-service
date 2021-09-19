import React from 'react'
import styles from './ContentVideo.module.scss'
import video from './Videos/intro_video.mp4'

function ContentVideo() {
  return (
    <div className={styles.video__main_container}>
      <div className={styles.video__container}>
        <video
          src={video}
          type="video/mp4"
          autoPlay
          muted
          loop
          className={styles.video__media}
        ></video>
      </div>
    </div>
  )
}

export default ContentVideo
