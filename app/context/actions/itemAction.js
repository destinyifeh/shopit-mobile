import { Alert } from "react-native";
import { requester } from "../../services/api";
import * as actionTypes from "./actionTypes";
export const addItem = async (value, dispatchItem, setValue, navigation) => {
  try {
    let res = await requester.post("/add-item", value);
    dispatchItem({
      type: actionTypes.ADD_ITEM,
      payload: res?.data,
      pending: false,
      fulfilled: true,
    });
    setValue((prevState) => ({
      ...prevState,
      price: "",
      title: "",
      desc: "",
      imageName: "",
      file: "",
      loading: false,
    }));
    Alert.alert(null, "Item added");
    navigation.reset({
      index: 0,
      routes: [{ name: "admin", params: { option: value.category } }],
    });
  } catch (err) {
    dispatchItem({
      type: actionTypes.ERROR,
      payload: err.message,
      fulfilled: false,
      pending: false,
    });
    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
    console.log(err.message, "error");
    Alert.alert("Error", "Oops! An error occured, try again");
  }
};
export const getItems = async (dispatchItem, setLoading) => {
  try {
    setLoading(true);
    let res = await requester.get("/items");
    console.log(res.data, "items data");
    dispatchItem({
      type: actionTypes.GET_ITEMS,
      payload: res?.data,
      pending: false,
      fulfilled: true,
    });
    setLoading(false);
  } catch (err) {
    // dispatchItem({ type: actionTypes.ADD_ITEM, payload: err?.message });
    console.log(err.message, "error");
  }
};

export const deleteItem = async (itemId, dispatchItem, setDeleting) => {
  try {
    let res = await requester.get(`/item/${itemId}`);
    dispatchItem({
      type: actionTypes.DELETE_ITEM,
      payload: res?.data,
      pending: false,
      fulfilled: true,
    });
    setDeleting(false);
    Alert.alert(null, "Item deleted");
  } catch (err) {
    dispatchItem({
      type: actionTypes.ERROR,
      payload: err?.message,
      pending: false,
      fulfilled: false,
    });
    setDeleting(false);
    console.log(err, "error");
    Alert.alert("Error", "Oops! An error occured, try again");
  }
};

export const updateItem = async (
  itemId,
  value,
  dispatchItem,
  setValue,
  navigation
) => {
  dispatchItem({ type: actionTypes.PENDING, payload: true });
  try {
    let res = await requester.put(`/item/${itemId}`, value);
    dispatchItem({
      type: actionTypes.UPDATE_ITEM,
      payload: res?.data,
      pending: false,
      fulfilled: true,
    });
    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
    dispatchItem(getItems(dispatchItem));
    Alert.alert(null, "Item updated");
    navigation.reset({
      index: 0,
      routes: [{ name: "admin", params: { option: value.category } }],
    });
  } catch (err) {
    dispatchItem({
      type: actionTypes.ERROR,
      payload: err?.message,
      pending: false,
      fulfilled: false,
    });

    setValue((prevState) => ({
      ...prevState,
      loading: false,
    }));
    console.log(err.message, "error");

    Alert.alert("Error", "Oops! An error occured, try again");
  }
};

export const addNotification = async (
  post,
  setVal,
  setLoading,
  dispatchItem
) => {
  try {
    let res = await requester.post("/add-notification", post);
    const { data } = res;
    let newDoc = [];
    newDoc.push(data);
    setLoading(false);
    setVal("");
    dispatchItem({
      type: actionTypes.GET_NOTIFICATIONS,
      payload: newDoc,
    });
    Alert.alert(null, "Notification added");
  } catch (err) {
    console.log(err.message, "Error");
    setLoading(false);
    dispatchItem({
      type: actionTypes.ERROR,
      payload: err?.message,
    });
  }
};

export const getNotifications = async (dispatchItem) => {
  try {
    let res = await requester.get("/notifications");
    const { data } = res;

    dispatchItem({
      type: actionTypes.GET_NOTIFICATIONS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatchItem({
      type: actionTypes.ERROR,
      payload: err?.message,
    });
  }
};

export const deleteNotification = async (id, dispatchItem) => {
  try {
    let res = await requester.delete(`/notification/${id}`);
    const { data } = res;
    const { message } = data;
    if (message === "notification deleted") {
      dispatchItem({
        type: actionTypes.DELETE_NOTIFICATION,
        payload: id,
      });
    }
    if (message === "notification not found") {
      Alert.alert(null, "Noification does not exist");
      return;
    }
  } catch (err) {
    console.log(err);
    dispatchItem({
      type: actionTypes.ERROR,
      payload: err?.message,
    });
  }
};

export const updateNotification = async (
  notificationId,
  value,
  dispatchItem
) => {
  try {
    let res = await requester.put(`/notification/${notificationId}`, value);
    const { data } = res;
    let updatedDoc = [];
    updatedDoc.push(data);
    dispatchItem({
      type: actionTypes.UPDATE_NOTIFICATION,
      payload: updatedDoc,
    });
  } catch (err) {
    console.log(err);
    dispatchItem({
      type: actionTypes.ERROR,
      payload: err?.message,
    });
  }
};

export const updateLike = async (userId, productId, dispatchItem) => {
  const value = {
    likedBy: userId + productId,
  };
  try {
    const res = await requester.patch(`/item/like/${productId}`, value);

    dispatchItem({
      type: actionTypes.UPDATE_ITEM,
      payload: res.data,
      pending: false,
      fulfilled: true,
    });
  } catch (err) {
    console.log(err);
    dispatchItem({
      type: actionTypes.ERROR,
      payload: err?.message,
    });
  }
};
