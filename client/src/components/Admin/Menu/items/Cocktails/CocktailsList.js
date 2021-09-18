import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Cocktails from './Cocktails';

function CocktailsList() {
  const menu = useSelector((state) => state.getMenuReducer.menu);

  return (
    <>
    { menu.map((menu) => <Cocktails key={menu.id} menu={menu} />) }
    <Link to={'/addcocktail'} className="uk-button uk-button-default">Добавить коктейль</Link>
    </>
  );
}

export default CocktailsList;
