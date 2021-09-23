import { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  cartDecrQuantityAC,
  cartIncrQuantityAC,
  cartRemovePositionAC,
  cartUpdateTotalAC,
} from '../../../redux/actionCreators/cartAC';
import styles from './CartPosition.module.scss';

export default function CartPosition({ position }) {
  const [quantity, setQuantity] = useState(position.quantity);
  const dispatch = useDispatch();

  const incrementQuantity = () => {
    if (quantity <= 100) {
      setQuantity(quantity + 1);
      const payload = {
        id: position.id,
      };
      dispatch(cartIncrQuantityAC(payload));
      dispatch(cartUpdateTotalAC());
    } else {
      alert('Вы не можете установить количество блюд больше 100');
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const payload = {
        id: position.id,
      };
      dispatch(cartDecrQuantityAC(payload));
      dispatch(cartUpdateTotalAC());
    } else {
      alert('Хоспади, там есть кнопка удалить. Жмакните туда.');
    }
  };

  const removeItem = () => {
    const payload = {
      id: position.id,
    };
    dispatch(cartRemovePositionAC(payload));
    dispatch(cartUpdateTotalAC());
  };

  return (
    // <div className={styles.table}>
    <tr>
      <td>{position.name}</td>
      <td>
        <div className={styles.quantityContainer}>
          <button className={styles.minus__btn} onClick={decrementQuantity}> - </button>
          {/* <input
          className={styles.scale}
          name='quantity'
          onChange={changeQuantity}
          type='number'
          defaultValue='1'
          value={quantity}
          min='1'
          max='10'
        /> */}
          <p>{quantity}</p>
          <button className={styles.plus__btn} onClick={incrementQuantity}> + </button>
        </div>
      </td>
      <td>
        <button className={styles.delete} onClick={removeItem}>
          Удалить
        </button>
      </td>
      <td>{position.price}</td>
      <td>{Number(quantity) * Number(position.price)}</td>
    </tr>
    // </div>
  );
}
