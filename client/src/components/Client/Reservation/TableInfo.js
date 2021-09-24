import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setReservationAC, resetReservSelectionAC } from '../../../redux/actionCreators/actionCreators';
import styles from './Reservation.module.scss';
import { useTranslation } from 'react-i18next';


const { REACT_APP_URL } = process.env;

export default function TableInfo() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { selectedTable, selectedDateTime } = useSelector((state) => state.reservationReducer);
  const history = useHistory();

  const createReservation = async (event) => {
    event.preventDefault();
    const { guestCount, guestName, guestPhone } = event.target;
    const dataToSend = {
      tableId: selectedTable.id,
      guestCount: guestCount.value,
      guestName: user.isAuth ? user.name : guestName.value,
      guestPhone: user.isAuth ? user.phone : guestPhone.value,
      date: selectedDateTime.date,
      time: selectedDateTime.time,
    };
    const url = `${REACT_APP_URL}api/reservations`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    if (response.status === 200) {
      const { reservation } = await response.json();
      dispatch(setReservationAC({ reservation }));
      dispatch(resetReservSelectionAC());
      alert(
        `${user.isAuth ? user.name : guestName.value}, ${t('info.17')} ${selectedTable.number} ${t('info.18')} ${
          selectedDateTime.date
        } 
        ${t('info.19')} ${selectedDateTime.time} ${t('info.20')}`,
      );
      history.push('/');
    }
  };

  return (
    <div className={styles.tableInfoContainer}>
      <h3 className={styles.info_header}>{`${t('info.1')} # ${selectedTable.number}`}</h3>
      <h4 className={styles.info_header}>{`${t('info.2')}: ${selectedTable.seatsLimit}`}</h4>
      <hr></hr>
      {selectedDateTime ? (
        <>
          <h4 className={styles.info_book}>{`${t('info.12')} ${selectedDateTime.date} ${t('info.13')} ${selectedDateTime.time}`}</h4>
          <div>
            <p className={styles.text}>{t('info.3')}</p>
            <p className={styles.text}>{t('info.4')} </p>
            <p className={styles.text_last}> {t('info.5')}</p>
          </div>
          <form onSubmit={createReservation}>
            <div>
              <label className={styles.info_guests} htmlFor='guestCount'>{t('info.6')}</label>
              <input className={styles.info_input}
                id='guestCount'
                type='number'
                name='guestCount'
                placeholder={`${t('info.14')}`}
                defaultValue='2'
                min='1'
                max={selectedTable.seatsLimit}
              />
              {user.isAuth ? (
                <p className={styles.text}>{t('info.7')} </p>
              ) : (
                <>
                  <label className={styles.info_guests} htmlFor='guestName'>{t('info.8')}</label>
                  <input className={styles.info_input}
                    id='guestName'
                    type='text'
                    name='guestName'
                    placeholder={`${t('info.15')}`}
                    required
                  />
                  <label className={styles.info_guests} htmlFor='guestPhone'>{t('info.9')}</label>
                  <input className={styles.info_input}
                    id='guestPhone'
                    type='number'
                    name='guestPhone'
                    placeholder={`${t('info.16')}`}
                    required
                  />
                </>
              )}
            </div>
            <button className={styles.info_button} type='submit'>{t('info.10')}</button>
          </form>
        </>
      ) : (
        <p>{t('info.11')}</p>
      )}
    </div>
  );
}
