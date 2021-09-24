import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReservTableAC } from '../../../redux/actionCreators/actionCreators';
// import { useTranslation } from 'react-i18next';

const { REACT_APP_URL } = process.env;

export default function Table({ table }) {
  // const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { selectedDateTime, selectedTable } = useSelector((state) => state.reservationReducer);

  const [isReserved, setisReserved] = useState(false);

  const fetchGetState = async () => {
    const url = `${REACT_APP_URL}api/reservations/table/${table.id}?date=${selectedDateTime.date}&time=${selectedDateTime.time}`;
    const response = await fetch(url, { credentials: 'include' });
    const { reserved } = await response.json();
    setisReserved(reserved);
  };

  const selectTable = () => {
    if (selectedDateTime) {
      if (isReserved) {
        alert('Столик забронирован');
      } else {
        dispatch(selectReservTableAC({ table }));
      }
    } else {
      alert('Выберите пожалуйста дату и время и нажмите на кнопку выбрать');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchGetState(), [selectedDateTime]);

  return (
    <>
      {table.svgCoords && (
        <path
          id={table.number}
          onClick={selectTable}
          fill={table.id === selectedTable?.id ? 'cyan' : isReserved ? 'red' : 'green'}
          fillOpacity='0.5'
          stroke='black'
          strokeWidth='1'
          d={table.svgCoords}
        />
      )}
    </>
  );
}
