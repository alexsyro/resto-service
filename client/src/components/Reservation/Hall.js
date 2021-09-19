import React, { useEffect, useState } from 'react';
import clubTablesImg from '../../images/Tables/Club.png';
import restTablesImg from '../../images/Tables/Rest.png';
import Table from './Table';
import styles from './Reservation.module.scss';

const images = { 1: restTablesImg, 2: clubTablesImg };

export default function Hall({ id, setSelectedTableId, selectedDateTime }) {
  const [allTables, setallTables] = useState([]);

  const fetchGetAllTables = async () => {
    const response = await fetch(`http://localhost:1234/api/reservations/hall/${id}`);
    const { tables } = await response.json();
    setallTables(tables);
    console.log('ALL TABLES', tables);
  };

  useEffect(() => {
    fetchGetAllTables();
  }, [id]);

  return (
    <div className={styles.svg} style={{ backgroundImage: `url(${images[id]})` }}>
      <svg xmlns='http://www.w3.org/2000/svg' width='1000' height='700'>
        {allTables.map((table) => (
          <Table table={table} selectedDateTime={selectedDateTime} setSelectedTableId={setSelectedTableId} />
        ))}
      </svg>
    </div>
  );
}
