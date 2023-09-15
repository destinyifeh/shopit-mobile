import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

export default function App() {
  // React.useEffect(() => {
  //   setTimeout(async () => {
  //     await SplashScreen.hideAsync();
  //   }, 3000);
  // }, []);
  SplashScreen.preventAutoHideAsync()
    .then((result) =>
      console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
    )
    .catch(console.warn);

  return <Redirect href="/home" />;
}
