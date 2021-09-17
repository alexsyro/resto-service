import React from 'react';
import { useHistory } from 'react-router-dom'
function Menu(props) {

  const history = useHistory()

  return (
    <>
      <div >Салаты</div>
      <div >Пицца</div>
      <div >Cупы</div>
      <div >Паста</div>
      <div >Десерты</div>
      <div >Коктейли</div>
      <button onClick={() => history.goBack()}>Назад</button>

    </>
  );
}

export default Menu;
