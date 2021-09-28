import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sagaAddCategoryAC,
  sagaChangeCategoryAC,
  sagaSetCurrentCategoryAC,
  sagaDeleteCategoryAC,
} from '../../../../redux/actionCreators/categoriesAC';
import styles from './AddCategorySubcategory.module.scss';

const NO_STATE = 0;
const EDIT_STATE = 1;
const ADD_STATE = 2;

export default function Category() {
  const dispatch = useDispatch();
  const { categories, currentCategory } = useSelector((state) => state.categoryReducer);
  const [state, setState] = useState(NO_STATE);

  const selectCategory = (event) => {
    const { id } = event.target.dataset;
    dispatch(sagaSetCurrentCategoryAC({ id }));
  };

  const editHandler = () => {
    setState(EDIT_STATE);
  };

  const addHandler = () => {
    setState(ADD_STATE);
  };
  const deleteHandler = () => {
    dispatch(sagaDeleteCategoryAC({ id: currentCategory.id }));
  };

  const resetHandler = (event) => {
    event.preventDefault();
    setState(NO_STATE);
  };

  const saveHandler = async (event) => {
    event.preventDefault();
    const { name } = event.target;
    if (state === EDIT_STATE) {
      dispatch(sagaChangeCategoryAC({ name: name.value }));
    } else if (state === ADD_STATE) {
      dispatch(sagaAddCategoryAC({ name: name.value }));
    }
    setState(NO_STATE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <div>
          <h4>Выберите категорию:</h4>
          <h4>{currentCategory ? currentCategory.name : 'Не выбрано'}</h4>
          <div className={styles.categories}>
            {categories &&
              categories.map((category, index) => (
                <div key={category.id} onClick={selectCategory} tabIndex={index} data-id={category.id}>
                  {category.name}
                </div>
              ))}
          </div>

          {state !== NO_STATE && (
            <form onSubmit={saveHandler} className={styles.nameInputContainer}>
              <input type='text' name='name' />
              <button>Сохранить</button>
              <button onClick={resetHandler}>Отмена</button>
            </form>
          )}

          <div className={styles.buttons}>
            <button onClick={addHandler}>Добавить</button>
            <button onClick={editHandler} disabled={!currentCategory}>
              Изменить
            </button>
            <button onClick={deleteHandler} disabled={!currentCategory}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
