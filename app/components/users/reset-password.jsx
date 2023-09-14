import { Entypo } from "@expo/vector-icons";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { resetPassword } from "../../context/actions/userAction";
import { StoreContext } from "../../context/store";
import { H2 } from "../Tags";
import BottomSheet from "../bottomSheet";
export default function ResetPassword({ refRBSheet, closeRBSheet }) {
  const navigation = useNavigation();
  const initialState = {
    password: "",
    password2: "",
    loading: false,
  };
  const [value, setValue] = React.useState(initialState);
  const [errorMessage, setErrorMessage] = React.useState({
    password: "",
    password2: "",
  });
  const { userState, dispatchUser } = React.useContext(StoreContext);
  const handleChange = (name, val) => {
    setValue({ ...value, [name]: val });
  };

  const handleSubmit = async () => {
    let error;
    const { user } = userState;

    setValue({ ...value, ["loading"]: true });
    if (!value.password) {
      error = "Please enter your password";
      setErrorMessage({
        ...errorMessage,
        password2: "",
        ["password"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.password2) {
      error = "Please re-enter your password";
      setErrorMessage({
        ...errorMessage,
        password: "",
        ["password2"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (value.password2 !== value.password) {
      error = "Password do not match";
      setErrorMessage({
        ...errorMessage,
        password: "",
        ["password2"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else {
      setErrorMessage("");
      await resetPassword(
        value,
        dispatchUser,
        setValue,
        user,
        navigation,
        closeRBSheet
      );
    }
  };
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "70%" }}
    >
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <H2 style={{ textAlign: "center", marginBottom: 20 }}>
          Reset Password{" "}
        </H2>
        <KeyboardAvoidingView behavior="height">
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
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() => (
              closeRBSheet("forgotPassword"), refRBSheet.current?.close()
            )}
          >
            <Text style={{ color: "blue", fontSize: 16 }}>Go Back</Text>
          </TouchableOpacity>
          <Button
            loading={value.loading}
            uppercase={true}
            buttonStyle={{ borderRadius: 10, padding: 12 }}
            onPress={() => handleSubmit()}
          >
            Submit
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </BottomSheet>
  );
}
