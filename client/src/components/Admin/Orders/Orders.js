import React, { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import { useHistory, Link } from 'react-router-dom'

function Orders() {
  const [completedList, setCompletedList] = useState(false)
  const history = useHistory();
  useEffect(() => {
    // здесь fetch (сага) в базу для получения списка заказов (причем только тех, что в обработке)
  })

  return (
    <div className={styles.container}>
      <p>Компонент заказов</p>
      <button onClick={() => history.goBack()}>Назад</button>

      <h2>Заказы, ожидающие обработки </h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Стол</th>
            <th>Дата</th>
            <th>Время</th>
            <th>Количество</th>
          </tr>
        </thead>
        <tbody>
          {/* на каждый не обработанный заказ генерируем тег tr, в котором вложены td. */}
          <tr className={`${styles.hoverRow} `}>
            <td>1</td>

            <td><Link to={`/orders/${1}`}>Петр</ Link></td>

            <td>2</td>
            <td>30 Сентября 2021</td>
            <td>16:00</td>
            <td>5</td>
          </tr>
          <tr className={`${styles.hoverRow}`}>
            <td>2</td>

            <td> <Link to={`/orders/${2}`}>Аня</ Link></td>

            <td>5</td>
            <td>30 Сентября 2021</td>
            <td>16:00</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>



      <button onClick={() => setCompletedList(prev => !prev)}>Вывести список завершенных(обработанных) заказов</button>
      <br />
      {completedList && <ul>ЗДЕСЬ РЕНДЕРИТСЯ СПИСОК ВЫПОЛНЕННЫХ ЗАЯВОК (компент создать новый)</ul>}
    </div >
  );
}

export default Orders;
