import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STAFF } from '../../../redux/actionTypes/actionType'
import Worker from './Worker';

function StaffList(props) {

  const dispatch = useDispatch();
  //'https://jsonplaceholder.typicode.com/users'
 // `http://localhost:1234/api/staff`
  useEffect(() => {
    fetch(`http://localhost:1234/api/staff`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_STAFF, payload: data.slice(0,4) }))
  }, [dispatch]) // запросом получаем весь стафф из бд

  const staffList = useSelector((state) => state.staffReducer.staff); 
  console.log(staffList,'STAFF')

  //живой поиск по списку работников
  const [value, setValue] = useState('')

  const filteredWorkers = staffList.filter((worker) => {
    return worker.name.toLowerCase().includes(value.toLowerCase())
  })

  return (
    <>
      <input onChange={(event)=> setValue(event.target.value)} type="text" placeholder="Введите имя"></input>
       { filteredWorkers.map((person) => <Worker key={person.id} person={person} />) }
    </>
  );
}

export default StaffList;
