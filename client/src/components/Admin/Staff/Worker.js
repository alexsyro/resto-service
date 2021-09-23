import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DEL_STAFF } from '../../../redux/actionTypes/actionType';
import styles from '../Staff/Worker.module.scss'

const { REACT_APP_URL } = process.env;

function Worker({ person }) {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.staffReducer.positions);
  const currentPost = posts.find((post) => post.id === person.PostId);

  const deleteWorker = () => {
    dispatch({ type: DEL_STAFF, payload: person.id });
    // console.log('delete')
    fetch(`${REACT_APP_URL}api/staff/${person.id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(console.log);
  };

  return (
    <div className={styles.card}>
      <p className={styles.text}>Имя: {person.name}</p>
      <p className={styles.text}>Должность: {currentPost.name}</p>
      <Link to={`/staff/${person.id}`} >
      <button className={styles.edit} >Редактировать</button>
      </Link>
      <button className={styles.delete} onClick={deleteWorker}>Удалить</button>
    </div>
  );
}

export default Worker;
