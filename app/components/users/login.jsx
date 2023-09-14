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
import { loginUser } from "../../context/actions/userAction";
import { StoreContext } from "../../context/store";
import { H2, H3 } from "../Tags";
import BottomSheet from "../bottomSheet";
export default function Login({ refRBSheet, closeRBSheet }) {
  const inputRef = React.useRef();
  const navigation = useNavigation();
  const { dispatchUser, userState } = React.useContext(StoreContext);
  const initialState = {
    user: "",
    password: "",
    loading: false,
  };
  const [value, setValue] = React.useState(initialState);
  const [errorMessage, setErrorMessage] = React.useState({
    username: "",
    password: "",
  });
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (name, val) => {
    console.log(val, "val");
    setValue({ ...value, [name]: val });
    console.log(value, "value");
  };

  const handleSubmit = async () => {
    let error;
    setValue({ ...value, loading: true });
    if (!value.user) {
      error = "Please enter your username or email";
      setErrorMessage({
        ...errorMessage,
        password: "",
        user: error,
      });
      setValue({ ...value, loading: false });
      return false;
    } else if (value.user?.length < 5) {
      error = "Please username or email should be at least 5 characters";
      setErrorMessage({
        ...errorMessage,
        password: "",
        user: error,
      });
      setValue({ ...value, loading: false });
      return false;
    } else if (!value.password) {
      error = "Please enter your password";
      setErrorMessage({
        ...errorMessage,
        user: "",
        password: error,
      });
      setValue({ ...value, loading: false });
      return false;
    } else {
      setErrorMessage("");
      console.log("logged in");
      await loginUser(value, dispatchUser, setValue, navigation, closeRBSheet);
      return true;
    }
  };
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "70%" }}
    >
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <H2 style={{ textAlign: "center", marginBottom: 20 }}>Login </H2>
        <KeyboardAvoidingView behavior="height">
          <Input
            value={value?.user}
            label="User"
            leftIcon={<Entypo name="user" />}
            placeholder="Enter your username or email..."
            onChangeText={(val) => handleChange("user", val)}
            errorMessage={errorMessage.user ? errorMessage.user : ""}
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
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() => closeRBSheet("forgotPassword")}
          >
            <Text style={{ color: "blue", fontSize: 16 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <Button
            loading={value.loading}
            uppercase={true}
            buttonStyle={{ borderRadius: 10, padding: 12 }}
            onPress={() => handleSubmit()}
          >
            Submit
          </Button>
          <View style={{ flexDirection: "row", marginVertical: 20 }}>
            <H3>Don't have an account yet?</H3>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => closeRBSheet("signup")}
            >
              <Text style={{ color: "blue", fontSize: 16 }}>Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </BottomSheet>
  );
}
