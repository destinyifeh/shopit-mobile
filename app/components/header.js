import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import React, { useContext } from "react";

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-ui-lib";
import { StoreContext } from "../context/store";
import { requester } from "../services/api";
import TheMarquee from "./Marquee";
import { H2 } from "./Tags";
import { Nav } from "./nav";
import { SearchBar } from "./searchBar";
import SearchItem from "./searchItem";
import ForgotPassword from "./users/forgot-passsword";
import Login from "./users/login";
import ResetPassword from "./users/reset-password";
import Signup from "./users/signup";
import VerifyToken from "./users/verify-token";
export default function Header(props) {
  const { state, userState, dispatchItem, itemState } =
    useContext(StoreContext);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [notificationRecord, setNotificationRecord] = React.useState("");
  const refRBSheet = React.useRef();
  const searchRefRBSheet = React.useRef();

  const loginRef = React.useRef();
  const signupRef = React.useRef();
  const forgotPasswordRef = React.useRef();
  const resetPasswordRef = React.useRef();
  const verifyRef = React.useRef();

  const navigation = useNavigation();
  const { notifications } = itemState;
  const { user } = userState;

  React.useEffect(() => {
    getNotify();
  }, [notifications, user]);
  const handleSearch = () => {
    if (!query) {
      Alert.alert(null, "You can't submit empty form");
      return;
    } else {
      searchRefRBSheet.current?.open();
      setLoading(true);
    }
  };
  const getNotify = async () => {
    let res = await requester.get("/notifications");
    const { data } = res;
    const myNotifications = data?.filter((item) => item.readBy !== user._id);

    setNotificationRecord(myNotifications);
  };

  const username = userState?.user?.username;

  const guestAlert = (value) => {
    return Alert.alert(null, value, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Login",
        onPress: () => loginRef.current?.open(),
      },
    ]);
  };

  const closeRBSheet = (route) => {
    if (route === "login") {
      loginRef.current?.open();
      signupRef.current?.close();
      forgotPasswordRef.current?.close();
    } else if (route === "signup") {
      signupRef.current?.open();
      loginRef.current?.close();
    } else if (route === "forgotPassword") {
      forgotPasswordRef.current?.open();
      loginRef.current?.close();
      verifyRef.current?.close();
      resetPasswordRef.current?.close();
    } else if (route === "verifyToken") {
      verifyRef.current?.open();
      forgotPasswordRef.current?.close();
    } else if (route === "resetPassword") {
      verifyRef.current?.close();
      resetPasswordRef.current?.open();
    } else if (route === "finalStep") {
      resetPasswordRef.current?.close();
      loginRef.current?.close();
    } else if (route === "updateAccount") {
      updateAccountRef.current?.close();
    } else {
      return null;
    }
  };

  return (
    <View
      style={{
        marginTop: 50,
        backgroundColor: state.darkTheme ? "#121212" : "white",
      }}
    >
      <View style={headerStyles.view}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            // label=""
            labelColor={state.darkTheme ? "black" : "white"}
            backgroundColor={state.darkTheme ? "white" : "black"}
            name={username ? username : "G"}
            containerStyle={{ marginLeft: 5 }}
            onPress={() => refRBSheet.current?.open()}
          />
          <H2
            style={{
              left: 6,
              fontWeight: "bold",
              color: props.state.darkTheme ? "white" : "black",
              textTransform: "capitalize",
            }}
          >
            Hi, {username ? username : "Guest"} 👏{" "}
          </H2>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 70,
            padding: 8,
          }}
          onPress={() =>
            !user._id
              ? guestAlert("Login to view notifications")
              : navigation.navigate("notification")
          }
        >
          <Text
            style={{
              position: "absolute",
              left: 30,
              color: "red",
              fontWeight: "bold",
              fontSize: 16,
              zIndex: 1,
            }}
          >
            {username ? notificationRecord?.length : null}
          </Text>
          <Ionicons
            size={30}
            name="notifications-sharp"
            color={props.state.darkTheme ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          position: "absolute",
          top: 70,
          alignSelf: "center",
          left: 75,
          paddingTop: 10,
          color: props.state.darkTheme ? "white" : "black",
        }}
      >
        Discover the best in town...
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <SearchBar
          value={query}
          onPress={() => handleSearch()}
          onChangeText={(value) => setQuery(value)}
          state={state}
        />
        <TouchableOpacity
          onPress={() => refRBSheet.current?.open()}
          style={{
            backgroundColor: "black",
            borderRadius: 50,
            padding: 10,
          }}
        >
          <Ionicons
            name="options"
            size={30}
            color={state.darkTheme ? "white" : "white"}
            style={{ textAlign: "center" }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TheMarquee state={state} />
        <Nav refRBSheet={refRBSheet} />
        <Login refRBSheet={loginRef} closeRBSheet={closeRBSheet} />
        <Signup refRBSheet={signupRef} closeRBSheet={closeRBSheet} />
        <ForgotPassword
          refRBSheet={forgotPasswordRef}
          closeRBSheet={closeRBSheet}
        />
        <ResetPassword
          refRBSheet={resetPasswordRef}
          closeRBSheet={closeRBSheet}
        />
        <VerifyToken refRBSheet={verifyRef} closeRBSheet={closeRBSheet} />
        <SearchItem
          loading={loading}
          setLoading={setLoading}
          query={query}
          refRBSheet={searchRefRBSheet}
          setQuery={setQuery}
        />
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  view: {
    flexDirection: "row",
    marginVertical: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
