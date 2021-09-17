import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {DEL_CARD} from '../../../../../redux/actionTypes/actionType'

function Salads({menu}) {

  const dispatch = useDispatch();

  return (
    <div>
        <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
            <h3 className="uk-card-title">{menu.title}</h3>
            <p>SALADS</p>
            <Link to={`/menu/${menu.id}`} className="uk-button uk-button-default">Edit</Link>
            <button onClick={() => dispatch({ type: DEL_CARD, payload: menu.id })} className="uk-button uk-button-default uk-margin-left">Delete</button>
        </div>
    </div>
  );
}

export default Salads;
