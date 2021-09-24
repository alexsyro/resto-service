import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectReservHallAC,
  selectReservDateTimeAC,
  resetReservSelectionAC,
} from '../../../redux/actionCreators/actionCreators';
import Hall from './Hall';
import TableInfo from './TableInfo';
import ChooseDate from '../ChooseDate/ChooseDate';

import styles from './Reservation.module.scss';
import { useTranslation } from 'react-i18next';

const { REACT_APP_URL } = process.env;
const scrollToRef = (ref) => window.scrollTo(0, 730);

export default function Reservation() {
  const inputTable = useRef(null)
  const executeScroll = () => scrollToRef(inputTable)
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { selectedHall, selectedDateTime, selectedTable } = useSelector((state) => state.reservationReducer);

  const [hallsArray, setHallsArray] = useState({});

  // Выбор даты
  const dateTimeSelect = async (event) => {
    event.preventDefault();
    dispatch(resetReservSelectionAC());
    const fullTime = event.target[0].value;
    const date = fullTime.split(',')[0].split('.').reverse().join('-');
    const time = fullTime.split(',')[1].trim();

    if (date && time) {
      const datetime = { date, time };
      dispatch(selectReservDateTimeAC({ datetime }));
    } else {
      alert('Необходимо выбрать и дату, и время.');
    }
  };

  //Получаем список залов
  const fetchGetHalls = async () => {
    const url = `${REACT_APP_URL}api/reservations/halls`;
    const response = await fetch(url, { credentials: 'include' });
    const { halls } = await response.json();
    setHallsArray(halls);
  };

  useEffect(() => {
    fetchGetHalls();
  }, [selectedDateTime]);

  useEffect(() => {
    executeScroll();
  }, [selectedTable]);

  const selectHall = (event) => {
    const { id } = event.target;
    const currHall = hallsArray.find((hall) => hall.id === Number(id));
    dispatch(selectReservHallAC({ hall: currHall }));
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.upperMenu}>
          <p className={styles.pick_date}>{t('booking.1')}</p>
          <form onSubmit={dateTimeSelect}>
            <ChooseDate />
            <button className={styles.button} type='submit'>{t('booking.2')}</button>
          </form>
        </div>
        <div className={styles.hallSelect}>
          {selectedDateTime &&
            hallsArray.length &&
            hallsArray.map((hall) => (
              <button
                className={styles.pick_room}
                key={hall.id}
                onClick={selectHall}
                id={hall.id}
                type='submit'
              >
                {hall.name}
              </button>
            ))}
        </div>
        <div className={styles.tableContainer}>
          {selectedHall && <Hall />}
          {selectedTable && <TableInfo />}
          <br ref={inputTable} />
        </div>
      </div>
    </>
  );
}
