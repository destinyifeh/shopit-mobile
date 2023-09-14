import * as actionTypes from "../actions/actionTypes";
//create initial state
export const themeInitialState = {
  loading: false,
  // lightTheme: true,
  darkTheme: false,
};

//create a reducer function to handle state updates
export const themeReducer = (state, action) => {
  console.log(state, "steee");
  switch (action.type) {
    case actionTypes.LIGHT_THEME:
      return {
        darkTheme: false,
      };
    case actionTypes.DARK_THEME:
      return {
        darkTheme: true,
      };
    default:
      return state;
  }
};
