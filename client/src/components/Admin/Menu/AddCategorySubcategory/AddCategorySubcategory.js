import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sagaAddCategoryAC,
  sagaChangeCategoryAC,
  sagaSetCurrentCategoryAC,
  sagaGetCategoriesAC,
  sagaDeleteCategoryAC,
} from '../../../../redux/actionCreators/categoriesAC';
import Category from './Category';
import Subcategory from './Subcategory';
import styles from './AddCategorySubcategory.module.scss';

const NO_STATE = 0;
const EDIT_STATE = 1;
const ADD_STATE = 2;

export default function AddCategorySubcategory() {
  const dispatch = useDispatch();
  const { currentCategory, currentSubCategory } = useSelector((state) => state.categoryReducer);
  const [state, setState] = useState(NO_STATE);

  const editHandler = () => {
    setState(EDIT_STATE);
  };

  const addHandler = () => {
    setState(ADD_STATE);
  };
  const deleteHandler = () => {
    dispatch(sagaDeleteCategoryAC({ id: currentCategory.id }));
  };

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
