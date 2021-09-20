import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STAFF } from '../../../redux/actionTypes/actionType';

function AddWorkerForm() {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);

  const posts = useSelector((state) => state.staffReducer.positions); 
  console.log(posts,'POSTS')

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

  const addWorker = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const [file] = e.target.file.files;
    const { action, method, name, position, login, password, phone, postId } = e.target;
    formData.append('file', file);
    formData.append('name', name.value);
    formData.append('position', position.value);
    formData.append('login', login.value);
    formData.append('password', password.value);
    formData.append('phone', phone.value);
    formData.append('postId', postId.value);
    fetch(action, {
      method,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_STAFF, action: data }));
  };

  return (
    <form
      onSubmit={addWorker}
      action='http://localhost:1234/api/staff/new'
      method='POST'
      name='addWorkerForm'
    >
      <input type='text' name='name' placeholder='Имя сотрудника' />
      <select name="postId"> 
       {posts.map((post)=> <option value={post.id}>{post.name}</option> )}
      </select>
      <input type='text' name='position' placeholder='Должность' />
      <input type='text' name='phone' placeholder='Телефон' />
      <input type='text' name='login' placeholder='Логин' />
      <input type='text' name='password' placeholder='Пароль' />
      <div>
        <img src={img} width='250' height='200' alt='IMG' />
        <input onChange={fileUpload} type='file' name='file' />
      </div>
      <button type='submit'>Добавить</button>
    </form>
  );
}

export default AddWorkerForm;
