import React from 'react';
import { useSelector } from 'react-redux';
import Cocktails from './Cocktails';

function CocktailsList() {
  const menu = useSelector((state) => state.getMenuReducer.menu);

  return (
    <>
    { menu.map((menu) => <Cocktails key={menu.id} menu={menu} />) }
    </>
  );
}

export default CocktailsList;
