import React, { useRef } from 'react'
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// import * as ordersAC from '../../../redux/actionCreators/ordersAC'

const { REACT_APP_URL } = process.env;

function ReservationInfo() {
  const history = useHistory();
  const { id } = useParams();

  const allOrders = useSelector((state) => state.ordersReducer.orders);
  const currentOrder = allOrders.find((order) => order.id === +id);
  console.log(currentOrder, 'currentOrder')


  const inputClientName = useRef(null)
  const inputClientPhone = useRef(null)
  const inputTable = useRef(null)
  const inputTime = useRef(null)
  const inputQuantity = useRef(null)


  const handlerSave = () => {
    // логика работы с заказом
    const updateOrder = {
      id: currentOrder.id,
      inputClientName: inputClientName.current.value,
      inputClientPhone: inputClientPhone.current.value,
      inputTable: inputTable.current.value,
      inputTime: inputTime.current.value,
      inputQuantity: inputQuantity.current.value,
    }
    console.log(updateOrder);

    fetch(`${REACT_APP_URL}api/orders/edit`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateOrder)
    })
      .then(res => res.json())
      .then(console.log)

    // dispatch(ordersAC.updateOrderAC(updateOrder))
  }

  return (
    <div>
      <div className="uk-card uk-card-primary uk-card-body">
        <h3 className="uk-card-title">order ID: #{currentOrder?.id}</h3>

        <div className="uk-margin">
          <input ref={inputClientName} className="uk-input" type="text" defaultValue={currentOrder['Client.name']} placeholder="name" />
        </div>

        <div className="uk-margin">
          <input ref={inputClientPhone} className="uk-input" type="text" defaultValue={currentOrder['Client.phone']} placeholder="phone" />
        </div>

        <div className="uk-margin">
          <input ref={inputTable} className="uk-input" type="text" defaultValue={currentOrder['Reservation.table_id']} placeholder="table" />
        </div>

        <div className="uk-margin">
          <input ref={inputTime} className="uk-input" type="text" defaultValue={currentOrder['Reservation.date_time']} placeholder="time" />
        </div>

        <div className="uk-margin">
          <input ref={inputQuantity} className="uk-input" type="number" defaultValue={currentOrder['OrderPositions.quantity']} placeholder="quantity" />
        </div>



        <button onClick={() => history.goBack()} className="uk-button uk-button-default uk-margin">Назад</button>

        <button onClick={handlerSave} className="uk-button uk-button-default uk-margin-left">Сохранить изменения</button>
      </div>
    </div>
  );
}



export default ReservationInfo;
