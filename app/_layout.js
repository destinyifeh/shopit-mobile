import { Stack } from "expo-router";
import { StoreProvider } from "./context/store";
export default () => {
  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen
          name="notification"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </StoreProvider>
  );
};
