import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {DEL_STAFF} from '../../../redux/actionTypes/actionType'

function Worker({ person }) {
  const dispatch = useDispatch();

  const deleteWorker = () => {    
    dispatch({ type: DEL_STAFF, payload: person.id })
    // console.log('delete')
    fetch(`http://localhost:1234/api/staff/${person.id}`, {
      method: 'DELETE',
    })
    .then(console.log)
  }

  return (
    <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
      <h3 className="uk-card-title">{person.id}</h3>
      <p>{person.name}</p>
      <p>{person.username}</p>
      <Link to={`/staff/edit/${person.id}`} className="uk-button uk-button-default">Редактировать</Link>
      <button onClick={deleteWorker}>Удалить</button>
    </div>
  );
}

export default Worker;
