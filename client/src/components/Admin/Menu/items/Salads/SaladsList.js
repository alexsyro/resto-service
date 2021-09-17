import React from 'react';
import { useSelector } from 'react-redux';
import Salads from './Salads'



function SaladsList() {
  const menu = useSelector((state) => state.getMenuReducer.menu);

  return (
    <>
    { menu.map((menu) => <Salads key={menu.id} menu={menu} />) }
    </>
  );
}

export default SaladsList;
