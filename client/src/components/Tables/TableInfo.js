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

  const createReservation = (event) => {
    alert(
      `Вы забронировали столик ${currTable.id} на ${selectedDateTime.date} в ${selectedDateTime.time} часов.`,
    );
  };

  return (
    <div className={styles.tableInfoContainer}>
      <h3>{`Столик №${currTable.id}`}</h3>
      <h4>{`Максимальная вместимость: ${currTable?.seatsLimit}`}</h4>
      <hr></hr>
      {selectedDateTime ? (
        <>
          <h3>{`Забронировать на ${selectedDateTime.date} в ${selectedDateTime.time}`}</h3>
          <div>
            <p>С вами также свяжется наш администратор для подтверждения бронирования.</p>
            <p>Предупреждаем вас, что бронь будет снята, </p>
            <p> если наш администратор не сможет до вас дозвониться в течении часа</p>
          </div>
          <button type='submit'>Забронировать</button>
        </>
      ) : (
        <p>Выберете дату, чтобы завершить бронирование</p>
      )}
    </div>
  );
}
