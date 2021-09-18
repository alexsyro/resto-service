import React, { useState } from 'react';
import ClubTables from './ClubTables';
import RestTables from './RestTables';
import TableInfo from './TableInfo';
import styles from './Tables.module.scss';

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

//Выбор нужного зала
const REST_HALL_ID = 1;
const CLUB_HALL_ID = 2;

export default function Tables() {
  const today = formatDate();
  const maxDate = formatDate(CURR_DATE.getTime() + 1000 * 60 * 60 * 24 * 30);

  const [currHall, setCurrHall] = useState(REST_HALL_ID);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const hallToRender = {
    2: <ClubTables setSelectedTableId={setSelectedTableId} selectedDateTime={selectedDateTime} />,
    1: <RestTables setSelectedTableId={setSelectedTableId} selectedDateTime={selectedDateTime} />,
  };

  const hallSelect = (event) => {
    const { id } = event.target;
    setCurrHall(Number(id));
  };

  // Необходимо сделать запрос на столики для текущей даты и посмотреть, какие свободны, а какие нет
  const dateTimeSelect = (event) => {
    event.preventDefault();
    const { date, time } = event.target;
    const datetime = { date: date.value, time: time.value };
    setSelectedDateTime(datetime);
  };

  return (
    <>
      <div className='mainContainer'>
        <div className='upperMenu'>
          <p>Выберете интересующую дату и время</p>
          <form onSubmit={dateTimeSelect}>
            <input name='date' type='date' min={today} value={today} max={maxDate} />
            <input name='time' type='time' />
            <button type='submit'>Выбрать</button>
          </form>
        </div>

        {selectedDateTime && (
          <div>
            <div className='hallSelect'>
              <button onClick={hallSelect} id='1' selected type='submit'>
                Ресторан
              </button>
              <button onClick={hallSelect} id='2' type='submit'>
                Клуб
              </button>
            </div>
            <div className={styles.tableContainer}>
              {hallToRender[currHall]}
              {selectedTableId && (
                <TableInfo selectedDateTime={selectedDateTime} selectedTable={selectedTableId} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
