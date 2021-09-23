import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { UPD_DISH } from '../../../../redux/actionTypes/actionType';

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
    <>
      <form onSubmit={handlerSave}>
        <div className='uk-card uk-card-primary uk-card-body'>
          <div className='uk-margin'>
            <input
              name='name'
              className='uk-input'
              type='text'
              defaultValue={currentDish?.name}
              placeholder='Name'
            />
          </div>

          <div className='uk-margin'>
            <input
              className='uk-input'
              name='description'
              type='text'
              defaultValue={currentDish?.description}
              placeholder='Description'
            />
          </div>

          <div className='uk-margin'>
            <input
              className='uk-input'
              type='text'
              name='kcal'
              defaultValue={currentDish?.kcal}
              placeholder='Kcal'
            />
          </div>

          <div className='uk-margin'>
            <input
              className='uk-input'
              type='text'
              name='portionSize'
              defaultValue={currentDish?.portionSize}
              placeholder='PortionSize'
            />
          </div>

          <div className='uk-margin'>
            <input
              className='uk-input'
              type='text'
              name='price'
              defaultValue={currentDish?.price}
              placeholder='Price'
            />
          </div>
          <button className='uk-button uk-button-default uk-margin-left'>Сохранить</button>
        </div>
      </form>
      <button onClick={() => history.goBack()} className='uk-button uk-button-default uk-margin'>
        Назад
      </button>
    </>
  );
}

export default DishInfo;
