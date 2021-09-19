import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clubTablesImg from '../../images/Tables/Club.png';
import restTablesImg from '../../images/Tables/Rest.png';
import Table from './Table';
import styles from './Reservation.module.scss';

const images = { 1: restTablesImg, 2: clubTablesImg };

export default function Hall() {
  const { selectedHall } = useSelector((state) => state.reservationReducer);
  const [thisHallTables, setThisHallTables] = useState([]);

  const fetchGetAllTables = async () => {
    const response = await fetch(`http://localhost:1234/api/reservations/hall/${selectedHall.id}`);
    const { tables } = await response.json();
    setThisHallTables(tables);
    console.log('ALL TABLES', tables);
  };

  useEffect(() => {
    fetchGetAllTables();
  }, [selectedHall]);

  return (
    <div className={styles.svg} style={{ backgroundImage: `url(${images[selectedHall.id]})` }}>
      <svg xmlns='http://www.w3.org/2000/svg' width='1000' height='700'>
        {thisHallTables.map((table) => (
          <Table
            key={table.id}
            table={table}
          />
        ))}
      </svg>
    </div>
  );
}
