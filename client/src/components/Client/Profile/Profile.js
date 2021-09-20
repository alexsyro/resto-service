import React, { useState } from 'react';

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  let user;

  return (
    <div>
      <div className='entry'>
        <p>Полное имя</p>
        {editMode ? <input type='text' name='name' /> : <p>{user.name}</p>}
      </div>
      <div>
        <p>Почта</p>
        <input type='email' name='email' />
      </div>
      <div>
        <p>Телефон</p>
        <input type='tel' name='phone' />
      </div>
      <div>
        <p>Пароль</p>
        <input type='password' name='password' />
      </div>
    </div>
  );
}
