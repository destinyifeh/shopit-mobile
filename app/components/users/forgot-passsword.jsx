import { Entypo } from "@expo/vector-icons";
import { Button, Input } from "@rneui/themed";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { forgotPassword } from "../../context/actions/userAction";
import { StoreContext } from "../../context/store";
import { H2 } from "../Tags";
import BottomSheet from "../bottomSheet";

export default function ForgotPassword({ refRBSheet, closeRBSheet }) {
  const initialState = {
    email: "",
    loading: false,
  };
  const [value, setValue] = React.useState(initialState);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { dispatchUser, userState } = React.useContext(StoreContext);

  const handleChange = (name, val) => {
    setValue({ ...value, [name]: val });
  };

  const handleSubmit = async () => {
    let error;
    setValue({ ...value, ["loading"]: true });
    if (!value.email) {
      error = "Please enter your email";
      setErrorMessage(error);
      setValue({ ...value, ["loading"]: false });
      return false;
    } else {
      setErrorMessage("");
      await forgotPassword(value, dispatchUser, setValue, closeRBSheet);
    }
  };
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "60%" }}
    >
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <H2 style={{ textAlign: "center", marginBottom: 20 }}>
          {" "}
          Request Password Reset{" "}
        </H2>
        <KeyboardAvoidingView behavior="height">
          <Input
            value={value?.email}
            label="Email"
            leftIcon={<Entypo name="email" />}
            placeholder="Enter your email..."
            onChangeText={(val) => handleChange("email", val)}
            errorMessage={errorMessage ? errorMessage : ""}
          />
          <TouchableOpacity
            style={{ marginBottom: 25 }}
            onPress={() => closeRBSheet("login")}
          >
            <Text style={{ color: "blue", fontSize: 16 }}>Back to Login</Text>
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
