import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DEL_DISH } from '../../../../redux/actionTypes/actionType';

function Dish({ dish }) {

  let { data } = dish['File.data'];
  let base64 = new Buffer(data).toString('base64');
  let type = dish['File.type'];

  const dispatch = useDispatch();

  const deleteDish = () => {
    dispatch({ type: DEL_DISH, payload: dish.id });
    // console.log('delete')
    fetch(`http://localhost:1234/api/menu/${dish.id}`, {
      method: 'DELETE',
    }).then(console.log);
  };

  return (
    <div>
      <img src={`data:${type};base64,${base64}`} width='250' height='200' alt='IMG' />
      <p>{dish.name}</p>
      <p>{dish.description}</p>
      <p>{dish.kcal}</p>
      <p>{dish.portionSize}</p>
      <p>{dish.price}</p>
      <Link to={`/menu/edit/${dish.name}/${dish.id}`} className='uk-button uk-button-default'>
        <button>Редактировать</button>
      </Link>
      <button onClick={deleteDish}>Удалить</button>
    </div>
  );
}

export default Dish;
