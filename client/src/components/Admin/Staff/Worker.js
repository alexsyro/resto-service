import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {DEL_STAFF} from '../../../redux/actionTypes/actionType'

function Worker({ person }) {
  const dispatch = useDispatch();
  return (
    <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
      <h3 className="uk-card-title">{person.id}</h3>
      <p>{person.name}</p>
      <p>{person.username}</p>
      <Link to={`/staff/${person.id}`} className="uk-button uk-button-default">Edit</Link>
      <button onClick={() => dispatch({ type: DEL_STAFF, payload: person.id })} className="uk-button uk-button-default uk-margin-left">Delete</button>
    </div>
  );
}

export default Worker;
