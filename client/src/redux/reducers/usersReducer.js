import { GET_USER } from "../actionTypes/actionType"

const initialState = { user: {isAuth: false} }

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: {...action.payload, isAuth: true} }

    default:
      return state;
  }
}

export default usersReducer
