import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_DISHES } from '../../../../redux/actionTypes/actionType'
import { useParams } from 'react-router';


function AddDishForm() {

  const dispatch = useDispatch();
  const { categoryId } = useParams()
  const measures = useSelector((state) => state.dishesReducer.measures);

  const addDish = (e) => {
    e.preventDefault();

    const formData = new FormData(); //делает то что отменяет prevent default но делаем 
  //  это для того чтобы отправить данные в нужном формате
    const [file] = e.target.file.files;
    const { method, name, description, kcal, portionSize, price , measureId} = e.target;
    console.log(measureId.value,'TARGET')
    formData.append('file', file);
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('kcal', kcal.value);
    formData.append('portionSize', portionSize.value);
    formData.append('categoryId', categoryId);
    formData.append('measureId', measureId.value);
    formData.append('price', price.value);

    
    fetch(`http://localhost:1234/api/menu`, {
      method,
      body: formData,
    })
      .then(res => res.json())
      .then(data => dispatch({ type: GET_DISHES, action: data }))
  };

  return (
    <form onSubmit={addDish} method="POST" name="AddDishForm" >
      <input type="text" name="name" placeholder="Введите название блюда" />
      <input type="text" name="description" placeholder="Добавьте описание" />
      <input type="text" name="kcal" placeholder="Введите  kcal" />
      <select name="measureId"> 
       {measures.map((measure)=> <option value={measure.id}>{measure.type}</option> )}
      </select>
      <input type="text" name="portionSize" placeholder="Введите размер порции" />
      <input type="text" name="price" placeholder="Введите цену" />
      <input type='file' name='file' />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddDishForm;
