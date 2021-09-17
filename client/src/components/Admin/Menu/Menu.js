
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GET_MENU } from '../../../redux/actionTypes/actionType'
import SaladsList from './items/Salads/SaladsList'
import PizzaList from './items/Pizza/PizzaList'
import SoupsList from './items/Soups/SoupsList'
import PastaList from './items/Pasta/PastaList'
import DessertsList from './items/Desserts/DessertsList'
import CocktailsList from './items/Cocktails/CocktailsList'

function Menu() {

  const [actualCategory, setActualCategory] = useState('Салаты') // через useState меняем категорию меню и в зависимости от этого рендерим компонент

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_MENU, payload: data.slice(0, 10) }))
  }, [dispatch]) // запросом получаем все меню из бд

  return (
    <>
      <div onClick={() => setActualCategory('Салаты')}>Салаты</div>
      <div onClick={() => setActualCategory('Пицца')}>Пицца</div>
      <div onClick={() => setActualCategory('Cупы')}>Cупы</div>
      <div onClick={() => setActualCategory('Паста')}>Паста</div>
      <div onClick={() => setActualCategory('Десерты')}>Десерты</div>
      <div onClick={() => setActualCategory('Коктейли')}>Коктейли</div>

      {/* условный рендеринг ниже */}

      <div>{actualCategory === 'Салаты' && <SaladsList />} </div>
      <div>{actualCategory === 'Пицца' && <PizzaList />} </div>
      <div>{actualCategory === 'Cупы' && <SoupsList />} </div>
      <div>{actualCategory === 'Паста' && <PastaList />} </div>
      <div>{actualCategory === 'Десерты' && <DessertsList />} </div>
      <div>{actualCategory === 'Коктейли' && <CocktailsList />} </div>
    </>
  );
}

export default Menu;
