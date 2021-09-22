import React, { useState } from 'react'
import styles from './Profile.module.scss'

export default function Profile() {
  const [editMode, setEditMode] = useState(false)
  let user = { name: 'Пониксандр', email: 'look@my.horse', phone: '8800200600' }

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
          <p>Полное имя: </p>
          {editMode ? (
            <input type="text" name="name" defaultValue={user.name} />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
        <div className={styles.entry}>
          <p>Почта: </p>
          {editMode ? (
            <input type="text" name="email" defaultValue={user.email} />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div className={styles.entry}>
          <p>Телефон: </p>
          {editMode ? (
            <input type="tel" name="phone" defaultValue={user.phone} />
          ) : (
            <p>{user.phone}</p>
          )}
        </div>
        <div className={styles.entry}>
          {editMode && (
            <>
              <p>Пароль: </p>
              <input type="password" name="password" />
            </>
          )}
        </div>
        {editMode ? (
          <button id="save" type="submit">
            Сохранить
          </button>
        ) : (
          <button id="edit" type="submit">
            Изменить данные
          </button>
        )}
      </form>
    </div>
  )
}
