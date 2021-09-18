import React, { useState } from 'react';
// import clubTablesImg from '../../images/tables/Club.png';
import ClubTables from './ClubTables';
import RestTables from './RestTables';

//Текущая дата
const CURR_DATE = new Date();
//Для правильного формата даты в виде yyyy-mm-dd, по умолчанию берёт текущую дату
const formatDate = (timestamp = CURR_DATE.getTime()) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const correctMonth = date.getMonth() + 1;
  const month = toString(correctMonth).length > 1 ? correctMonth : '0' + correctMonth;
  const day = toString(date.getDate()).length > 1 ? date.getDate() : '0' + date.getDate();
  return `${year}-${month}-${day}`;
};

export default function Tables() {
  const [currHall, setCurrHall] = useState(1);
  const [selectedTable, setSelectedTable] = useState(null);

  const today = formatDate();
  const maxDate = formatDate(CURR_DATE.getTime() + 1000 * 60 * 60 * 24 * 30);

  return (
    <>
      <div className='mainContainer'>
        <div className='upperMenu'>
          <p>Выберете интересующую дату и время</p>
          <input type='date' value={today} min={today} max={maxDate} />
          <input type='time' />
          <button type='submit'>Выбрать</button>
        </div>
        {currHall === 2 ? (
          <ClubTables setSelectedTable={setSelectedTable} />
        ) : (
          <RestTables setSelectedTable={setSelectedTable} />
        )}
      </div>
    </>
  );
}
