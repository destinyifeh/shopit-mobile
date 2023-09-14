import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { StoreContext } from "../../context/store";
dayjs.extend(relativeTime);

import { H3 } from "../Tags";
import BottomSheet from "../bottomSheet";
export default function AccountInfo({ refRBSheet, user }) {
  const { userState, itemState } = useContext(StoreContext);

  const userLikes =
    itemState.items &&
    itemState.items.filter(
      (item) => item.likedBy === userState.user._id + item._id
    );
  return (
    <BottomSheet refRBSheet={refRBSheet}>
      <View style={{ flex: 1 }}>
        <H3 style={{ textAlign: "center", marginVertical: 5 }}>
          <H3 style={{ color: "black", fontWeight: "bold" }}>
            {user?.username}
          </H3>{" "}
          Account Information
        </H3>
        <View>
          <Text
            style={{ textAlign: "center", marginVertical: 10, fontSize: 16 }}
          >
            Registered Date:
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 13 }}>
              {" "}
              {dayjs(user?.createdAt).fromNow()}
            </Text>
          </Text>
          <Text
            style={{ textAlign: "center", marginVertical: 10, fontSize: 16 }}
          >
            Registered Email:
            <Text style={{ color: "black", fontSize: 13, fontWeight: "bold" }}>
              {" "}
              {user?.email}
            </Text>
          </Text>
          <Text
            style={{ fontSize: 16, textAlign: "center", marginVertical: 10 }}
          >
            Likes:
            <Text style={{ color: "black", fontSize: 13, fontWeight: "bold" }}>
              {" "}
              {userLikes.length}
            </Text>
          </Text>
        </View>
      </View>
    </BottomSheet>
  );
}
