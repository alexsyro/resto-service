import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {cartChangeQuantity} from '../../../redux/actionCreators/cartAC'

export default function CartPosition({ position }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changeQuantity = (event) => {
    // Reducer на изменение количества блюд в корзине
    event.preventDefault();
    const { value } = event.target;
    setQuantity(value);
    dispatch(cartChangeQuantity(value))
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
          // value={quantity}
          min='1'
          max='10'
        />
      </td>
      <td>{position.price}</td>
      <td>{Number(quantity) * Number(position.price)}</td>
    </tr>
  );
}
