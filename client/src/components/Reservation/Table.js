import { useEffect, useState } from 'react';

export default function Table({ table, selectedDateTime, setSelectedTableId }) {
  const [currTable, setCurrTable] = useState(null);
  const [isReserved, setisReserved] = useState(false);

  const fetchGetState = async () => {
    const address = `http://localhost:1234/api/reservations/table/${table.id}?date=${selectedDateTime.date}&time=${selectedDateTime.time}`;
    const response = await fetch(address);
    const { reserved } = await response.json();
    setisReserved(reserved);
    console.log('RESE', reserved, isReserved);
  };

  const selectTable = (event) => {
    if (selectedDateTime) {
      const { id } = event.target;
      console.log('IDDDDDD', id);
      if (currTable) {
        // Меняем цвет у предыдущего столика
        currTable.attributes[1].value = 'cyan';
      }
      // Меняем цвет у выбранного столика
      if (isReserved) {
        alert('Столик забронирован');
      } else {
        event.target.attributes[1].value = event.target.attributes[1].value === 'red' ? 'cyan' : 'red';
        setCurrTable(event.target);
        setSelectedTableId(id);
      }
    } else {
      alert('Выберите пожалуйста дату и время и нажмите на кнопку выбрать');
    }
  };

  useEffect(() => fetchGetState(), [selectedDateTime]);

  return (
    <>
      {table.svgCoords && (
        <path
          id={table.number}
          onClick={selectTable}
          fill='cyan'
          fillOpacity='0.5'
          stroke='black'
          strokeWidth='1'
          d={table.svgCoords}
        />
      )}
    </>
  );
}
