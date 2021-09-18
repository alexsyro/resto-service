import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_DESSERTS } from '../../../../../redux/actionTypes/actionType'


function AddDessertForm() {

  const dispatch = useDispatch();

  const addDessert = (e) => {
    e.preventDefault();

    const { action, method, name, description, kcal, portionSize, price } = e.target;
    fetch(action, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: name.value,
        description: description.value,
        kcal: kcal.value,
        portionSize: portionSize.value,
        price: price.value
      }
    })
      .then(res => res.json())
      .then(data => dispatch({ type: GET_DESSERTS, action: data }))
  };

  return (
    <form onSubmit={addDessert} action="http://localhost:1234/adddesserts" method="POST" name="addDesertForm" >
      <input type="text" name="name" placeholder="Введите название блюда" />
      <input type="text" name="description" placeholder="Добавьте описание" />
      <input type="text" name="kcal" placeholder="Введите  kcal" />
      <input type="text" name="portionSize" placeholder="Введите размер порции" />
      <input type="text" name="price" placeholder="Введите цену" />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddDessertForm;
