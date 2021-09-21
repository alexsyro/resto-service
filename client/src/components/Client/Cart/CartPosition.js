import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {cartChangeQuantityAC, cartRemovePositionAC} from '../../../redux/actionCreators/cartAC'

export default function CartPosition({ position }) {
  const [quantity, setQuantity] = useState(position.quantity);
  const dispatch = useDispatch();

  const changeQuantity = (event) => {
    // Reducer на изменение количества блюд в корзине
    event.preventDefault();
    const { value } = event.target;
    setQuantity(value);
    const payload = {
      quantity:value,
      id:position.id,
    }
    dispatch(cartChangeQuantityAC(payload))
  }; 
  const removeItem = (event) => {
    event.preventDefault();
    const payload = {
      id:position.id,
    }
    dispatch(cartRemovePositionAC(payload))
  }; 

  return (
    <tr>
      <td>{position.name}</td>
      <td>
        <input
          name='quantity'
          onChange={changeQuantity}
          type='number'
          defaultValue='1'
          value={quantity}
          min='1'
          max='10'
        />
      </td>
      <td><button onClick={removeItem}>Удалить</button></td>
      <td>{position.price}</td>
      <td>{Number(quantity) * Number(position.price)}</td>
    </tr>
  );
}
