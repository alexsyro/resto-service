import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  sagaGetCategoriesAC,
} from '../../../../redux/actionCreators/categoriesAC';
import Category from './Category';
import Subcategory from './Subcategory';
import styles from './AddCategorySubcategory.module.scss';

export default function AddCategorySubcategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sagaGetCategoriesAC());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <Category />
        <Subcategory />
      </div>
    </div>
  );
}
