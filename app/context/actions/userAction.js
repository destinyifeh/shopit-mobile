import { Alert } from "react-native";

import { requester } from "../../services/api";
import { deleteData, saveData } from "../../utils/storage";
import * as actionTypes from "./actionTypes";
export const addUser = async (value, dispatchUser, setValue, navigation) => {
  try {
    let res = await requester.post("/register-user", value);
    const { data } = res;
    let details = { userId: data.user._id, token: data.token };
    await saveData("token", details);
    setTimeout(() => {
      dispatchUser({ type: actionTypes.GET_USER, payload: data.user });

      setValue((prevState) => ({
        ...prevState,
        loading: false,
        username: "",
        email: "",
        password: "",
        password2: "",
      }));
      Alert.alert(null, "Success");
      navigation.reset({ index: 0, routes: [{ name: "home" }] });
    }, 2000);
  } catch (err) {
    console.log(err);
    dispatchUser({ type: actionTypes.ERROR, payload: err });
    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }
};

export const loginUser = async (
  value,
  dispatchUser,
  setValue,
  navigation,
  closeRBSheet
) => {
  try {
    let res = await requester.post("/login-user", value);
    const { data } = res;
    console.log(data, "data me");
    if (data.message === "user does not exist") {
      Alert.alert(null, "This user does not exist");
      setValue((prevState) => ({
        ...prevState,
        loading: false,
      }));
      return;
    } else if (data.message === "Invalid password") {
      Alert.alert(null, "Incorrect password");
      setValue((prevState) => ({
        ...prevState,
        loading: false,
      }));
      return;
    } else if (data.message === "too many requests") {
      Alert.alert(
        null,
        "You sent too many requests. Please wait a while then try again"
      );
      setValue((prevState) => ({
        ...prevState,
        loading: false,
      }));
      return;
    } else {
      let details = { userId: data.user._id, token: data.token };
      await saveData("token", details);
      setTimeout(() => {
        dispatchUser({ type: actionTypes.GET_USER, payload: data.user });
        setValue((prevState) => ({
          ...prevState,
          loading: false,
          user: "",
          password: "",
        }));
        Alert.alert(null, "Logged in");
        closeRBSheet("finalStep");
        navigation.reset({ index: 0, routes: [{ name: "home" }] });
      }, 2000);

      return;
    }
  } catch (err) {
    console.log(err);
    dispatchUser({ type: actionTypes.ERROR, payload: err });
    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
    return err;
  }
};

export const getUser = async (dispatchUser, token, userId) => {
  const securedToken = {
    token: token,
  };
  try {
    let res = await requester.post(`/single-user/${userId}`, securedToken);
    const { data } = res;
    if (data.code === 500 || data.message === "token expired") {
      Alert.alert(null, "Session expired, login");
      await deleteData("token");
      return;
    } else if (data.code === 401 || data.message === "invalid token") {
      Alert.alert(null, "Authentification failed, login");
      await deleteData("token");
      return;
    } else {
      dispatchUser({ type: actionTypes.GET_USER, payload: data });
    }
  } catch (err) {
    console.log(err, "getUser error");
    dispatchUser({ type: actionTypes.ERROR, payload: err });
  }
};

export const getUsers = async (value, dispatchUser) => {
  console.log(value, "calling users...");
  try {
    let res = await requester.get("/users");
    const { data } = res;
    dispatchUser({ type: actionTypes.GET_USERS, payload: data });
  } catch (err) {
    console.log(err, "getUsers error");
    dispatchUser({ type: actionTypes.ERROR, payload: err });
  }
};
export const deleteUser = async (dispatchUser, navigation, user) => {
  try {
    let res = await requester.delete(`/user/${user._id}`);
    const { data } = res;
    if (data === "User deleted") {
      await deleteData("token");
      dispatchUser({ type: actionTypes.GET_USER, payload: "" });
      Alert.alert(null, "Account successfully deactivated");
      navigation.reset({ index: 0, routes: [{ name: "home" }] });
    } else {
      return Alert.alert(null, "Oops!Something went wrong!");
    }
  } catch (err) {
    console.log(err);
    Alert.alert(null, "Oops! An error occurred, try again");
    dispatchUser({ type: actionTypes.ERROR, payload: err });
  }
};

export const updateUser = async (
  value,
  dispatchUser,
  setValue,
  closeRBSheet,
  user,
  navigation
) => {
  try {
    let res = await requester.patch(`/user/${user._id}`, value);
    const { data } = res;
    if (data.code === 500) {
      return Alert(null, "Oops! An error occured, try again");
    }

    setTimeout(() => {
      dispatchUser({ type: actionTypes.GET_USER, payload: data.user });

      setValue((prevState) => ({
        ...prevState,
        loading: false,
        email: "",
      }));
      closeRBSheet("updateAccount");
      Alert.alert(null, "Account updated");
      navigation.reset({ index: 0, routes: [{ name: "home" }] });
    }, 2000);
  } catch (err) {
    console.log(err, "update user err");

    dispatchUser({ type: actionTypes.ERROR, payload: err });
    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }
};

export const forgotPassword = async (
  value,
  dispatchUser,
  setValue,
  closeRBSheet
) => {
  try {
    let res = await requester.post("/user/forgot-pass", value);
    const { data } = res;

    dispatchUser({ type: actionTypes.GET_USER, payload: data.user });
    setValue((prevState) => ({
      ...prevState,
      loading: false,
      // email:"",
    }));
    closeRBSheet("verifyToken");
    Alert.alert(null, "Password reset email sent");
  } catch (err) {
    console.log(err, "an error occurred");
    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
    Alert.alert(null, "Oops an error occured, try again");
    dispatchUser({ type: actionTypes.ERROR, payload: err });
  }
};

export const verifyToken = async (
  value,
  dispatchUser,
  setValue,
  user,
  closeRBSheet
) => {
  try {
    let res = await requester.post(`/user-token/${user._id}`, value);
    const { data } = res;
    if (data.message === "Token is valid" || data.code === 200) {
      setTimeout(() => {
        setValue((prevState) => ({
          ...prevState,
          loading: false,
          token: "",
        }));
        closeRBSheet("resetPassword");
        Alert.alert(null, "Enter new password");
      }, 2000);
    } else {
      setValue((prevState) => ({
        ...prevState,
        loading: false,
      }));
      Alert.alert(null, "Password reset token is invalid or has expired");
    }
  } catch (err) {
    console.log(err, "token error");
    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
    Alert.alert(null, "Oops an error occured, try again");
    dispatchUser({ type: actionTypes.ERROR, payload: err });
  }
};

export const resetPassword = async (
  value,
  dispatchUser,
  setValue,
  user,
  navigation,
  closeRBSheet
) => {
  try {
    let res = await requester.patch(`/user/reset-password/${user._id}`, value);
    const { data } = res;
    if (data.code === 200) {
      let details = { userId: data.user._id, token: data.token };
      await saveData("token", details);

      setTimeout(() => {
        dispatchUser({ type: actionTypes.GET_USER, payload: data.user });

        setValue((prevState) => ({
          ...prevState,
          loading: false,
          password: "",
          password2: "",
        }));
        closeRBSheet("finalStep");
        Alert.alert(null, "Password successfully changed");
        navigation.reset({ index: 0, routes: [{ name: "home" }] });
      }, 2000);
    } else {
      setValue((prevState) => ({
        ...prevState,
        loading: false,
      }));
      return Alert.alert(null, "Something went wrong!");
    }
  } catch (err) {
    console.log(er, "new pass error");
    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
    dispatchUser({ type: actionTypes.ERROR, payload: err });
  }
};

export const logoutUser = async (navigation, dispatchUser) => {
  try {
    await deleteData("token");
    Alert.alert(null, "Logged out");
    dispatchUser({ type: actionTypes.GET_USER, payload: "" });

    navigation.reset({ index: 0, routes: [{ name: "home" }] });
  } catch (err) {
    console.log(err, "logout err");
  }
};
