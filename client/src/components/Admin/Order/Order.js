import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'

function Order() {
  const { id } = useParams()
  const history = useHistory()
  console.log('id params:  ', id);
  const handleClick = () => {

  }
  // ищем нужный заказ для редактирования и отображения
  // const currentOrder = state.orders.find(order => order.id === +id)
  return (
    <>
      <hr />
      <li>
        тест
        {/* <p>Клиент: {currentOrder?.client}</p> */}
        {/* <p>Номер стола:  {currentWorm?.table}</p> */}
        {/* и так далее */}
        <button onClick={() => history.goBack()} className="uk-button uk-button-default uk-margin">Назад!</button>
      </li>
    </>
  );
}

export default Order;
