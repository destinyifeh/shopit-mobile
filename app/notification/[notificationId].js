import { useSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { updateNotification } from "../context/actions/itemAction";
import { StoreContext } from "../context/store";
export default function NotificationDetail(props) {
  const { state, itemState, dispatchItem, userState } =
    React.useContext(StoreContext);

  const params = useSearchParams();
  const { notificationId } = params;
  const { user } = userState;
  React.useEffect(() => {
    updateRecord();
  }, [notificationId, user]);

  async function updateRecord() {
    const value = {
      isRead: true,
      readBy: user._id,
      message: notificationDetail.message,
    };
    try {
      await updateNotification(notificationId, value, dispatchItem);
    } catch (err) {
      console.log(err);
    }
  }
  const { notifications } = itemState;
  let notificationDetail = notifications.find(
    (item) => item._id === notificationId
  );

  return (
    <View style={{ flex: 1, marginTop: 20, padding: 10 }}>
      <Text>{notificationDetail.message}</Text>
    </View>
  );
}
