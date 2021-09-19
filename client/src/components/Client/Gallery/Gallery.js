import React from 'react';
import styles from './Gallery.module.scss';
import GalleryStaffCard from '../GalleryStaffCard/GalleryStaffCard';

const staffArr = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "position": "Chef",
    "description": "Всегда любил пожрать, теперь я тут, готовлю в любимом ресторане и мне платят едой"
  },
  {
    "id": 2,
    "name": "Johny Cage",
    "position": "Waiter",
    "description": "Всегда любил пожрать, теперь я тут, готовлю в любимом ресторане и мне платят едой"
  },
  {
    "id": 3,
    "name": "Sub Zero",
    "position": "bartender",
    "description": "Всегда любил пожрать, теперь я тут, готовлю в любимом ресторане и мне платят едой"
  },
]
function Gallery() {
  return (
    <div className={styles.gallery__container}>
      {staffArr.map(staff => {
        return <GalleryStaffCard key={staff.id} staff={staff}/>
      })}
    </div>
  )
}

export default Gallery
