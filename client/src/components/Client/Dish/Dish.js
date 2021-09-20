import React from 'react';

function Dish({ dish }) {
  return (
    <div>
      <p>{dish.name}</p>
      <p>{dish.description}</p>
      <p>{dish.kcal}</p>
      <p>{dish.portionSize}</p>
      <p>{dish.price}</p>
    </div>
  );
}

export default Dish;
