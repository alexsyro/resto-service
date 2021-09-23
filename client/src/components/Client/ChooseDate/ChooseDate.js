import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import styles from '..//Reservation/Reservation.module.scss';

registerLocale('ru', ru)

function ChooseDate() {

  const [chosenTime, setChosenTime] = useState(new Date());
  return (
      <DatePicker
        selected={chosenTime}
        onChange={(date) => setChosenTime(date)}
        locale="ru"
        showTimeSelect
        timeFormat="p"
        timeIntervals={30}
        dateFormat='Pp'
        className={styles.input_date}
      />
  );
}

export default ChooseDate;
