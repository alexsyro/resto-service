import React, { useEffect, useState } from 'react';
import clubTablesImg from '../../images/Tables/Club.png';
import styles from './Tables.module.scss';

export default function ClubTables({ setSelectedTableId, selectedDateTime }) {
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

  //Для проверки
  let reservedTables = [];

  useEffect(() => {
    reservedTables = [114, 104, 115];
    reservedTables.forEach((table) => {
      document.getElementById(table).attributes[1].value = 'red';
    });
  }, []);

  return (
    <div className={styles.svg} style={{ backgroundImage: `url(${clubTablesImg})` }}>
      <svg xmlns='http://www.w3.org/2000/svg' width='1000' height='700'>
        <path
          id='111'
          onClick={selectTable}
          reserved={reservedTables.includes(111)}
          fill= 'cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 707.00,404.00
           C 707.00,404.00 707.00,486.00 707.00,486.00
             707.00,486.00 793.00,486.00 793.00,486.00
             793.00,486.00 793.00,404.00 793.00,404.00
             793.00,404.00 707.00,404.00 707.00,404.00 Z'
        />
        <path
          id='112'
          onClick={selectTable}
          reserved={reservedTables.includes(112)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 707.00,320.00
           C 707.00,320.00 707.00,401.00 707.00,401.00
             707.00,401.00 793.00,401.00 793.00,401.00
             793.00,401.00 793.00,320.00 793.00,320.00
             793.00,320.00 707.00,320.00 707.00,320.00 Z'
        />

        <path
          id='113'
          onClick={selectTable}
          reserved={reservedTables.includes(113)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 707.00,235.00
           C 707.00,235.00 707.00,317.00 707.00,317.00
             707.00,317.00 793.00,317.00 793.00,317.00
             793.00,317.00 793.00,235.00 793.00,235.00
             793.00,235.00 707.00,235.00 707.00,235.00 Z'
        />
        <path
          id='114'
          onClick={selectTable}
          reserved={reservedTables.includes(114)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 707.00,151.00
           C 707.00,151.00 707.00,233.00 707.00,233.00
             707.00,233.00 793.00,233.00 793.00,233.00
             793.00,233.00 793.00,151.00 793.00,151.00
             793.00,151.00 707.00,151.00 707.00,151.00 Z'
        />
        <path
          id='115'
          onClick={selectTable}
          reserved={reservedTables.includes(115)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 706.00,67.00
           C 706.00,67.00 706.00,148.00 706.00,148.00
             706.00,148.00 794.00,148.00 794.00,148.00
             794.00,148.00 794.00,67.00 794.00,67.00
             794.00,67.00 706.00,67.00 706.00,67.00 Z'
        />
        <path
          id='116'
          onClick={selectTable}
          reserved={reservedTables.includes(116)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 582.00,75.00
           C 582.00,75.00 582.00,162.00 582.00,162.00
             582.00,162.00 664.00,162.00 664.00,162.00
             664.00,162.00 664.00,75.00 664.00,75.00
             664.00,75.00 582.00,75.00 582.00,75.00 Z'
        />
        <path
          id='101'
          onClick={selectTable}
          reserved={reservedTables.includes(101)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 192.00,404.00
           C 192.00,404.00 192.00,486.00 192.00,486.00
             192.00,486.00 277.00,486.00 277.00,486.00
             277.00,486.00 277.00,404.00 277.00,404.00
             277.00,404.00 192.00,404.00 192.00,404.00 Z'
        />
        <path
          id='102'
          onClick={selectTable}
          reserved={reservedTables.includes(102)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 191.00,320.00
           C 191.00,320.00 191.00,401.00 191.00,401.00
             191.00,401.00 277.00,401.00 277.00,401.00
             277.00,401.00 277.00,320.00 277.00,320.00
             277.00,320.00 191.00,320.00 191.00,320.00 Z'
        />
        <path
          id='103'
          onClick={selectTable}
          reserved={reservedTables.includes(103)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 191.00,235.00
           C 191.00,235.00 191.00,317.00 191.00,317.00
             191.00,317.00 277.00,317.00 277.00,317.00
             277.00,317.00 277.00,235.00 277.00,235.00
             277.00,235.00 191.00,235.00 191.00,235.00 Z'
        />
        <path
          id='104'
          onClick={selectTable}
          reserved={reservedTables.includes(104)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 192.00,153.00
           C 192.00,153.00 192.00,232.00 192.00,232.00
             192.00,232.00 277.00,232.00 277.00,232.00
             277.00,232.00 277.00,153.00 277.00,153.00
             277.00,153.00 192.00,153.00 192.00,153.00 Z'
        />
        <path
          id='105'
          onClick={selectTable}
          reserved={reservedTables.includes(105)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 192.00,67.00
           C 192.00,67.00 192.00,148.00 192.00,148.00
             192.00,148.00 277.00,148.00 277.00,148.00
             277.00,148.00 277.00,67.00 277.00,67.00
             277.00,67.00 192.00,67.00 192.00,67.00 Z'
        />
        <path
          id='106'
          onClick={selectTable}
          reserved={reservedTables.includes(106)}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 324.00,76.00
           C 324.00,76.00 324.00,160.00 324.00,160.00
             324.00,160.00 406.00,160.00 406.00,160.00
             406.00,160.00 406.00,76.00 406.00,76.00
             406.00,76.00 324.00,76.00 324.00,76.00 Z'
        />
      </svg>
    </div>
  );
}
