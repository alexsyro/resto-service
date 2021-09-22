import React from 'react';
import { Link } from "react-router-dom";
import styles from './Subcategory.module.scss'

function Subcategory({ subcategory }) {
  console.log(subcategory);
  return (
    <div className={styles.subcategory__block}>
      <Link to={`/menu/subcategory/${subcategory.id}`} className="uk-button uk-button-default">
        <div className={styles.subcategory}>
          {subcategory.name}
        </div>
      </Link>
    </div>
  );
}

export default Subcategory;
