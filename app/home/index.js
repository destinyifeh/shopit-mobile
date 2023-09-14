import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { Suspense, useContext } from "react";
import { Text, View } from "react-native";
const Header = React.lazy(() => import("../components/header"));
//import Header from "../components/header";
import { StoreContext } from "../context/store";
import Items from "../items";
export default function HomePage() {
  const { state, itemState, dispatchItem } = useContext(StoreContext);

  const navigation = useNavigation();
  React.useEffect(() => {}, [itemState]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: state.darkTheme ? "#121212" : "white",
      }}
    >
      <StatusBar
        backgroundColor={state.darkTheme ? "#121212" : "white"}
        style={state.darkTheme ? "light" : "dark"}
      />
      <Suspense fallback={<Text>Header loading...</Text>}>
        <Header state={state} />
      </Suspense>
      <Items state={state} />
    </View>
  );
}
