import { Entypo } from "@expo/vector-icons";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addUser } from "../../context/actions/userAction";
import { StoreContext } from "../../context/store";
import { H2, H3 } from "../Tags";
import BottomSheet from "../bottomSheet";
export default function Signup({ refRBSheet, closeRBSheet }) {
  const inputRef = React.useRef();
  const navigation = useNavigation();
  const { dispatchUser, userState } = React.useContext(StoreContext);
  const initialState = {
    username: "",
    email: "",
    password: "",
    password2: "",
    loading: false,
  };
  const [value, setValue] = React.useState(initialState);
  const [errorMessage, setErrorMessage] = React.useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [userState]);

  const handleChange = (name, val) => {
    setValue((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSubmit = async () => {
    let error;
    setValue({ ...value, ["loading"]: true });
    if (!value.username) {
      error = "Please enter your username";
      setErrorMessage({
        ...errorMessage,
        email: "",
        password: "",
        password2: "",
        username: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.email) {
      error = "Please enter your email address";
      setErrorMessage({
        ...errorMessage,
        username: "",
        password: "",
        password2: "",
        email: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.password) {
      error = "Please enter your password";
      setErrorMessage({
        ...errorMessage,
        email: "",
        username: "",
        password2: "",
        password: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.password2) {
      error = "Please re-enter your password";
      setErrorMessage({
        ...errorMessage,
        email: "",
        username: "",
        password: "",
        password2: error,
      });
      setValue({ ...value, loading: false });
      return false;
    } else if (value.password?.length < 5) {
      error = "Please password should be at least 5 unique characters long";
      setErrorMessage({
        ...errorMessage,
        email: "",
        username: "",
        password2: "",
        password: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (value.password2 !== value.password) {
      error = "Password do not match";
      setErrorMessage({
        ...errorMessage,
        email: "",
        password: "",
        username: "",
        password2: error,
      });
      setValue({ ...value, loading: false });
      return false;
    } else {
      setErrorMessage("");
      //setErrorMessage({...errorMessage, email:"", username:"", password2:"", password:"" })

      await addUser(value, dispatchUser, setValue, navigation);
      return true;
    }
  };
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "100%" }}
    >
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <H2 style={{ textAlign: "center", marginBottom: 20 }}>Sign Up </H2>
        <KeyboardAvoidingView behavior="height">
          <Input
            label="Username"
            value={value?.username}
            leftIcon={<Entypo name="user" />}
            placeholder="Enter your username..."
            onChangeText={(val) => handleChange("username", val)}
            errorMessage={errorMessage.username ? errorMessage.username : ""}
          />
          <Input
            label="Email"
            value={value?.email}
            keyboardType="email-address"
            leftIcon={<Entypo name="email" />}
            placeholder="Enter your email..."
            onChangeText={(val) => handleChange("email", val)}
            errorMessage={errorMessage.email ? errorMessage.email : ""}
          />
          <Input
            label="Password"
            value={value?.password}
            leftIcon={<Entypo name="lock" />}
            placeholder="Enter your password..."
            secureTextEntry
            onChangeText={(val) => handleChange("password", val)}
            errorMessage={errorMessage.password ? errorMessage.password : ""}
          />
          <Input
            label="Confirm Password"
            value={value?.password2}
            leftIcon={<Entypo name="lock" />}
            placeholder="Re-enter your password..."
            secureTextEntry
            onChangeText={(val) => handleChange("password2", val)}
            errorMessage={errorMessage.password2 ? errorMessage.password2 : ""}
          />

          <Button
            loading={value.loading}
            uppercase={true}
            buttonStyle={{ borderRadius: 10, padding: 12 }}
            onPress={() => handleSubmit()}
          >
            Submit
          </Button>
          <View style={{ flexDirection: "row", marginVertical: 20 }}>
            <H3>Already have an account?</H3>
            <TouchableOpacity
              onPress={() => closeRBSheet("login")}
              style={{ marginLeft: 10 }}
            >
              <Text style={{ color: "blue", fontSize: 16 }}>Login Here</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </BottomSheet>
  );
}
