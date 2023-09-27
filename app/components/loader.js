import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StoreContext } from "../context/store";
export const Loader = ({ setLoading, style, isProduct }) => {
  const { state } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (!isProduct) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", ...style }}>
      <ActivityIndicator
        size={30}
        color={state.darkTheme ? "white" : "black"}
      />
    </View>
  );
};
