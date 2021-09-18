import React, { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import * as ordersAC from '../../../redux/actionCreators/ordersAC'
import DoneOrder from './DoneOrder'
import ToCheckOrder from './ToCheckOrder'


function Orders() {
  const [completedList, setCompletedList] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:1234/api/orders')
      .then(res => res.json())
      .then(allOrders => {
        console.log(allOrders);
        dispatch(ordersAC.getOrdersAC(allOrders))
      })
    // здесь fetch (сага) в базу для получения списка заказов (причем только тех, что в обработке)
  })

  const finishedOrders = useSelector(state => state.ordersReducer.orders?.filter(el => el.status === "checked"))
  const toCheckOrders = useSelector(state => state.ordersReducer.orders?.filter(el => el.status === "toCheck"))

  return (
    <div className={styles.container}>
      <button onClick={() => history.goBack()}>Назад</button>

      <h2>Заказы, ожидающие обработки </h2>
      {toCheckOrders.length ? <ul> {toCheckOrders.map((order) => <ToCheckOrder key={order.id} order={order} />)} </ul> : null}

      <button onClick={() => setCompletedList(prev => !prev)}>Вывести список завершенных(обработанных) заказов</button>
      <br />
      {completedList && finishedOrders.length ? <ul> {finishedOrders.map((order) => <DoneOrder key={order.id} order={order} />)}</ul> : null}
    </div >
  );
}

export default Orders;
