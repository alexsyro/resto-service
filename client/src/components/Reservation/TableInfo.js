import styles from './Tables.module.scss';

export default function TableInfo({ selectedTable: selectedTableId, selectedDateTime }) {
  const tables = [
    { id: 111, seatsLimit: 6 },
    { id: 11, seatsLimit: 6 },
    { id: 12, seatsLimit: 5 },
    { id: 13, seatsLimit: 3 },
    { id: 21, seatsLimit: 4 },
  ];

  const currTable = tables.find((table) => table.id === Number(selectedTableId));

  const createReservation = async (event) => {
    event.preventDefault();
    const { guestCount } = event.target;
    const dataToSend = {
      tableId: currTable.id,
      guestCount: guestCount.value,
      date: selectedDateTime.date,
      time: selectedDateTime.time,
    };
    const response = await fetch('http://localhost:1234/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    if (response.status === 200) {
      alert(
        `Вы забронировали столик ${currTable.id} на ${selectedDateTime.date} в ${selectedDateTime.time} часов.`,
      );
    }
  };

  return (
    <div className={styles.tableInfoContainer}>
      <h3>{`Столик №${currTable.id}`}</h3>
      <h4>{`Максимальная вместимость: ${currTable.seatsLimit}`}</h4>
      <hr></hr>
      {selectedDateTime ? (
        <>
          <h3>{`Забронировать на ${selectedDateTime.date} в ${selectedDateTime.time}`}</h3>
          <div>
            <p>С вами также свяжется наш администратор для подтверждения бронирования.</p>
            <p>Предупреждаем вас, что бронь будет снята, </p>
            <p> если наш администратор не сможет до вас дозвониться в течении часа</p>
          </div>
          <form onSubmit={createReservation}>
            <div>
              <label htmlFor='guestCount'>Выберите количество гостей:</label>
              <input
                id='guestCount'
                type='number'
                name='guestCount'
                placeholder='Количество гостей'
                defaultValue='2'
                min='1'
                max={currTable.seatsLimit}
              />
            </div>
            <button type='submit'>Забронировать</button>
          </form>
        </>
      ) : (
        <p>Выберете дату, чтобы завершить бронирование</p>
      )}
    </div>
  );
}
