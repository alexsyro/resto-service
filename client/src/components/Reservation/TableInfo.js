import { useDispatch, useSelector } from 'react-redux';
import { setReservationAC, resetReservSelectionAC } from '../../redux/actionCreators/actionCreators';

import styles from './Reservation.module.scss';

// ПРОКИНУТЬ СТОЛИК ОТ САМОГО СТОЛА ДО ЭТОГО МЕСТА
export default function TableInfo() {
  const dispatch = useDispatch();
  const { selectedTable, selectedDateTime } = useSelector((state) => state.reservationReducer);

  const createReservation = async (event) => {
    event.preventDefault();
    const { guestCount } = event.target;
    const dataToSend = {
      tableId: selectedTable.id,
      guestCount: guestCount.value,
      date: selectedDateTime.date,
      time: selectedDateTime.time,
    };
    const response = await fetch('http://localhost:1234/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    if (response.status === 200) {
      const { reservation } = await response.json();
      dispatch(setReservationAC({ reservation }));
      dispatch(resetReservSelectionAC())
      alert(
        `Вы забронировали столик ${selectedTable.number} на ${selectedDateTime.date} в ${selectedDateTime.time} часов.`,
      );
    }
  };

  return (
    <div className={styles.tableInfoContainer}>
      <h3>{`Столик №${selectedTable.id}`}</h3>
      <h4>{`Максимальная вместимость: ${selectedTable.seatsLimit}`}</h4>
      <hr></hr>
      {selectedDateTime ? (
        <>
          <h3>{`Забронировать на ${selectedDateTime.date} в ${selectedDateTime.time}`}</h3>
          <div>
            <p>С вами также свяжется наш администратор для подтверждения бронирования.</p>
            <p>Предупреждаем вас, что бронь будет снята, </p>
            <p> если наш администратор не сможет до вас дозвониться в течении часа</p>
          </div>
          <form onSubmit={createReservation}>
            <div>
              <label htmlFor='guestCount'>Выберите количество гостей:</label>
              <input
                id='guestCount'
                type='number'
                name='guestCount'
                placeholder='Количество гостей'
                defaultValue='2'
                min='1'
                max={selectedTable.seatsLimit}
              />
            </div>
            <button type='submit'>Забронировать</button>
          </form>
        </>
      ) : (
        <p>Выберете дату, чтобы завершить бронирование</p>
      )}
    </div>
  );
}
