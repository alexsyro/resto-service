import { GET_USER } from "../actionTypes/actionType"

const initialState = { user: [] }

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload}

    default:
      return state;
  }
}

export default usersReducer
