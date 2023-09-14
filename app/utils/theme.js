export const themeBackgroundColor = (state) => {
  // const { state } = useContext(StoreContext);

  const backgroundColor = state.darkTheme ? "#121212" : "white";
  return backgroundColor;
};

export const themeColor = (state) => {
  //const { state } = useContext(StoreContext);

  const color = state.darkTheme ? "white" : "black";
  return color;
};
