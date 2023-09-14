import { Button, Input } from "@rneui/themed";
import React from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {
  addNotification,
  deleteNotification,
} from "../../context/actions/itemAction";
import { StoreContext } from "../../context/store";
import { H2 } from "../Tags";
import BottomSheet from "../bottomSheet";
export function AddNote({ refRBSheet, refRBSheet2 }) {
  const [val, setVal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { dispatchItem, itemState } = React.useContext(StoreContext);
  async function handleSubmit() {
    if (!val) {
      Alert.alert(null, "Add notification before submitting");
      return;
    }
    setLoading(true);
    const post = {
      message: val,
    };
    await addNotification(post, setVal, setLoading, dispatchItem);
  }
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "50%" }}
    >
      <H2 style={{ textAlign: "center", marginBottom: 20 }}>
        Add Notification{" "}
      </H2>
      <Input
        value={val}
        label="Notify-user"
        leftIcon={<Entypo name="book" />}
        placeholder="Enter note..."
        onChangeText={(val) => setVal(val)}
      />
      <View style={{ marginTop: 50, marginHorizontal: 10 }}>
        <Button
          loading={loading}
          uppercase={true}
          buttonStyle={{ borderRadius: 10, padding: 12 }}
          onPress={() => handleSubmit()}
        >
          Submit
        </Button>
      </View>
      <TouchableOpacity
        onPress={() => {
          refRBSheet2.current?.open(), refRBSheet.current?.close();
        }}
        style={{ marginTop: 20, alignSelf: "flex-end", padding: 10 }}
      >
        <Text style={{ color: "blue", fontSize: 16 }}>View Notifications</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
}

export function AllNotifications({ refRBSheet }) {
  const [data, setData] = React.useState("");
  const { dispatchItem, itemState } = React.useContext(StoreContext);
  React.useEffect(() => {}, []);

  const { notifications } = itemState;
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "50%" }}
    >
      <H2 style={{ textAlign: "center", marginBottom: 20 }}>Notifications </H2>
      <FlatList
        data={notifications}
        keyExtractor={(item, idx) => item._id}
        initialNumToRender={10}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>No available notification</Text>
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderBottomWidth: 1,
                padding: 5,
                marginHorizontal: 5,
              }}
            >
              <Text>{item.message && item.message.slice(0, 15)}...</Text>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() =>
                    dispatchItem(deleteNotification(item._id, dispatchItem))
                  }
                >
                  <Entypo name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </BottomSheet>
  );
}
