import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_DISHES } from '../../../../redux/actionTypes/actionType'
import { useParams } from 'react-router';


function AddDishForm() {

  const dispatch = useDispatch();
  const {categoryName, categoryId } = useParams()

  const addDish = (e) => {
    e.preventDefault();

    const { method, name, description, kcal, portionSize, price } = e.target;
    fetch(`/menu/add/${categoryName}/${categoryId}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: name.value,
        description: description.value,
        kcal: kcal.value,
        portionSize: portionSize.value,
        price: price.value,
        categoryId: categoryId,
      }
    })
      .then(res => res.json())
      .then(data => dispatch({ type: GET_DISHES, action: data }))
  };

  return (
    <form onSubmit={addDish} method="POST" name="AddDishForm" >
      <input type="text" name="name" placeholder="Введите название блюда" />
      <input type="text" name="description" placeholder="Добавьте описание" />
      <input type="text" name="kcal" placeholder="Введите  kcal" />
      <input type="text" name="portionSize" placeholder="Введите размер порции" />
      <input type="text" name="price" placeholder="Введите цену" />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddDishForm;
