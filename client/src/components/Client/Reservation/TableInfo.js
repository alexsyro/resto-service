import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setReservationAC, resetReservSelectionAC } from '../../../redux/actionCreators/actionCreators';
import styles from './Reservation.module.scss';

const { REACT_APP_URL } = process.env;

export default function TableInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { selectedTable, selectedDateTime } = useSelector((state) => state.reservationReducer);
  const history = useHistory();

  const createReservation = async (event) => {
    event.preventDefault();
    const { guestCount, guestName, guestPhone } = event.target;
    const dataToSend = {
      tableId: selectedTable.id,
      guestCount: guestCount.value,
      guestName: user.isAuth ? user.name : guestName.value,
      guestPhone: user.isAuth ? user.phone : guestPhone.value,
      date: selectedDateTime.date,
      time: selectedDateTime.time,
    };
    const url = `${REACT_APP_URL}api/reservations`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    if (response.status === 200) {
      const { reservation } = await response.json();
      dispatch(setReservationAC({ reservation }));
      dispatch(resetReservSelectionAC());
      alert(
        `${user.isAuth ? user.name : guestName.value}, Вы забронировали столик ${selectedTable.number} на ${
          selectedDateTime.date
        } 
        в ${selectedDateTime.time} часов. Вам придёт смс и письмо на почту, после подтверждения бронирования`,
      );
      history.push('/');
    }
  };

  return (
    <div className={styles.tableInfoContainer}>
      <h3 className={styles.info_header}>{`Столик № ${selectedTable.number}`}</h3>
      <h4 className={styles.info_header}>{`Максимальная вместимость: ${selectedTable.seatsLimit}`}</h4>
      <hr></hr>
      {selectedDateTime ? (
        <>
          <h4 className={styles.info_book}>{`Забронировать на ${selectedDateTime.date} в ${selectedDateTime.time}`}</h4>
          <div>
            <p className={styles.text}>С вами также свяжется наш администратор для подтверждения бронирования.</p>
            <p className={styles.text}>Предупреждаем вас, что бронь будет снята, </p>
            <p className={styles.text_last}> если наш администратор не сможет до вас дозвониться в течении часа</p>
          </div>
          <form onSubmit={createReservation}>
            <div>
              <label className={styles.info_guests} htmlFor='guestCount'>Выберите количество гостей:</label>
              <input className={styles.info_input}
                id='guestCount'
                type='number'
                name='guestCount'
                placeholder='Количество гостей'
                defaultValue='2'
                min='1'
                max={selectedTable.seatsLimit}
              />
              {user.isAuth ? (
                <p className={styles.text}>Вы можете сделать предзаказ блюд, после бронирования </p>
              ) : (
                <>
                  <label className={styles.info_guests} htmlFor='guestName'>Ваше имя:</label>
                  <input className={styles.info_input}
                    id='guestName'
                    type='text'
                    name='guestName'
                    placeholder='Введите ваше имя'
                    required
                  />
                  <label className={styles.info_guests} htmlFor='guestPhone'>Ваш телефон:</label>
                  <input className={styles.info_input}
                    id='guestPhone'
                    type='tel'
                    name='guestPhone'
                    placeholder='Введите ваш телефон'
                    required
                  />
                </>
              )}
            </div>
            <button className={styles.info_button} type='submit'>Забронировать</button>
          </form>
        </>
      ) : (
        <p>Выберете дату, чтобы завершить бронирование</p>
      )}
    </div>
  );
}
