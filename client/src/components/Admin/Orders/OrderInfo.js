import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as ordersAC from '../../../redux/actionCreators/ordersAC';

const { REACT_APP_URL } = process.env;

function OrderInfo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [selectValue, setSelectValue] = useState(id);

  const allOrders = useSelector((state) => state.ordersReducer.orders);
  const reservationsToSelect = useSelector((state) => state.reservationReducer.reservations);
  const currentOrder = allOrders.find((order) => order.id === +id);

  const handlerSave = () => {
    // console.log(inputReservationSelect);
    const updateOrder = {
      id: currentOrder.id,
      ReservationId: +selectValue,
    };
    fetch(`${REACT_APP_URL}api/orders/edit/${currentOrder.id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateOrder),
    })
      .then((res) => res.json())
      .then(console.log);

    dispatch(ordersAC.updateOrderAC(updateOrder));
    history.goBack();
  };

  return (
    <div>
      <div className='uk-card uk-card-primary uk-card-body'>
        <h3 className='uk-card-title'>order ID: #{currentOrder?.id}</h3>

        {/* <div className="uk-margin">
          <input ref={inputReservationId} className="uk-input" type="number" defaultValue={currentOrder['Reservation.id']} placeholder="номер резервирования столика" />
        </div> */}

        <div className='uk-margin'>
          <label htmlFor='reservation-select'>Выберите нужное резервирование:</label>
          <select
            className='.uk-select'
            defaultValue={id}
            id='reservation-select'
            onChange={(event) => setSelectValue(event.target.value)}
          >
            {reservationsToSelect.map((el) => (
              <option
                value={el.id}
                key={el['id']}
              >{`номер резерва:${el.id}, номер столика: ${el['Table.number']}`}</option>
            ))}
          </select>
        </div>

        <button onClick={() => history.goBack()} className='uk-button uk-button-default uk-margin'>
          Назад
        </button>

        <button onClick={handlerSave} className='uk-button uk-button-default uk-margin-left'>
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}

export default OrderInfo;
