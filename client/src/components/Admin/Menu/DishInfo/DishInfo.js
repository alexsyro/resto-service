import React, { useRef } from 'react'
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { UPD_DISH } from '../../../../redux/actionTypes/actionType'


function DishInfo() {

  const dispatch = useDispatch();

  const history = useHistory();
  const {dishName, dishId } = useParams();

  const dishes =  useSelector((state) => state.dishesReducer.dishes);
  console.log(dishes);
  const currentDish = dishes.find((item) => item.id === +dishId);
  console.log(currentDish, 'currentDish')


  const inputName = useRef(null)
  const inputDescription = useRef(null)
  const inputKcal = useRef(null)
  const inputPortionSize = useRef(null)
  const inputPrice = useRef(null)


  const handlerSave = () => {

    const updateDishCard = {
      id: currentDish.id,
      inputName: inputName.current.value,
      inputDescription: inputDescription.current.value,
      inputKcal: inputKcal.current.value,
      inputPortionSize: inputPortionSize.current.value,
      inputPrice: inputPrice.current.value,
    }
    console.log(updateDishCard);
    dispatch({ type: UPD_DISH, payload: updateDishCard })

    fetch(`http://localhost:1234/api/menu/edit/${dishName}/${dishId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateDishCard)
    })
    .then(console.log('update')) //cделать редирект на главную страницу с блюдами
  }
 

  return (
    <div>
      <div className="uk-card uk-card-primary uk-card-body">
       
        <div className="uk-margin">
          <input ref={inputName} className="uk-input" type="text" defaultValue={currentDish?.name} placeholder="Name" />
        </div>

        <div className="uk-margin">
          <input ref={inputDescription} className="uk-input" type="text" defaultValue={currentDish?.description} placeholder="Description" />
        </div>

        <div className="uk-margin">
          <input ref={inputKcal} className="uk-input" type="text" defaultValue={currentDish?.kcal} placeholder="Kcal" />
        </div>

        <div className="uk-margin">
          <input ref={inputPortionSize} className="uk-input" type="text" defaultValue={currentDish?.portionSize} placeholder="PortionSize" />
        </div>

        <div className="uk-margin">
          <input ref={inputPrice} className="uk-input" type="text" defaultValue={currentDish?.price} placeholder="Price" />
        </div>

        <button onClick={() => history.goBack()} className="uk-button uk-button-default uk-margin">Назад</button>

        <button onClick={handlerSave} className="uk-button uk-button-default uk-margin-left">Сохранить</button>
      </div>
    </div>
  );
}

export default DishInfo;
