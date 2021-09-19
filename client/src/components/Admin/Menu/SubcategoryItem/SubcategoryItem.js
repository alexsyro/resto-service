import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {GET_DISHES} from '../../../../redux/actionTypes/actionType'

function SubcategoryItem(props) {

  const dispatch = useDispatch();
  const { categoryId } = useParams()

  useEffect(() => {
    fetch('http://localhost:1234/api/menu/categories/' + categoryId)
      .then((res) => res.json())
      .then((categories) => dispatch({ type: GET_DISHES, payload: categories }))
  }, [dispatch, categoryId]);

  return (
    <div>
      SubcategoryItem
    </div>
  );
}

export default SubcategoryItem;
