import React from 'react';
import { useSelector } from 'react-redux';
import Pasta from './Pasta';

function PastaList() {
  const menu = useSelector((state) => state.getMenuReducer.menu);

  return (
    <>
    { menu.map((menu) => <Pasta key={menu.id} menu={menu} />) }
    </>
  );
}

export default PastaList;
