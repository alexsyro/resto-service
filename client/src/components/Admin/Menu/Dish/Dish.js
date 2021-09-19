import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { DEL_DISH } from '../../../../redux/actionTypes/actionType'

function Dish({ dish }) {

  const dispatch = useDispatch();

  const deleteDish = () => {    
    dispatch({ type: DEL_DISH, payload: dish.id })
    // console.log('delete')
    fetch(`http://localhost:1234/api/menu/edit/${dish.name}/${dish.id}`, {
      method: 'DELETE',
    })
    .then(console.log)
  }

  return (
    <div>
      <p>{dish.name}</p>
      <p>{dish.description}</p>
      <p>{dish.kcal}</p>
      <p>{dish.portionSize}</p>
      <p>{dish.price}</p>
      <Link to={`/menu/edit/${dish.name}/${dish.id}`} className="uk-button uk-button-default">
        <button>Редактировать</button>
      </Link>
      <button onClick={deleteDish}>Удалить</button>
    </div>
  );
}

export default Dish;
