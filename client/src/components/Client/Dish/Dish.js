import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartAddPositionAC, cartUpdateTotalAC } from '../../../redux/actionCreators/cartAC'
import styles from './Dish.module.scss'

function Dish({ dish }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.usersReducer)
  const dishes = useSelector((state) => state.dishesReducer.dishes)

  let { data } = dish['File.data']
  let base64 = new Buffer(data).toString('base64')
  let type = dish['File.type']

  const addToCart = () => {
    const currentDish = dishes.find((item) => item.id === +dish.id)
    const payload = {
      id: currentDish.id,
      name: currentDish.name,
      price: currentDish.price,
    }
    dispatch(cartAddPositionAC(payload))
    dispatch(cartUpdateTotalAC());
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={`data:${type};base64,${base64}`}
        alt="IMG"
      />
      <p className={styles.dish_title}>{dish.name}</p>
      <div className={styles.additional__info}>
        <p className={styles.description}>{dish.description}</p>
        <p className={styles.kcal}>Ккал: {dish.kcal}</p>
        <p className={styles.portionSize}>Размер порции: {dish.portionSize}</p>
      </div>
      <p className={styles.text}> Цена: {dish.price}</p>
      {user?.isAuth && (
        <button className={styles.dish_button} onClick={addToCart} type="text">
          Добавить в корзину
        </button>
      )}
    </div>
  )
}

export default Dish
