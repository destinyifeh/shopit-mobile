import { Entypo } from "@expo/vector-icons";
import { Button, Input } from "@rneui/themed";
import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { H2 } from "./Tags";
import BottomSheet from "./bottomSheet";
export default function Contact({ refRBSheet, closeRBSheet }) {
  const initialState = {
    email: "",
    message: "",
    loading: false,
  };
  const [value, setValue] = React.useState(initialState);
  const [errorMessage, setErrorMessage] = React.useState({
    email: "",
    message: "",
  });

  const handleChange = (name, val) => {
    setValue({ ...value, [name]: val });
  };

  const handleSubmit = () => {
    let error;
    setValue({ ...value, ["loading"]: true });
    if (!value.email) {
      error = "Please enter your email";
      setErrorMessage({
        ...errorMessage,
        message: "",

        ["email"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (value.email?.length < 5) {
      error = "Please email should be at least 5 characters";
      setErrorMessage({
        ...errorMessage,
        message: "",
        ["email"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.message) {
      error = "Please enter your message";
      setErrorMessage({
        ...errorMessage,
        email: "",
        ["message"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else {
      setTimeout(() => {
        setValue({ ...value, ["loading"]: false });
      }, 2000);
      setErrorMessage("");
    }
  };
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "65%" }}
    >
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <H2 style={{ textAlign: "center", marginBottom: 20 }}>Text Us </H2>
        <KeyboardAvoidingView behavior="height">
          <Input
            value={value?.email}
            keyboardType="email-address"
            label="Email"
            leftIcon={<Entypo name="email" />}
            placeholder="Enter your email..."
            onChangeText={(val) => handleChange("email", val)}
            errorMessage={errorMessage.email ? errorMessage.email : ""}
          />
          <Input
            label="Message"
            value={value?.message}
            leftIcon={<Entypo name="message" />}
            placeholder="Enter your message..."
            secureTextEntry
            onChangeText={(val) => handleChange("message", val)}
            errorMessage={errorMessage.message ? errorMessage.message : ""}
          />

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
