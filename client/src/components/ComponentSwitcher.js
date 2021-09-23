import React from 'react';
import { useSelector } from 'react-redux';
import Admin from './Admin/Admin';
import Client from './Client/Client';

export default function ComponentSwitcher() {
  const { user } = useSelector((state) => state.usersReducer);
  return (
    <>
      {/* Условный рендеринг isAdmin. */}
      {user.isStaff ? <Admin /> : <Client />}
    </>
  );
}
