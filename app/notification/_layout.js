import { Stack } from "expo-router";

import Header2 from "../components/header2";
export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="notification-home"
        options={{
          header: (props) => <Header2 {...props} />,
        }}
        // options={({ navigation }) => ({
        //   headerTitle: () => (
        //     <Text style={{ marginLeft: 70 }}>Notifications</Text>
        //   ),
        //   headerLeft: () => (
        //     <EvilIcons
        //       name="arrow-left"
        //       size={30}
        //       onPress={() =>
        //         navigation.reset({
        //           index: 0,
        //           routes: [{ name: "home" }],
        //         })
        //       }
        //     />
        //   ),
        //   headerBackVisible: false,
        // })}
      />
      <Stack.Screen
        name="[notificationId]"
        options={{
          //headerShown: false,
          header: (props) => <Header2 {...props} />,
        }}
      />
    </Stack>
  );
};
