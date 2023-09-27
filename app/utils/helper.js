import { Alert, Text } from "react-native";
import { updateLike } from "../context/actions/itemAction";
export const getLike = async (
  productId,
  itemState,
  userState,
  dispatchItem,
  loginRef,
  setData,
  data
) => {
  const userId = userState?.user._id;

  if (!userId) {
    Alert.alert(null, "Login to like an item", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Login",
        onPress: () => loginRef.current?.open(),
      },
    ]);

    return;
  }
  const checkProductId = itemState.items.find(
    (item) => item.likedBy === userId + productId
  );

  if (!checkProductId) {
    await updateLike(userId, productId, dispatchItem, setData, data);
    return;
  }
  await updateLike(userId, productId, dispatchItem, setData, data);
};

export const transformText = (val) => {
  let regrexPattern = /\s+/g;
  let value = JSON.stringify(val);
  let transformValue = JSON.parse(
    value.toLowerCase().replace(regrexPattern, " ").trimEnd().trimStart()
  );
  return transformValue;
};

export const checkExist = (itemState, option, isSearch) => {
  const checkItem = itemState.items.find(
    (item) =>
      String(item.label).toLowerCase().includes(option) ||
      String(item.title).toLowerCase().includes(option) ||
      String(item.desc).toLowerCase().includes(option)
  );
  return (
    <>
      {isSearch ? (
        <Text
          style={{
            marginVertical: 20,
            fontSize: 18,
            textAlign: "center",
            color: "white",
          }}
        >
          {checkItem === undefined
            ? `No search result for "${option}" found!`
            : `Search result for "${option}" found!`}
        </Text>
      ) : (
        <Text style={{ marginTop: 20, fontSize: 18 }}>
          {checkItem === undefined ? `No "${option}" available yet!` : null}
        </Text>
      )}
    </>
  );
};
