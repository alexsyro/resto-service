import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartAddPositionAC } from '../../../redux/actionCreators/cartAC';
import styles from './Dish.module.scss'

function Dish({ dish }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const dishes = useSelector((state) => state.dishesReducer.dishes);

  let { data } = dish['File.data'];
  let base64 = new Buffer(data).toString('base64');
  let type = dish['File.type'];

  const addToCart = () => {
    const currentDish = dishes.find((item) => item.id === +dish.id);
    const payload = {
      id: currentDish.id,
      name: currentDish.name,
      price: currentDish.price,
    };
    dispatch(cartAddPositionAC(payload));
  };

  return (
    <div className={styles.container}>
      <img src={`data:${type};base64,${base64}`} width='250' height='200' alt='IMG' />
      <p>{dish.name}</p>
      <p>{dish.description}</p>
      <p>Ккал: {dish.kcal}</p>
      <p>Размер порции: {dish.portionSize}</p>
      <p> Цена: {dish.price}</p>
      {user?.isAuth && (
        <button onClick={addToCart} type='text'>
          Добавить в корзину
        </button>
      )}
    </div>
  );
}

export default Dish;
