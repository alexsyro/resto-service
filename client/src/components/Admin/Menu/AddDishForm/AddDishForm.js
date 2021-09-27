import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_DISHES } from '../../../../redux/actionTypes/actionType';
import { useParams, useHistory } from 'react-router';
import dishIco from '../../../../images/dish_ico.png';
import styles from './AddDishForm.module.scss';

const { REACT_APP_URL } = process.env;

function AddDishForm() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const fileInput = useRef();
  const [img, setImg] = useState(dishIco);
  const measures = useSelector((state) => state.dishesReducer.measures);
  const history = useHistory();

  const fileUpload = (event) => {
    const [file] = event.target.files;
    if (file.size > 1000000) {
      alert(`Слишком большой файл, вы загрузили ${file.size / 1000} кб, максимум 1 МБ`);
      event.target.value = '';
    } else {
      let url = URL.createObjectURL(file);
      setImg(url);
    }
  };

  const addDish = (e) => {
    e.preventDefault();
    const formData = new FormData(); //делает то что отменяет prevent default но делаем
    //  это для того чтобы отправить данные в нужном формате

    const [file] = e.target.file.files;
    const { method, name, description, kcal, portionSize, price, measureId } = e.target;
    console.log(measureId.value, 'TARGET');
    formData.append('file', file);
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('kcal', kcal.value);
    formData.append('portionSize', portionSize.value);
    formData.append('categoryId', categoryId);
    formData.append('measureId', measureId.value);
    formData.append('price', price.value);

    fetch(`${REACT_APP_URL}api/menu`, {
      method,
      credentials: 'include',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_DISHES, action: data }))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={styles.form__block}>
      <form onSubmit={addDish} method='POST' name='AddDishForm' className={styles.form}>
        <fieldset className={styles.fieldsContainer}>
          <legend className='uk-legend' style={{ color: 'white' }}>
            Добавление нового блюда в меню
          </legend>
          <div className={styles.margin__left}>
            <img src={img} alt='Изображение для загрузки' />
            <div className={styles.buttonContainer}>
              <input
                visibility='hidden'
                ref={fileInput}
                onChange={fileUpload}
                type='file'
                name='file'
                accept='image/png, image/jpeg'
              />
              {img !== dishIco && (
                <button
                  onClick={() => {
                    setImg(dishIco);
                    fileInput.current.value = '';
                  }}
                  type='reset'
                >
                  Отмена
                </button>
              )}
            </div>
          </div>
          <div>
            <div className='uk-margin'>
              <input
                className='uk-input'
                type='text'
                name='name'
                placeholder='Введите название блюда'
                required
              />
            </div>
            <div className='uk-margin'>
              <input
                className='uk-input'
                type='text'
                name='description'
                placeholder='Добавьте описание'
                required
              />
            </div>
            <div className='uk-margin'>
              <input className='uk-input' type='number' name='kcal' placeholder='Введите  kcal' required />
            </div>
            <div className={`uk-margin ${styles.double__input}`}>
              <input
                className='uk-input'
                type='number'
                name='portionSize'
                placeholder='Введите размер порции'
                required
              />
              <select className={`uk-select ${styles.select__input}`} name='measureId'>
                {measures?.map((measure) => (
                  <option key={measure?.id} value={measure?.id}>
                    {measure?.type}
                  </option>
                ))}
              </select>
            </div>
            <div className='uk-margin'>
              <input className='uk-input' type='number' name='price' placeholder='Введите цену' required />
            </div>
            <div className={styles.center}>
              <button className={`uk-button uk-button-primary ${styles.submit__btn}`} type='submit'>
                Добавить
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  history.goBack();
                }}
                className={`uk-button uk-button-default ${styles.back_btn}`}
              >
                Назад
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default AddDishForm;
