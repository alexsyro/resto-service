import { useState } from 'react';

export default function CartPosition({ position }) {
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = (event) => {
    // Reducer на изменение количества блюд в корзине
    event.preventDefault();
    const { value } = event.target;
    setQuantity(value);
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
