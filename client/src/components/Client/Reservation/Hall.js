import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clubTablesImg from '../../../images/Halls/Club.png';
import restTablesImg from '../../../images/Halls/Rest.png';
import Table from './Table';
import styles from './Reservation.module.scss';

const images = { 1: restTablesImg, 2: clubTablesImg };
const { REACT_APP_URL } = process.env;

export default function Hall() {
  const { selectedHall } = useSelector((state) => state.reservationReducer);
  const [thisHallTables, setThisHallTables] = useState([]);

  const fetchGetAllTables = async () => {
    const url = `${REACT_APP_URL}api/reservations/hall/${selectedHall.id}`;
    const response = await fetch(url, { credentials: 'include' });
    const { tables } = await response.json();
    setThisHallTables(tables);
  };

  useEffect(() => {
    fetchGetAllTables();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHall]);

  return (
    <div className={styles.svg} style={{ backgroundImage: `url(${images[selectedHall.id]})` }}>
      <svg xmlns='http://www.w3.org/2000/svg' width='1000' height='700'>
        {thisHallTables.map((table) => (
          <Table key={table.id} table={table} />
        ))}
      </svg>
    </div>
  );
}
