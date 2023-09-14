import { Link } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { H3 } from "../components/Tags";
import { StoreContext } from "../context/store";
export default function Notification() {
  const { dispatchItem, itemState, userState } = React.useContext(StoreContext);

  const data = [
    {
      message: "Destiny is a great boy",
      id: 112,
    },
    {
      message: "Destiny is a great boy",
      id: 113,
    },
    {
      message: "Destiny is a great boy",
      id: 114,
    },
  ];
  const { notifications } = itemState;

  return (
    <View
      style={{ flex: 1, paddingTop: 20, padding: 10, backgroundColor: "white" }}
    >
      <H3 style={{ textAlign: "center" }}>
        Hi {userState.user?.username}, Below are your recent notifications
      </H3>

      <FlatList
        data={notifications}
        keyExtractor={(item, idx) => item._id + idx}
        initialNumToRender={10}
        // ListEmptyComponent={() => (
        //   <Text style={{ textAlign: "center" }}>Loading...</Text>
        // )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Link
                style={{ color: "blue", marginVertical: 10 }}
                href={`/notification/${item._id}`}
              >
                {item.message && item.message.slice(0, 50)}...
              </Link>
              {/* <Link style={{ color: "blue", marginVertical: 10 }} href="/">
                  Destiny is a good boy already
                </Link> */}
            </View>
          );
        }}
      />
    </View>
  );
}
