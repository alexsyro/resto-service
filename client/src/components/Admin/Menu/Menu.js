import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { sagaGetCategoriesAC } from '../../../redux/actionCreators/categoriesAC';
import AddCategorySubcategory from './AddCategorySubcategory/AddCategorySubcategory';
import AddDishForm from './AddDishForm/AddDishForm';
import CategoryTree from './CategoryTree/CategoryTree';
import DishInfo from './DishInfo/DishInfo';
import styles from './Menu.module.scss';
import SubcategoryItem from './SubcategoryItem/SubcategoryItem';

function Menu() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sagaGetCategoriesAC());
  }, [dispatch]);

  return (
    <div className={styles.mainblock}>
      <div className={styles.sideTree}>
        <CategoryTree />
      </div>
      <div className={styles.content}>
        <Switch>
          <Route exact path='/menu/position/:dishId'>
            <DishInfo />
          </Route>
          <Route exact path='/menu/subcategory/:subcategoryId'>
            <SubcategoryItem />
          </Route>
          <Route exact path='/menu/subcategory/:subcategoryId/new'>
            <AddDishForm />
          </Route>
          <Route exact path='/menu/category/new'>
            <AddCategorySubcategory />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Menu;
