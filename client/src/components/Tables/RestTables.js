import React, { useState } from 'react';
import RestTablesImg from '../../images/Tables/Rest.png';
import styles from './Tables.module.scss';

export default function RestTables({ setSelectedTableId, selectedDateTime }) {
  const [currTable, setCurrTable] = useState(null);

  const selectTable = (event) => {
    if (selectedDateTime) {
      const { id } = event.target;
      if (currTable) {
        // Меняем цвет у предыдущего столика
        currTable.attributes[1].value = 'cyan';
      }
      // Меняем цвет у выбранного столика
      event.target.attributes[1].value = event.target.attributes[1].value === 'red' ? 'cyan' : 'red';
      setCurrTable(event.target);
      setSelectedTableId(id);
    } else {
      alert('Выберите пожалуйста дату и время и нажмите на кнопку выбрать')
    }
  };
  return (
    <div className={styles.svg} style={{ backgroundImage: `url(${RestTablesImg})` }}>
      <svg xmlns='http://www.w3.org/2000/svg' width='1000' height='700'>
        <path
          id='11'
          onClick={selectTable}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 856.00,615.00
           C 856.00,615.00 856.00,664.00 856.00,664.00
             856.00,664.00 978.00,664.00 978.00,664.00
             978.00,664.00 978.00,615.00 978.00,615.00
             978.00,615.00 856.00,615.00 856.00,615.00 Z'
        />
        <path
          id='12'
          onClick={selectTable}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 912.00,476.00
           C 912.00,476.00 912.00,558.00 912.00,558.00
             912.00,558.00 960.00,558.00 960.00,558.00
             960.00,558.00 960.00,476.00 960.00,476.00
             960.00,476.00 912.00,476.00 912.00,476.00 Z'
        />
        <path
          id='13'
          onClick={selectTable}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 911.00,392.00
           C 911.00,392.00 911.00,444.00 911.00,444.00
             911.00,444.00 962.00,444.00 962.00,444.00
             962.00,444.00 962.00,392.00 962.00,392.00
             962.00,392.00 911.00,392.00 911.00,392.00 Z'
        />
        <path
          id='21'
          onClick={selectTable}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 685.00,536.00
           C 685.00,536.00 685.00,586.00 685.00,586.00
             685.00,586.00 771.00,586.00 771.00,586.00
             771.00,586.00 771.00,536.00 771.00,536.00
             771.00,536.00 685.00,536.00 685.00,536.00 Z'
        />
        <path
          id='33'
          onClick={selectTable}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 620.00,261.00
           C 620.00,261.00 595.00,275.28 595.00,275.28
             595.00,275.28 582.00,282.00 582.00,282.00
             582.00,282.00 581.00,284.00 581.00,284.00
             581.00,284.00 580.00,284.00 580.00,284.00
             580.00,284.00 602.95,322.47 602.95,322.47
             602.95,322.47 620.00,352.00 620.00,352.00
             620.00,352.00 639.28,341.48 639.28,341.48
             639.28,341.48 648.00,337.22 648.00,337.22
             648.00,337.22 661.00,330.00 661.00,330.00
             661.00,330.00 644.63,301.72 644.63,301.72
             644.63,301.72 620.00,261.00 620.00,261.00 Z'
        />
        <path
          id='43'
          onClick={selectTable}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 472.00,281.53
           C 447.62,288.80 443.93,324.42 451.44,345.00
             455.71,356.72 465.86,369.71 480.00,366.47
             505.32,360.67 507.67,320.62 499.79,301.00
             495.01,289.09 485.79,279.32 472.00,281.53 Z'
        />
        <path
          id='53'
          onClick={selectTable}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 231.00,287.00
           C 231.00,287.00 231.00,337.00 231.00,337.00
             231.00,337.00 351.00,337.00 351.00,337.00
             351.00,337.00 351.00,287.00 351.00,287.00
             351.00,287.00 231.00,287.00 231.00,287.00 Z'
        />
        <path
          id='62'
          onClick={selectTable}
          fill='cyan'
          fill-opacity='0.5'
          stroke='black'
          stroke-width='1'
          d='M 37.00,44.00
           C 37.00,44.00 37.00,261.00 37.00,261.00
             37.00,261.00 89.00,261.00 89.00,261.00
             89.00,261.00 89.00,44.00 89.00,44.00
             89.00,44.00 37.00,44.00 37.00,44.00 Z'
        />
      </svg>
    </div>
  );
}
