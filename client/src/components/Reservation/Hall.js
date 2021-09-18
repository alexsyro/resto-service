import React, { useEffect, useState } from 'react';
import clubTablesImg from '../../images/Tables/Club.png';
import Table from './Table';
import styles from './Tables.module.scss';

export default function Hall({ hall, setSelectedTableId, selectedDateTime }) {
  const [allTables, setallTables] = useState(null);

  useEffect(async () => {
    const response = await fetch(`http://localhost:1234/api/reservations/hall/${hall.id}`);
    const allTableCurrHall = await response.json();
    setallTables(allTableCurrHall);
    console.log(allTableCurrHall);
  }, []);

  return (
    <div className={styles.svg} style={{ backgroundImage: `url(${clubTablesImg})` }}>
      <svg xmlns='http://www.w3.org/2000/svg' width='1000' height='700'>
        {allTables.map((table) => (
          <Table
            table={table}
            selectedDateTime={selectedDateTime}
            setSelectedTableId={setSelectedTableId}
            reserved={reserved}
          />
        ))}
      </svg>
    </div>
  );
}
