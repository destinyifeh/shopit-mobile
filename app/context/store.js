import React, { createContext, useMemo, useReducer } from "react";
import { itemInitialState, itemReducer } from "./reducers/itemReducer";
import { themeInitialState, themeReducer } from "./reducers/themeReducer";
import { userInitialState, userReducer } from "./reducers/userReducer";
//create a new context
export const StoreContext = createContext();

//create a context provider component

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, themeInitialState);
  const [itemState, dispatchItem] = useReducer(itemReducer, itemInitialState);
  const [userState, dispatchUser] = useReducer(userReducer, userInitialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      itemState,
      dispatchItem,
      userState,
      dispatchUser,
    }),
    [state, dispatch, itemState, dispatchItem, userState, dispatchUser]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
