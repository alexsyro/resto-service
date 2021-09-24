import React from 'react';

function AcceptedReserve({ reservation }) {
  return (
    <tr>
      <td>
        <span>{reservation.id}</span>
      </td>
      <td>
        <span>{reservation.guest_name}</span>
      </td>
      <td>
        <span>{reservation['Table.number']}</span>
      </td>
      <td>
        <span>{reservation.guest_count}</span>
      </td>
      <td>
        <span>{reservation.guest_phone}</span>
      </td>
      <td>
        {' '}
        <span>
          {`${reservation.timeFormat.day}  ${reservation.timeFormat.month}, ${reservation.timeFormat.year}`}
        </span>
      </td>
      <td>
        {' '}
        <span> {`${reservation.timeFormat.hours}:${reservation.timeFormat.minutes}`}</span>
      </td>
      <td>
        <p>{reservation['State.state']}</p>
      </td>
    </tr>
  );
}

export default AcceptedReserve;
