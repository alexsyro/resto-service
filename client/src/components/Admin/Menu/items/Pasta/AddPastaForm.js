import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_PASTA } from '../../../../../redux/actionTypes/actionType'


function AddPastaForm() {

  const dispatch = useDispatch();

  const addPasta = (e) => {
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
      .then(data => dispatch({ type: GET_PASTA, action: data }))
  };

  return (
    <form onSubmit={addPasta} action="http://localhost:1234/addpasta" method="POST" name="addPastaForm" >
      <input type="text" name="name" placeholder="Введите название блюда" />
      <input type="text" name="description" placeholder="Добавьте описание" />
      <input type="text" name="kcal" placeholder="Введите  kcal" />
      <input type="text" name="portionSize" placeholder="Введите размер порции" />
      <input type="text" name="price" placeholder="Введите цену" />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddPastaForm;
