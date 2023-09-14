//create initial state
// const initialState = {
//   loading: false,
//   darkTheme: false,
// };

//create a reducer function to handle state updates
// const reducer = (state, action) => {
//   console.log(state, "steee");
//   switch (action.type) {
//     case "LIGHT_THEME":
//       return {
//         darkTheme: false,
//       };
//     case "DARK_THEME":
//       return {
//         darkTheme: true,
//       };
//     default:
//       return state;
//   }
// };

//create a context provider component
// export const DataProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <DataContext.Provider value={{ state, dispatch }}>
//       {children}
//     </DataContext.Provider>
//   );
// };
