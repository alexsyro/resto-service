import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {DEL_CLIENTS} from '../../../redux/actionTypes/actionType'
import styles from './Client.module.scss'

const { REACT_APP_URL } = process.env;

function Client({ client }) {
  const dispatch = useDispatch();

  const deleteClient = () => {    
    dispatch({ type: DEL_CLIENTS, payload: client.id })
    fetch(`${REACT_APP_URL}api/сlients/delete/${client.id}`, {
      method: 'DELETE',
    })
    .then(console.log)
  }

  return (
    <div className={styles.card}>
      <p className={styles.text}>{client.name}</p>
      <p className={styles.text}>{client.email}</p>
      <p className={styles.text}>{client.phone}</p>
      <Link to={`/clients/${client.id}`}> <button className={styles.edit}>Редактировать</button></Link>
      <button onClick={deleteClient} className={styles.delete}>Удалить</button>
    </div>
  );
}

export default Client;

