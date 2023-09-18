import { Entypo } from "@expo/vector-icons";
import { Button, Input } from "@rneui/themed";
import React from "react";
import { Alert, KeyboardAvoidingView, Linking, ScrollView } from "react-native";
import { H2 } from "./Tags";
import BottomSheet from "./bottomSheet";
export default function Contact({ refRBSheet, closeRBSheet }) {
  const initialState = {
    subject: "",
    message: "",
    loading: false,
  };
  const [value, setValue] = React.useState(initialState);
  const [errorMessage, setErrorMessage] = React.useState({
    subject: "",
    message: "",
  });

  const handleChange = (name, val) => {
    setValue({ ...value, [name]: val });
  };

  const handleSubmit = () => {
    let error;
    setValue({ ...value, ["loading"]: true });
    if (!value.subject) {
      error = "Please enter subject";
      setErrorMessage({
        ...errorMessage,
        message: "",

        ["email"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (value.subject?.length < 5) {
      error = "Please subject or title should be at least 5 characters";
      setErrorMessage({
        ...errorMessage,
        message: "",
        ["subject"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.message) {
      error = "Please enter your message";
      setErrorMessage({
        ...errorMessage,
        subject: "",
        ["message"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else {
      setTimeout(() => {
        setValue({ ...value, ["loading"]: false });
      }, 2000);
      setErrorMessage("");

      let url = `mailto:destechofficial@gmail.com?subject=${value.subject}&body=${value.message}`;
      Linking.openURL(url)
        .then((res) => {
          console.log("Email opened", res);
          if (res === true) {
            refRBSheet.current?.close();
          }
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(null, "Oops! An error occured, try again.");
        });
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
            value={value?.subject}
            label="Subject"
            leftIcon={<Entypo name="pencil" />}
            placeholder="Enter subject/title..."
            onChangeText={(val) => handleChange("subject", val)}
            errorMessage={errorMessage.subject ? errorMessage.subject : ""}
          />

          <Input
            label="Message"
            value={value?.message}
            leftIcon={<Entypo name="message" />}
            placeholder="Enter your message..."
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
