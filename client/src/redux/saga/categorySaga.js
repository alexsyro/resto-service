import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getCategoryListAC } from '../actionCreators/categoryListAC';
import { SAGA_FETCH_CATEGORYLIST } from '../actionTypes/sagaTypes';
import {
  SAGA_FETCH_GET_CATEGORIES,
  SAGA_FETCH_ADD_CATEGORY,
  SAGA_FETCH_CHANGE_CATEGORY,
  SAGA_FETCH_DELETE_CATEGORY,
  SAGA_SET_CURRENT_CATEGORY,
  SAGA_FETCH_ADD_SUBCATEGORY,
  SAGA_SET_CURRENT_SUBCATEGORY,
  SAGA_FETCH_DELETE_SUBCATEGORY,
  SAGA_FETCH_CHANGE_SUBCATEGORY,
} from '../actionTypes/categoryTypes';
import {
  getCategoriesAC,
  addCategoryAC,
  changeCategoryAC,
  deleteCategoryAC,
  setCurrentCategoryAC,
  addSubCategoryAC,
  deleteSubCategoryAC,
  setCurrentSubCategoryAC,
  changeSubCategoryAC,
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
// CATEGORY
// Получаем список всех категорий с подкатегориями
const fetchGetCategories = async () => {
  try {
    const response = await fetch(`${REACT_APP_URL}api/categories`, { credentials: 'include' });
    const { categories } = await response.json();
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
  const response = await fetch(`${REACT_APP_URL}api/categories/${id}`, {
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
    yield put(deleteCategoryAC({ id: action.payload.id }));
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
    yield put(setCurrentCategoryAC({ id: action.payload.id }));
  } catch (error) {
    console.log(error);
  }
}
function* setCurrentCategoryWatcher() {
  yield takeEvery(SAGA_SET_CURRENT_CATEGORY, setCurrentCategoryWorker);
}

// SUBCATEGORY
// Добавляем новую подкатегорию
const fetchAddSubcategory = async (action) => {
  const { category, name } = action.payload;
  const response = await fetch(`${REACT_APP_URL}api/subcategories`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, name }),
  });
  const { subcategory } = await response.json();
  return subcategory;
};
function* addSubcategoryWorker(action) {
  try {
    const subcategory = yield call(fetchAddSubcategory, action);
    yield put(addSubCategoryAC({ subcategory }));
  } catch (error) {
    console.log(error);
  }
}
function* addSubcategoryWatcher() {
  yield takeEvery(SAGA_FETCH_ADD_SUBCATEGORY, addSubcategoryWorker);
}
// Меняем подкатегорию
const fetchChangeSubcategory = async (action) => {
  const { id, name } = action.payload;
  const response = await fetch(`${REACT_APP_URL}api/subcategories/${action.payload.id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  });
  const { subcategory } = await response.json();
  return subcategory;
};
function* changeSubcategoryWorker(action) {
  try {
    const subcategory = yield call(fetchChangeSubcategory, action);
    yield put(changeSubCategoryAC({ subcategory }));
  } catch (error) {
    console.log(error);
  }
}
function* changeSubcategoryWatcher() {
  yield takeEvery(SAGA_FETCH_CHANGE_SUBCATEGORY, changeSubcategoryWorker);
}
// Удаляем подкатегорию
const fetchDeleteSubcategory = async (action) => {
  const { id } = action.payload;
  const response = await fetch(`${REACT_APP_URL}api/subcategories/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  const { subcategory } = await response.json();
  return subcategory;
};
function* deleteSubcategoryWorker(action) {
  try {
    yield call(fetchDeleteSubcategory, action);
    yield put(deleteSubCategoryAC({ id: action.payload.id }));
  } catch (error) {
    console.log(error);
  }
}
function* deleteSubcategoryWatcher() {
  yield takeEvery(SAGA_FETCH_DELETE_SUBCATEGORY, deleteSubcategoryWorker);
}
// Устанавливаем подкатегорию
function* setCurrentSubcategoryWorker(action) {
  try {
    yield put(setCurrentSubCategoryAC({ id: action.payload.id }));
  } catch (error) {
    console.log(error);
  }
}
function* setCurrentSubcategoryWatcher() {
  yield takeEvery(SAGA_SET_CURRENT_SUBCATEGORY, setCurrentSubcategoryWorker);
}

export default function* CategorySaga() {
  yield all([
    getCategoriesSagaWatcher(),
    categorySaga(),
    addCategoryWatcher(),
    changeCategoryWatcher(),
    deleteCategoryWatcher(),
    setCurrentCategoryWatcher(),
    addSubcategoryWatcher(),
    changeSubcategoryWatcher(),
    deleteSubcategoryWatcher(),
    setCurrentSubcategoryWatcher(),
  ]);
}
