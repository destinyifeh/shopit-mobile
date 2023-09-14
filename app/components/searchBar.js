import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { themeColor } from "../utils/theme";
export const SearchBar = ({ value, onChangeText, onPress, state }) => {
  return (
    <>
      <View
        style={{
          margin: 5,
          paddingLeft: 30,
          borderWidth: 1,
          borderRadius: 30,
          width: "80%",
          borderColor: "grey",
        }}
      >
        <TouchableOpacity
          onPress={() => onPress()}
          style={{ position: "absolute", top: 12, left: 10 }}
        >
          <Ionicons
            name="search-outline"
            size={25}
            color={state.darkTheme ? "white" : "black"}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            color: themeColor(state),
            paddingVertical: 15,
            marginLeft: 15,
          }}
          placeholder="Search... e.g cloth, shoe, accessories"
          placeholderTextColor={state.darkTheme ? "white" : "black"}
          onChangeText={(val) => onChangeText(val)}
          value={value}
          onSubmitEditing={() => onPress()}
        />
      </View>
    </>
  );
};
