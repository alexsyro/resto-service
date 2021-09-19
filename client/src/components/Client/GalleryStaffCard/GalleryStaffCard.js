import React from 'react'
import styles from './GalleryStaffCard.module.scss';

function GalleryStaffCard({ staff }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgBx}>
        <img className={styles.img}
        src="https://ilmilanese.ru/wp-content/uploads/2018/03/marco_chef2.jpg" 
        alt={`staff${staff.id}`} />
      </div>
      <div className={styles.card__content}>
          <h2 className={styles.text}>{staff.name}</h2>
          <h3 className={styles.text}>{staff.position}</h3>
          <p className={styles.text}>{staff.description}</p>
      </div>
    </div>
  )
}

export default GalleryStaffCard
