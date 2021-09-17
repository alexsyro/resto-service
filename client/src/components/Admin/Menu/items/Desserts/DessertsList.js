import React from 'react';
import { useSelector } from 'react-redux';
import Desserts from './Desserts';

function DessertsList() {
  const menu = useSelector((state) => state.getMenuReducer.menu);

  return (
    <>
    { menu.map((menu) => <Desserts key={menu.id} menu={menu} />) }
    </>
  );
}

export default DessertsList;
