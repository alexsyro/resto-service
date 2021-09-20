import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartAddPositionAC } from '../../../redux/actionCreators/cartAC'

function Dish({ dish }) {

  let { data } = dish['File.data'];
  let base64 = new Buffer(data).toString('base64');
  let type = dish['File.type'];

  const dispatch = useDispatch();

  const dishes = useSelector((state) => state.dishesReducer.dishes);

  const addToCart = () => {
    const currentDish = dishes.find((item) => item.id === +dish.id);
    // console.log(currentDish, 'currentDish');
    const payload = {
      id: currentDish.id,
      name: currentDish.name,
      price: currentDish.price,
    }
    dispatch(cartAddPositionAC(payload))
  }


  return (
    <div>
      <img src={`data:${type};base64,${base64}`} width='250' height='200' alt='IMG' />
      <p>{dish.name}</p>
      <p>{dish.description}</p>
      <p>{dish.kcal}</p>
      <p>{dish.portionSize}</p>
      <p>{dish.price}</p>
      <button onClick={addToCart} type="text">Добавить в корзину</button>
    </div>
  );
}

export default Dish;
