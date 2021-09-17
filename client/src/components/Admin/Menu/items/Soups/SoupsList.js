import React from 'react';
import { useSelector } from 'react-redux';
import Soups from './Soups';

function SoupsList() {
  const menu = useSelector((state) => state.getMenuReducer.menu);

  return (
    <>
    { menu.map((menu) => <Soups key={menu.id} menu={menu} />) }
    </>
  );
}

export default SoupsList;
