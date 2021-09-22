import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CLIENTS } from '../../../redux/actionTypes/actionType';
import Client from './Client';

function ClientList(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:1234/api/clients`)
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
      <input onChange={(event) => setValue(event.target.value)} type='text' placeholder='Введите имя'></input>
      {filteredClients.map((client) => (
        <Client key={client.id} client={client} />
      ))}
    </>
  );
}

export default ClientList;
