import Category from './Category';
import Subcategory from './Subcategory';
import styles from './AddCategorySubcategory.module.scss';

export default function AddCategorySubcategory() {
  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <Category />
        <Subcategory />
      </div>
    </div>
  );
}
