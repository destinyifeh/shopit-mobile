import React from "react";
import { Text, View } from "react-native";
import { H3 } from "./Tags";
import BottomSheet from "./bottomSheet";
export default function About({ refRBSheet }) {
  return (
    <BottomSheet refRBSheet={refRBSheet}>
      <View style={{ flex: 1 }}>
        <H3 style={{ textAlign: "center", marginVertical: 5 }}>Company</H3>
        <View>
          <Text style={{ textAlign: "center" }}>
            We are ShopIt the best in town !
          </Text>
        </View>
      </View>
    </BottomSheet>
  );
}
