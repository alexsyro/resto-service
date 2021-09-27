import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sagaAddCategoryAC,
  sagaChangeCategoryAC,
  sagaSetCurrentCategoryAC,
  sagaGetCategoriesAC,
} from '../../../../redux/actionCreators/categoriesAC';
// import { sagaGetCategoriesAC } from '../../../../redux/actionCreators/sagaAC';
import styles from './AddCategory.module.scss';

const NO_STATE = 0;
const EDIT_STATE = 1;
const ADD_STATE = 2;

export default function AddCategory() {
  const dispatch = useDispatch();
  const { categories, currentCategory, currentSubCategory } = useSelector((state) => state.categoryReducer);
  const [state, setState] = useState(NO_STATE);

  const selectCategory = (event) => {
    const { id } = event.target.dataset;
    console.log('AAAAAAAAAAID', id, currentCategory);
    dispatch(sagaSetCurrentCategoryAC({ id }));
  };

  const editHandler = () => {
    setState(EDIT_STATE);
  };
  const addHandler = () => {
    setState(ADD_STATE);
  };

  const resetHandler = (event) => {
    event.preventDefault();
    setState(NO_STATE);
  };

  const saveHandler = async (event) => {
    event.preventDefault();
    const { name } = event.target;
    console.log('kasdjkjdskg', name);
    if (state === EDIT_STATE) {
      dispatch(sagaChangeCategoryAC());
    } else if (state === ADD_STATE) {
      dispatch(sagaAddCategoryAC({ name }));
    }
  };

  useEffect(() => {
    dispatch(sagaGetCategoriesAC());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <div className={styles.categories}>
          {categories?.map((category, index) => (
            <div key={category.id} onClick={selectCategory} tabIndex={index} data-id={category.id}>
              {category.name}
            </div>
          ))}
        </div>
        {currentCategory && (
          <>
            {state !== NO_STATE && (
              <form onSubmit={saveHandler} className={styles.nameInputContainer}>
                <input type='text' name='name' />
                <button>Сохранить</button>
                <button onClick={resetHandler}>Отмена</button>
              </form>
            )}

            <div className={styles.buttons}>
              <button onClick={addHandler}>Добавить</button>
              <button onClick={editHandler}>Изменить</button>
              <button>Удалить</button>
            </div>
          </>
        )}
      </div>
      <div>
        {currentCategory &&
          currentCategory.Subcategories.map((subcategory, index) => (
            <div
              key={subcategory.id}
              // onClick={(event) => {
              //   event.target.setAttribute('focus', true);
              // }}
              tabIndex={index}
              data-id={subcategory.id}
            >
              {subcategory.name}
            </div>
          ))}
      </div>
    </div>
  );
}
