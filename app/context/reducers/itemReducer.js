import * as actionTypes from "../actions/actionTypes";
export const itemInitialState = {
  items: [],
  item: "",
  pending: false,
  error: null,
  fulfilled: false,
  isItemError: false,
  isLoading: false,
  notifications: [],
};

export const itemReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return {
        ...state,
        pending: action.pending,
        fulfilled: action.fulfilled,
        items: [action.payload, ...state.items],
      };
    case actionTypes.GET_ITEMS:
      return {
        ...state,
        pending: action.pending,
        fulfilled: action.fulfilled,
        isLoading: action.isLoading,
        isItemError: action.isItemError,
        items: action.payload,
      };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        pending: action.pending,
        fulfilled: action.fulfilled,
        items: state.items.filter((item) => item._id !== action.payload.itemId),
      };
    case actionTypes.UPDATE_ITEM:
      return {
        ...state,
        pending: action.pending,
        fulfilled: action.fulfilled,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              title: action.payload.title,
              price: action.payload.price,
              desc: action.payload.desc,
              image: action.payload.image,
              likedBy: action.payload.likedBy,
            };
          }
          return item;
        }),
      };
    case actionTypes.PENDING:
      return {
        ...state,
        pending: action.payload,
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
        pending: action.pending,
        fulfilled: action.fulfilled,
        isLoading: action.isLoading,
        isItemError: action.isItemError,
      };
    case actionTypes.GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.payload, ...state.notifications],
      };
    case actionTypes.DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notify) => notify._id !== action.payload
        ),
      };
    case actionTypes.UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          if (notification._id === action.payload._id) {
            return {
              ...notification,
              message: action.payload.message,
              isRead: action.payload.isRead,
              readBy: action.payload.readBy,
            };
          }
          return notification;
        }),
      };
    default:
      return state;
  }
};
