import React from 'react';
import { useSelector } from 'react-redux';
import Pizza from './Pizza'



function PizzaList() {
  const menu = useSelector((state) => state.getMenuReducer.menu);

  return (
    <>
    { menu.map((menu) => <Pizza key={menu.id} menu={menu} />) }
    </>
  );
}


export default PizzaList;
