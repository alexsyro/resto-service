import React, { useEffect, useState } from 'react';
import Hall from './Hall';
import TableInfo from './TableInfo';
import styles from './Reservation.module.scss';

//Текущая дата
const CURR_DATE = new Date();
//Для правильного формата даты в виде yyyy-mm-dd, по умолчанию берёт текущую дату
const formatDate = (timestamp = CURR_DATE.getTime()) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const correctMonth = date.getMonth() + 1;
  const month = ('' + correctMonth).length > 1 ? correctMonth : `0${correctMonth}`;
  const day = ('' + date.getDate()).length > 1 ? date.getDate() : `0${date.getDate()}`;
  return `${year}-${month}-${day}`;
};

export default function Reservation() {
  const today = formatDate();
  const maxDate = formatDate(CURR_DATE.getTime() + 1000 * 60 * 60 * 24 * 30);

  const [selectedTableId, setSelectedTableId] = useState(null);
  const [selectedHallId, setSelectedHallId] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [hallsArray, setHallsArray] = useState({});

  // Необходимо сделать запрос на столики для текущей даты и посмотреть, какие свободны, а какие нет
  const dateTimeSelect = async (event) => {
    event.preventDefault();
    const { date, time } = event.target;
    const datetime = { date: date.value, time: time.value };
    setSelectedDateTime(datetime);
  };

  //Получаем список залов
  const fetchGetHalls = async () => {
    const response = await fetch('http://localhost:1234/api/reservations/halls');
    const { halls } = await response.json();
    setHallsArray(halls);
    console.log('HALLS', hallsArray);
  };

  useEffect(() => {
    fetchGetHalls();
  }, [selectedDateTime]);

  const selectHall = (event) => {
    const { id } = event.target;
    setSelectedHallId(id);
  };

  return (
    <>
      <div className='mainContainer'>
        <div className='upperMenu'>
          <p>Выберете интересующую дату и время</p>
          <form onSubmit={dateTimeSelect}>
            <input name='date' type='date' min={today} max={maxDate} />
            <input name='time' type='time' />
            <button type='submit'>Выбрать</button>
          </form>
        </div>
        <div className='hallSelect'>
          {selectedDateTime &&
            hallsArray.length &&
            hallsArray.map((hall) => (
              <button key={hall.id} onClick={selectHall} id={hall.id} type='submit'>
                {hall.name}
              </button>
            ))}
        </div>

        <div className={styles.tableContainer}>
          {selectedHallId && (
            <Hall
              id={selectedHallId}
              selectedDateTime={selectedDateTime}
              setSelectedTableId={setSelectedTableId}
            />
          )}
          {selectedTableId && (
            <TableInfo selectedDateTime={selectedDateTime} selectedTable={selectedTableId} />
          )}
        </div>
      </div>
    </>
  );
}
