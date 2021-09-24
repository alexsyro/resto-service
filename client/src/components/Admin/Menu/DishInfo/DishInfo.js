import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { UPD_DISH } from '../../../../redux/actionTypes/actionType';
import styles from './DishInfo.module.scss';

const { REACT_APP_URL } = process.env;

function DishInfo() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { dishId } = useParams();

  const dishes = useSelector((state) => state.dishesReducer.dishes);
  console.log(dishes);
  const currentDish = dishes.find((item) => item.id === +dishId);
  console.log(currentDish, 'currentDish');

  const handlerSave = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const { name, description, kcal, portionSize, price } = event.target;

    const updateDishCard = {
      id: currentDish.id,
      name: name.value,
      description: description.value,
      kcal: kcal.value,
      portionSize: portionSize.value,
      price: price.value,
    };
    console.log('UPDATED', updateDishCard);
    dispatch({ type: UPD_DISH, payload: updateDishCard });
    formData.append('updatedDish', updateDishCard);

    fetch(`${REACT_APP_URL}api/menu/${dishId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateDishCard),
    }).then(() => {
      alert('ИЗМЕНЕНО');
      history.goBack();
    }); //cделать редирект на главную страницу с блюдами
  };

  return (
      <div className={styles.form__block}>
        <form onSubmit={handlerSave} className={styles.form}>
          <fieldset className="uk-fieldset">

            <legend className="uk-legend" style={{ color: 'white' }}>Редактирование блюда</legend>

            <div className="uk-margin">
              <label htmlFor="name">Название:</label>
              <input className="uk-input" type='text' name='name' defaultValue={currentDish?.name} />
            </div>
            <div className="uk-margin">
              <label htmlFor="description">Состав:</label>
              <input className="uk-input" type='text' name='description' defaultValue={currentDish?.description} placeholder='Добавьте описание'  />
            </div>
            <div className="uk-margin">
              <label htmlFor="kcal">Ккал:</label>
              <input className="uk-input" type='number' name='kcal' placeholder='Введите  kcal' defaultValue={currentDish?.kcal} />
            </div>
            <label htmlFor="portionSize">Объём порции:</label>
            <div className={`uk-margin ${styles.double__input}`}>
              <input className="uk-input" type='number' name='portionSize' placeholder='Введите размер порции' defaultValue={currentDish?.portionSize} />
              <select className={`uk-select ${styles.select__input}`} name='measureId'>

              </select>
            </div>
            <div className="uk-margin">
              <label style={{color: 'white'}} htmlFor="price">Цена:</label>
              <input className="uk-input" type='number' name='price' placeholder='Введите цену' defaultValue={currentDish?.price} />
            </div>
            <div className={styles.center}>
              <button className={`uk-button uk-button-primary ${styles.submit__btn}`} type='submit'>Сохранить</button>

            </div>

          </fieldset>
          <button type='button' onClick={() => history.goBack()} className={`uk-button uk-button-default ${styles.back_btn}`}>
            Назад
          </button>
        </form>
      </div>
  );
}

export default DishInfo;
