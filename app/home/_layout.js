import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, useNavigation } from "expo-router";
import React, { useContext } from "react";
import Header2 from "../components/header2";
import { getItems, getNotifications } from "../context/actions/itemAction";
import { getUser } from "../context/actions/userAction";
import { StoreContext } from "../context/store";
import { getData } from "../utils/storage";
import { themeBackgroundColor } from "../utils/theme";
export default () => {
  const navigation = useNavigation();
  const { state, dispatchItem, itemState, dispatchUser, userState } =
    useContext(StoreContext);

  React.useEffect(() => {
    dispatchItem(getItems(dispatchItem));
    dispatchItem(getNotifications(dispatchItem));

    getToken();
  }, []);

  const getToken = async () => {
    let res = await getData("token");
    if (res) {
      const { token, userId } = res;
      if (token) {
        dispatchUser(getUser(dispatchUser, token, userId));
      }
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: themeBackgroundColor(state) },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabelPosition: "below-icon",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          //headerShown: false,
          header: (props) => <Header2 {...props} />,
          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name="cart-sharp"
              size={size}
              color={color}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "cart" }],
                })
              }
            />
          ),
          //tabBarBadge: 0,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          header: (props) => <Header2 {...props} />,

          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="account-balance-wallet"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: "likes",
          header: (props) => <Header2 {...props} />,

          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          header: (props) => <Header2 {...props} />,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="admin"
        options={{
          href: userState.user.username === "admin" ? undefined : null,
          title: "Admin",
          header: (props) => <Header2 {...props} />,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="admin-panel-settings"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};
