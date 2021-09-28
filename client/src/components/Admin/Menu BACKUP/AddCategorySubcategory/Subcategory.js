import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sagaAddSubcategoryAC,
  sagaChangeSubcategoryAC,
  sagaDeleteSubcategoryAC,
  sagaSetCurrentSubcategoryAC,
} from '../../../../redux/actionCreators/categoriesAC';
import styles from './AddCategorySubcategory.module.scss';

const NO_STATE = 0;
const EDIT_STATE = 1;
const ADD_STATE = 2;

export default function AddCategorySubcategory() {
  const dispatch = useDispatch();
  const { currentCategory, currentSubcategory } = useSelector((state) => state.categoryReducer);
  const [state, setState] = useState(NO_STATE);

  const selectSubcategory = (event) => {
    const { id } = event.target.dataset;
    dispatch(sagaSetCurrentSubcategoryAC({ id }));
  };

  const editHandler = () => {
    setState(EDIT_STATE);
  };

  const addHandler = () => {
    setState(ADD_STATE);
  };
  const deleteHandler = () => {
    dispatch(sagaDeleteSubcategoryAC({ id: currentSubcategory.id }));
  };

  const resetHandler = (event) => {
    event.preventDefault();
    setState(NO_STATE);
  };

  const saveHandler = async (event) => {
    event.preventDefault();
    const { name } = event.target;
    if (state === EDIT_STATE) {
      dispatch(sagaChangeSubcategoryAC({ id: currentSubcategory.id, name: name.value }));
    } else if (state === ADD_STATE) {
      dispatch(sagaAddSubcategoryAC({ category: currentCategory, name: name.value }));
    }
    setState(NO_STATE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <div>
          <h4>Выберите подкатегорию:</h4>
          <h4>{currentSubcategory ? currentSubcategory.name : 'Не выбрано'}</h4>
          <div className={styles.subcategories}>
            {currentCategory &&
              currentCategory.Subcategories &&
              currentCategory.Subcategories.map((subcategory, index) => (
                <div
                  onClick={selectSubcategory}
                  key={subcategory.id}
                  tabIndex={index}
                  data-id={subcategory.id}
                >
                  {subcategory.name}
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
            <button onClick={editHandler} disabled={!currentSubcategory}>
              Изменить
            </button>
            <button onClick={deleteHandler} disabled={!currentSubcategory}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
