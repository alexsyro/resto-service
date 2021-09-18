import React from 'react';
import styles from './Content.module.scss';
import video from './Videos/intro_video.mp4';

function Content() {
  return (
    <div className={styles.video__container}>
      <video src={video} type='video/mp4' autoPlay muted loop className={styles.video__media}></video>
    </div>
  );
}

export default Content;
