import { GET_CLIENTS, UPD_CLIENTS, DEL_CLIENTS } from '../actionTypes/actionType';

const initialState = { clients: [] };

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return { ...state, clients: action.payload.clients };

    case UPD_CLIENTS:
      return {
        ...state,
        clients: state.clients.map((client) => {
          if (client.id === action.payload.id) {
            return {
              ...client,
              name: action.payload.inputName,
              email: action.payload.inputEmail,
              phone: action.payload.inputPhone,
              discount: action.payload.inputDiscount,
            };
          } else {
            return client;
          }
        }),
      };

    case DEL_CLIENTS:
      return { ...state, clients: state.clients.filter((client) => client.id !== action.payload) };

    default:
      return state;
  }
};

export default clientsReducer;
