import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { StoreContext } from "../context/store";
import { themeColor } from "../utils/theme";
export default function Header2(props) {
  const { state } = useContext(StoreContext);
  const navigation = useNavigation();
  const { route } = props;

  useEffect(() => {}, []);
  return (
    <View
      style={{
        backgroundColor: state.darkTheme ? "#121212" : "white",
        padding: 20,
        elevation: 5,
      }}
    >
      <View style={{ marginTop: 45 }}>
        {route.name === "cart" && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: state.darkTheme ? "white" : "black",
            }}
          >
            {route.params ? "Item Details" : "Cart Items"}
          </Text>
        )}
        {route.name === "products" && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: state.darkTheme ? "white" : "black",
            }}
          >
            Products
          </Text>
        )}
        {route.name === "notification-home" && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: state.darkTheme ? "white" : "black",
            }}
          >
            Notifications
          </Text>
        )}
        {route.name === "[notificationId]" && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: state.darkTheme ? "white" : "black",
            }}
          >
            Notification detail
          </Text>
        )}
        {route.name === "profile" && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: state.darkTheme ? "white" : "black",
            }}
          >
            Personal details
          </Text>
        )}
        {route.name === "likes" && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: state.darkTheme ? "white" : "black",
            }}
          >
            {" "}
            Likes
          </Text>
        )}
        {route.name === "admin" && (
          <Text
            style={{
              color: themeColor(state),
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Admin Dashboard
          </Text>
        )}
        <EvilIcons
          size={30}
          name="arrow-left"
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate("home")
          }
          style={{
            textAlign: "left",
            position: "absolute",
            top: 0,
            zIndex: 1,
          }}
          color={state.darkTheme ? "white" : "black"}
        />
      </View>
    </View>
  );
}
