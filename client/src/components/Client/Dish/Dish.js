import React from 'react';

function Dish({ dish }) {

  let { data } = dish['File.data'];
  let base64 = new Buffer(data).toString('base64');
  let type = dish['File.type'];
  console.log('DDDDDDDDDDDDDDDIIIIIIIIIIIIIIIIIIIIIISSSSSSSSSSSSSSSSHHHHHHHHHHHH', Object.keys(dish));


  return (
    <div>
      <img src={`data:${type};base64,${base64}`} width='250' height='200' alt='IMG' />
      <p>{dish.name}</p>
      <p>{dish.description}</p>
      <p>{dish.kcal}</p>
      <p>{dish.portionSize}</p>
      <p>{dish.price}</p>
    </div>
  );
}

export default Dish;
