import { Entypo } from "@expo/vector-icons";
import { Button, Input } from "@rneui/themed";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { verifyToken } from "../../context/actions/userAction";
import { StoreContext } from "../../context/store";
import { H2 } from "../Tags";
import BottomSheet from "../bottomSheet";
export default function VerifyToken({ refRBSheet, closeRBSheet }) {
  const initialState = {
    token: "",
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
    const { user } = userState;

    setValue({ ...value, ["loading"]: true });
    if (!value.token) {
      error = "Please enter verify code";
      setErrorMessage(error);
      setValue({ ...value, ["loading"]: false });
      return false;
    } else {
      setErrorMessage("");
      await verifyToken(value, dispatchUser, setValue, user, closeRBSheet);
    }
  };
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "60%" }}
    >
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <H2 style={{ textAlign: "center", marginBottom: 20 }}> Verify Code </H2>
        <KeyboardAvoidingView behavior="height">
          <Input
            value={value?.token}
            label="Code"
            leftIcon={<Entypo name="email" />}
            placeholder="Enter verification code..."
            onChangeText={(val) => handleChange("token", val)}
            errorMessage={errorMessage ? errorMessage : ""}
          />
          <TouchableOpacity
            style={{ marginBottom: 25 }}
            onPress={() => closeRBSheet("forgotPassword")}
          >
            <Text style={{ color: "blue", fontSize: 16 }}>
              Back to Forgot Password
            </Text>
          </TouchableOpacity>
          <Button
            loading={value.loading}
            uppercase={true}
            buttonStyle={{ borderRadius: 10, padding: 12 }}
            onPress={() => handleSubmit()}
          >
            Verify
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </BottomSheet>
  );
}
