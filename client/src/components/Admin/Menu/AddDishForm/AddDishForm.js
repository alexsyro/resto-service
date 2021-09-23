import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_DISHES } from '../../../../redux/actionTypes/actionType';
import { useParams } from 'react-router';

const { REACT_APP_URL } = process.env;

function AddDishForm() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [img, setImg] = useState(null);
  const measures = useSelector((state) => state.dishesReducer.measures);

  const fileUpload = (event) => {
    const [file] = event.target.files;
    if (file.size > 1000000) {
      alert(`Слишком большой файл, вы загрузили ${file.size / 1000} кб, максимум 1 МБ`);
      event.target.value = '';
    } else {
      let url = URL.createObjectURL(file);
      setImg(url);
    }
  };

  const addDish = (e) => {
    e.preventDefault();
    const formData = new FormData(); //делает то что отменяет prevent default но делаем
    //  это для того чтобы отправить данные в нужном формате

    const [file] = e.target.file.files;
    const { method, name, description, kcal, portionSize, price, measureId } = e.target;
    console.log(measureId.value, 'TARGET');
    formData.append('file', file);
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('kcal', kcal.value);
    formData.append('portionSize', portionSize.value);
    formData.append('categoryId', categoryId);
    formData.append('measureId', measureId.value);
    formData.append('price', price.value);

    fetch(`${REACT_APP_URL}api/menu`, {
      method,
      credentials: 'include',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_DISHES, action: data }))
      .catch((err) => alert(err.message));
  };

  return (
    <form onSubmit={addDish} method='POST' name='AddDishForm'>
      <input type='text' name='name' placeholder='Введите название блюда' required />
      <input type='text' name='description' placeholder='Добавьте описание' required />
      <input type='number' name='kcal' placeholder='Введите  kcal' />
      <select name='measureId'>
        {measures.map((measure) => (
          <option value={measure.id}>{measure.type}</option>
        ))}
      </select>
      <input type='number' name='portionSize' placeholder='Введите размер порции' required />
      <input type='number' name='price' placeholder='Введите цену' required />
      <div>
        <img src={img} width='250' height='200' alt='IMG' />
        <input onChange={fileUpload} type='file' name='file' />
      </div>
      <button type='submit'>Добавить</button>
    </form>
  );
}

export default AddDishForm;
