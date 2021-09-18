import { useEffect, useState } from 'react';

export default function Table({ table, selectedDateTime, setSelectedTableId, reserved }) {
  const [currTable, setCurrTable] = useState(null);

  const selectTable = (event) => {
    if (selectedDateTime) {

      const { id } = event.target;
      if (currTable) {
        // Меняем цвет у предыдущего столика
        currTable.attributes[1].value = 'cyan';
      }
      // Меняем цвет у выбранного столика
      if (event.target.reserved) {
        event.target.attributes[1].value = event.target.attributes[1].value === 'red' ? 'cyan' : 'red';
        setCurrTable(event.target);
        setSelectedTableId(id);
      } else {
        alert('Столик забронирован');
      }
    } else {
      alert('Выберите пожалуйста дату и время и нажмите на кнопку выбрать');
    }
  };

  useEffect(() => {
    reservedTables = [114, 104, 115];
    reservedTables.forEach((table) => {
      document.getElementById(table).attributes[1].value = 'red';
    });
  }, []);
  return (
    <path
      id={table.id}
      onClick={selectTable}
      fill='cyan'
      fillOpacity='0.5'
      stroke='black'
      strokeWidth='1'
      d={table.svgCoords}
    />
  );
}
