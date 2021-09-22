import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STAFF, GET_POSITIONS } from '../../../redux/actionTypes/actionType';
import Worker from './Worker';

function StaffList() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:1234/api/staff/`, {credentials: 'include'})
      .then((res) => res.json())
      .then(({ staffs }) => dispatch({ type: GET_STAFF, payload: staffs }));
  }, [dispatch]); // запросом получаем весь стафф из бд //dispatch({type: GET_STAFF, payload: staffs})

  const staffList = useSelector((state) => state.staffReducer.staff);
  console.log(staffList, 'STAFF');

  fetch('http://localhost:1234/api/staff/posts', { credentials: 'include' })
    .then((res) => res.json())
    .then(({ posts }) => dispatch({ type: GET_POSITIONS, payload: posts }));

  //живой поиск по списку работников
  const [value, setValue] = useState('');

  const filteredWorkers = staffList?.filter((worker) => {
    return worker.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <>
      <input onChange={(event) => setValue(event.target.value)} type='text' placeholder='Введите имя'></input>
      {filteredWorkers?.map((person) => (
        <Worker key={person.id} person={person} />
      ))}
    </>
  );
}

export default StaffList;
