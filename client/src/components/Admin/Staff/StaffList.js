import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STAFF } from '../../../redux/actionTypes/actionType'
import Worker from './Worker';

function StaffList(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_STAFF, payload: data }))
  }, [dispatch]) // запросом получаем все меню из бд

  const staffList = useSelector((state) => state.staffReducer.staff); 

  return (
    <>
       { staffList.map((person) => <Worker key={person.id} person={person} />) }
    </>
  );
}

export default StaffList;
