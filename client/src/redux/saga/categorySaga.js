import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getCategoryListAC } from '../actionCreators/categoryListAC';
import { SAGA_FETCH_CATEGORYLIST } from '../actionTypes/sagaTypes';
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  CHANGE_CATEGORY,
  DELETE_CATEGORY,
  SET_CURRENT_CATEGORY,
  ADD_SUBCATEGORY,
  CHANGE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  SET_CURRENT_SUBCATEGORY,
  SAGA_FETCH_GET_CATEGORIES,
  SAGA_FETCH_ADD_CATEGORY,
  SAGA_FETCH_CHANGE_CATEGORY,
  SAGA_FETCH_DELETE_CATEGORY,
  SAGA_SET_CURRENT_CATEGORY,
} from '../actionTypes/categoryTypes';
import {
  getCategoriesAC,
  addCategoryAC,
  changeCategoryAC,
  deleteCategoryAC,
  setCurrentCategoryAC,
} from '../actionCreators/categoriesAC';

const { REACT_APP_URL } = process.env;

const fetchCategoryList = async () => {
  const res = await fetch(`${REACT_APP_URL}api/menu/categories`, { credentials: 'include' });
  const resJson = await res.json();
  return resJson;
};

function* workerCategoryList() {
  try {
    const categoryList = yield call(fetchCategoryList);
    yield put(getCategoryListAC(categoryList));
  } catch (err) {
    console.error(err);
  }
}

function* categorySaga() {
  yield takeEvery(SAGA_FETCH_CATEGORYLIST, workerCategoryList);
}

// NEW SAGA
// Получаем список всех категорий с подкатегориями
const fetchGetCategories = async () => {
  try {
    const response = await fetch(`${REACT_APP_URL}api/categories`, { credentials: 'include' });
    const { categories } = await response.json();
    console.log('CAAAAAAAAAACACACAC', categories);
    return categories;
  } catch (err) {
    alert(err);
  }
};
function* getCategoriesWorker() {
  try {
    const categories = yield call(fetchGetCategories);
    yield put(getCategoriesAC({ categories }));
  } catch (err) {
    console.error(err);
  }
}
function* getCategoriesSagaWatcher() {
  yield takeEvery(SAGA_FETCH_GET_CATEGORIES, getCategoriesWorker);
}
// Добавляем новую категорию
const fetchAddCategory = async (action) => {
  const { name } = action.payload;
  const response = await fetch(`${REACT_APP_URL}api/categories`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  const { category } = await response.json();
  return category;
};
function* addCategoryWorker(action) {
  try {
    const category = yield call(fetchAddCategory, action);
    yield put(addCategoryAC({ category }));
  } catch (error) {
    console.log(error);
  }
}
function* addCategoryWatcher() {
  yield takeEvery(SAGA_FETCH_ADD_CATEGORY, addCategoryWorker);
}
// Меняем категорию
const fetchChangeCategory = async (action) => {
  const { id, name } = action.payload;
  const response = await fetch(`${REACT_APP_URL}api/categories/${action.payload.id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  });
  const { category } = await response.json();
  return category;
};
function* changeCategoryWorker(action) {
  try {
    const category = yield call(fetchChangeCategory, action);
    yield put(changeCategoryAC({ category }));
  } catch (error) {
    console.log(error);
  }
}
function* changeCategoryWatcher() {
  yield takeEvery(SAGA_FETCH_CHANGE_CATEGORY, changeCategoryWorker);
}
// Удаляем категорию
const fetchDeleteCategory = async (action) => {
  const { id } = action.payload;
  const response = await fetch(`${REACT_APP_URL}api/categories/${action.payload.id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  const { category } = await response.json();
  return category;
};
function* deleteCategoryWorker(action) {
  try {
    yield call(fetchDeleteCategory, action);
    yield put(deleteCategoryAC(action));
  } catch (error) {
    console.log(error);
  }
}
function* deleteCategoryWatcher() {
  yield takeEvery(SAGA_FETCH_DELETE_CATEGORY, deleteCategoryWorker);
}
// Устанавливаем
function* setCurrentCategoryWorker(action) {
  try {
    yield put(setCurrentCategoryAC(action.payload));
  } catch (error) {
    console.log(error);
  }
}
function* setCurrentCategoryWatcher() {
  yield takeEvery(SAGA_SET_CURRENT_CATEGORY, setCurrentCategoryWorker);
}

export default function* CategorySaga() {
  yield all([
    getCategoriesSagaWatcher(),
    categorySaga(),
    addCategoryWatcher(),
    changeCategoryWatcher(),
    deleteCategoryWatcher(),
    setCurrentCategoryWatcher(),
  ]);
}
