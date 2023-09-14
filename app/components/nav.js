import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useContext } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Switch } from "react-native-ui-lib";
import { deleteUser, logoutUser } from "../context/actions/userAction";
import { StoreContext } from "../context/store";
import { themeBackgroundColor } from "../utils/theme";
import { H3 } from "./Tags";
import About from "./about";
import BottomSheet from "./bottomSheet";
import Contact from "./contact";
import AccountInfo from "./users/account-info";
import ForgotPassword from "./users/forgot-passsword";
import Login from "./users/login";
import ResetPassword from "./users/reset-password";
import Signup from "./users/signup";
import UpdateUserAccount from "./users/update-user";
import VerifyToken from "./users/verify-token";
export const Nav = ({ refRBSheet }) => {
  const { state, userState, dispatch, dispatchUser } = useContext(StoreContext);
  const [toggleTheme, setToggleTheme] = React.useState(false);
  const loginRef = React.useRef();
  const signupRef = React.useRef();
  const forgotPasswordRef = React.useRef();
  const resetPasswordRef = React.useRef();
  const verifyRef = React.useRef();
  const updateAccountRef = React.useRef();

  const contactRef = React.useRef();
  const aboutRef = React.useRef();
  const accountInfoRef = React.useRef();
  const navigation = useNavigation();

  React.useEffect(() => {
    console.log(state.lightTheme, "state is light");
  }, []);

  const handleTheme = (val) => {
    setToggleTheme(val);
    if (state.darkTheme) {
      dispatch({
        type: "LIGHT_THEME",
        // payload: val,
      });
    } else {
      dispatch({
        type: "DARK_THEME",
        //payload: val,
      });
    }
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

  const logout = async () => {
    const { user } = userState;
    Alert.alert(
      `Hi ${user && user.username}`,
      " Do you want to logout?",

      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => await logoutUser(navigation, dispatchUser),
        },
      ]
    );
  };
  const { user } = userState;
  const deactivateAccount = () => {
    Alert.alert(
      `Hi ${userState?.user?.username}`,
      " Do you want to deactivate your account?",

      [
        {
          text: "Yes",

          onPress: async () => await deleteUser(dispatchUser, navigation, user),
        },

        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };
  const username = userState?.user?.username;

  return (
    <>
      <BottomSheet
        refRBSheet={refRBSheet}
        style={{
          height: "100%",
          //backgroundColor: state.darkTheme ? "#121212" : "white",
          backgroundColor: themeBackgroundColor(state),
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: state.darkTheme ? "#121212" : "white",
          }}
        >
          <TouchableOpacity
            style={{ paddingLeft: 5 }}
            onPress={() => refRBSheet.current?.close()}
          >
            <EvilIcons
              name="arrow-left"
              size={30}
              color={state.darkTheme ? "white" : "black"}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              marginTop: 10,
            }}
          >
            <View>
              <H3
                style={{
                  color: state.darkTheme ? "white" : "black",
                  textTransform: "capitalize",
                }}
              >
                {username ? username : "Guest"}
              </H3>
              <Text style={{ color: state.darkTheme ? "white" : "black" }}>
                {username ? "Personal account" : "Explore"}
              </Text>
            </View>
            <TouchableOpacity>
              <Avatar
                labelColor={state.darkTheme ? "black" : "white"}
                backgroundColor={state.darkTheme ? "white" : "black"}
                name={username ? username : "G"}
                containerStyle={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <H3
              style={{
                padding: 10,
                color: state.darkTheme ? "white" : "black",
              }}
            >
              Company
            </H3>
            <View
              style={{
                backgroundColor: state.darkTheme ? "#121212" : "white",
                margin: 10,
                elevation: 5,
                padding: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => aboutRef.current?.open()}
              >
                <Ionicons
                  name="information"
                  size={30}
                  color={state.darkTheme ? "white" : "black"}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: state.darkTheme ? "white" : "black",
                  }}
                >
                  About
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => contactRef.current?.open()}
              >
                <EvilIcons
                  name="envelope"
                  size={30}
                  color={state.darkTheme ? "white" : "black"}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: state.darkTheme ? "white" : "black",
                  }}
                >
                  Contact
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "products" }],
                  })
                }
              >
                <EvilIcons
                  name="archive"
                  size={30}
                  color={state.darkTheme ? "white" : "black"}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: state.darkTheme ? "white" : "black",
                  }}
                >
                  Products
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <H3
              style={{
                padding: 10,
                color: state.darkTheme ? "white" : "black",
              }}
            >
              {" "}
              Account
            </H3>
            <View
              style={{
                backgroundColor: state.darkTheme ? "#121212" : "white",

                margin: 10,
                elevation: 5,
                padding: 5,
              }}
            >
              {!user?.username ? (
                <>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => loginRef.current?.open()}
                  >
                    <EvilIcons
                      name="arrow-right"
                      size={30}
                      color={state.darkTheme ? "white" : "black"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: state.darkTheme ? "white" : "black",
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => signupRef.current?.open()}
                  >
                    <EvilIcons
                      name="arrow-right"
                      size={30}
                      color={state.darkTheme ? "white" : "black"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: state.darkTheme ? "white" : "black",
                      }}
                    >
                      Create account
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => logout()}
                  >
                    <EvilIcons
                      name="arrow-right"
                      size={30}
                      color={state.darkTheme ? "white" : "black"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: state.darkTheme ? "white" : "black",
                      }}
                    >
                      Logout
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => accountInfoRef.current?.open()}
                  >
                    <Feather
                      name="info"
                      size={25}
                      color={state.darkTheme ? "white" : "black"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: state.darkTheme ? "white" : "black",
                      }}
                    >
                      Account info
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => updateAccountRef.current?.open()}
                  >
                    <Feather
                      name="user"
                      size={25}
                      color={state.darkTheme ? "white" : "black"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: state.darkTheme ? "white" : "black",
                      }}
                    >
                      Update account
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => deactivateAccount()}
                  >
                    <EvilIcons
                      name="trash"
                      size={30}
                      color={state.darkTheme ? "white" : "black"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: state.darkTheme ? "white" : "black",
                      }}
                    >
                      Deactivate account
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <View>
            <H3
              style={{
                padding: 10,
                color: state.darkTheme ? "white" : "black",
              }}
            >
              Basic
            </H3>
            <View
              style={{
                backgroundColor: state.darkTheme ? "#121212" : "white",

                margin: 10,
                elevation: 5,
                padding: 5,
              }}
            >
              {user.username === "admin" && (
                <TouchableOpacity
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.reset({ index: 0, routes: [{ name: "admin" }] })
                  }
                >
                  <MaterialIcons
                    name="admin-panel-settings"
                    size={30}
                    color={state.darkTheme ? "white" : "black"}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: state.darkTheme ? "white" : "black",
                    }}
                  >
                    Admin
                  </Text>
                </TouchableOpacity>
              )}
              {user?.username && (
                <>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() =>
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "likes" }],
                      })
                    }
                  >
                    <EvilIcons
                      name="like"
                      size={30}
                      color={state.darkTheme ? "grey" : "black"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: state.darkTheme ? "grey" : "black",
                      }}
                    >
                      Likes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("notification")}
                  >
                    <EvilIcons
                      name="bell"
                      size={30}
                      color={state.darkTheme ? "white" : "black"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,

                        color: state.darkTheme ? "white" : "black",
                      }}
                    >
                      Notifications
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <Feather
                    name="sun"
                    size={20}
                    color={state.darkTheme ? "white" : "black"}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: state.darkTheme ? "white" : "black",
                    }}
                  >
                    Theme
                  </Text>
                </View>
                <TouchableOpacity>
                  <Switch
                    value={toggleTheme}
                    onValueChange={(val) => handleTheme(val)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
      <Login
        forgotPasswordRef={forgotPasswordRef}
        refRBSheet={loginRef}
        closeRBSheet={closeRBSheet}
      />
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
      <Contact refRBSheet={contactRef} />
      <About refRBSheet={aboutRef} />
      <AccountInfo refRBSheet={accountInfoRef} user={userState?.user} />
      <UpdateUserAccount
        refRBSheet={updateAccountRef}
        user={userState?.user}
        closeRBSheet={closeRBSheet}
      />
    </>
  );
};
