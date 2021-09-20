import React, { useEffect, useState } from 'react';
import styles from './Reservations.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as reservationsAC from '../../../redux/actionCreators/reservationsAC'
import DoneOrder from './DoneReservations'
import ToCheckOrder from './ToCheckReservation'


function Reservations() {
  const [completedList, setCompletedList] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:1234/api/orders')
      .then(res => res.json())
      .then(data => {
        const allOrders = [...data.orders];
        const idToDelete = allOrders.map(el => el['Reservation.id'])
        const allReservations = [...data.reservations];
        const reservationsWithoutOrders = allReservations.filter(reservation => {
          if (!idToDelete.includes(reservation.id)) {
            return true
          }
        })

        console.log('reservationsWithoutOrders******', reservationsWithoutOrders);
        // const ordersToRender = 
        // dispatch(reservationsAC.getReservationsAC(allOrders))
      })
    // здесь fetch (сага) в базу для получения списка заказов (причем только тех, что в обработке)
  })

  const finishedOrders = useSelector(state => state.ordersReducer.orders?.filter(el => el['State.id'] === 2))
  const toCheckOrders = useSelector(state => state.ordersReducer.orders?.filter(el => el['State.id'] === 1 || el['State.id'] === 6));

  return (
    <div className={styles.container}>

      <h2>Заказы, ожидающие обработки </h2>
      {toCheckOrders.length ? <ul className="uk-list uk-list-striped"> {toCheckOrders.map((order) => <ToCheckOrder key={order.id} order={order} />)} </ul> : null}

      {completedList ? <button className='uk-button uk-button-default' onClick={() => setCompletedList(prev => !prev)}> Скрыть список завершенных(обработанных) заказов</button> : <button className='uk-button uk-button-default' onClick={() => setCompletedList(prev => !prev)}>Вывести список завершенных(обработанных) заказов</button>}
      <br />
      {completedList && finishedOrders.length ? <ul className="uk-list uk-list-striped"> {finishedOrders.map((order) => <DoneOrder key={order.id} order={order} />)}</ul> : null}
      <br />
      <button className='uk-button uk-button-default' onClick={() => history.goBack()}>Назад</button>

    </div >
  );
}

export default Reservations;
