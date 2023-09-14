import * as actionTypes from "../actions/actionTypes";
export const userInitialState = {
  users: [],
  user: "",
  error: null,
  fulfilled: null,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload._id),
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              email: action.payload.email,
            };
          }
          return item;
        }),
      };
    case actionTypes.FULFILLED:
      return {
        ...state,
        fulfilled: action.payload,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.payload,
        fulfilled: action.fulfilled,
      };
    default:
      return state;
  }
};
