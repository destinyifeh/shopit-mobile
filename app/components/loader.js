import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Loader = ({ setLoading, style }) => {
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", ...style }}>
      <ActivityIndicator size={30} color="black" />
    </View>
  );
};
