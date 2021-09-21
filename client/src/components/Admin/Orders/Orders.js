import React, { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as ordersAC from '../../../redux/actionCreators/ordersAC'
import DoneOrder from './DoneOrder'
import ToCheckOrder from './ToCheckOrder'


function Orders() {
  const [completedList, setCompletedList] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()
  function myDateParse(rawString) {
    let arr = rawString.split(/\D/);
    arr[6] = arr[6].substr(0, 3); // Microseconds to milliseconds
    let months = {
      '01': 'Январь',
      '02': 'Февраль',
      '03': 'Март',
      '04': 'Апрель',
      '05': 'Май',
      '06': 'Июнь',
      '07': 'Июль',
      '08': 'Август',
      '09': 'Сентябрь',
      '10': 'Октябрь',
      '11': 'Ноябрь',
      '12': 'Декабрь'
    }
    return {
      hours: arr[3],
      minutes: arr[4],
      day: arr[2],
      month: months[arr[1]],
      year: arr[0],
    }
  }
  useEffect(() => {
    fetch('http://localhost:1234/api/orders')
      .then(res => res.json())
      .then(data => {
        const allOrders = [...data.orders];

        const ordersForState = allOrders.map(el => {
          return { ...el, timeFormat: myDateParse(el['Reservation.date_time']) }
        });
        dispatch(ordersAC.getOrdersAC(ordersForState))
      })
    // здесь fetch (сага) в базу для получения списка заказов (причем только тех, что в обработке)
  })

  const finishedOrders = useSelector(state => state.ordersReducer.orders?.filter(order => [2, 6, 7].includes(order['state_id'])));
  const toCheckOrders = useSelector(state => state.ordersReducer.orders?.filter(order => [1, 4, 5].includes(order['state_id'])));
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

export default Orders;
