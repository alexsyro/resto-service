import React, { useState } from 'react'
import styles from './Profile.module.scss'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const [editMode, setEditMode] = useState(false)
  const history = useHistory();
  const { user } = useSelector((state) => state.usersReducer);
  const onClickHandler = (event) => {
    event.preventDefault()
    if (event.nativeEvent.submitter.id === 'edit') {
      setEditMode(true)
    } else if (event.nativeEvent.submitter.id === 'save') {
      setEditMode(false)
    }
  }

  return (
    <div className={styles.profile__container}>
      <form onSubmit={onClickHandler}>
        <div className={styles.entry}>
          <p className={styles.title}> Имя: </p>
          {editMode ? (
            <input type="text" name="name" defaultValue={user.name} />
          ) : (
            <p className={styles.p}>{user.name}</p>
          )}
        </div>
        <div className={styles.entry}>
          <p className={styles.title}>Почта: </p>
          {editMode ? (
            <input type="text" name="email" defaultValue={user.email} />
          ) : (
            <p className={styles.p}>{user.email}</p>
          )}
        </div>
        <div className={styles.entry}>
          <p className={styles.title}>Телефон: </p>
          {editMode ? (
            <input type="tel" name="phone" defaultValue={user.phone} />
          ) : (
            <p className={styles.p}>{user.phone}</p>
          )}
        </div>
        <div className={styles.entry}>
          <p className={styles.title}>Ваша скидка: </p>
          {editMode ? (
            null
          ) : (
            <p className={styles.p}>{`${user.discount} %`}</p>
          )}
        </div>
        <div className={styles.entry}>
          {editMode && (
            <>
              <p className={styles.title}>Пароль: </p>
              <input type="password" name="password" />
            </>
          )}
        </div>

        {editMode ? (
          <button className={styles.save} id="save" type="submit">
            Сохранить
          </button>
        ) : (
          <button className={styles.change} id="edit" type="submit">
            Изменить данные
          </button>
        )}
      </form>
      <button className={styles.back} onClick={() => history.goBack()}>Назад</button>
    </div>
  )
}
