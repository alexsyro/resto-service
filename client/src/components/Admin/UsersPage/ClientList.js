import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CLIENTS } from '../../../redux/actionTypes/actionType';
import Client from './Client';
import styles from './ClientList.module.scss'

const { REACT_APP_URL } = process.env;

function ClientList() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${REACT_APP_URL}api/clients`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_CLIENTS, payload: data }));
  }, [dispatch]);

  const clientsList = useSelector((state) => state.clientsReducer.clients);
  console.log(clientsList, 'CLIENTS');

  //живой поиск
  const [value, setValue] = useState('');

  const filteredClients = clientsList.filter((client) => {
    return client.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <>
      <div className={styles.find__block}>
        <p>Найти клиента:</p>
        <input onChange={(event) => setValue(event.target.value)} type='text' placeholder='Введите имя'></input>
      </div>
      <div className={styles.section}>
      {filteredClients.map((client) => (
        <Client key={client.id} client={client} />
      ))}
      </div>
    </>
  );
}

export default ClientList;
