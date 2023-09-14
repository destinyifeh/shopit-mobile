import { Entypo, FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { deleteItem } from "../../context/actions/itemAction";
import { StoreContext } from "../../context/store";
import { getLike } from "../../utils/helper";

export const Products = ({
  updateItemRef,
  isAdmin,
  option,
  state,
  setUpdateId,
}) => {
  const navigation = useNavigation();
  const [deletingId, setDeletingId] = React.useState("");

  const [deleting, setDeleting] = React.useState(false);
  const [dropDown, setDropDown] = React.useState("");
  const [dropDownList, setDropDownList] = React.useState(false);
  const { itemState, dispatchItem, userState } = React.useContext(StoreContext);

  const checkItem =
    itemState.items.length > 0
      ? itemState.items.find((item) => item.label === option)
      : null;
  const checkExist = () => {
    return (
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        {checkItem === undefined || checkItem === null
          ? `No ${option} available yet!`
          : null}
      </Text>
    );
  };

  const getDropDown = (productId) => {
    const checkItem = itemState.items.find(
      (item) => item._id === productId
    )?._id;
    if (checkItem) {
      setDropDown(productId);
    }
  };

  const closeDropDown = (productId) => {
    const checkItem = itemState.items.find((item) => item._id === productId);
    if (checkItem) {
      setDropDown("");
    }
  };

  const trashIt = async (itemId) => {
    setDeletingId(itemId);
    let checkItem = itemState?.items.find((item) => item._id === itemId)._id;
    if (checkItem) {
      setDeleting(true);
      dispatchItem(deleteItem(itemId, dispatchItem, setDeleting));
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        columnGap: 15,
      }}
    >
      {checkExist()}
      {itemState.items.length > 0 &&
        itemState.items
          .filter((item) => item.label === option)
          .map((item, idx) => {
            return (
              <TouchableOpacity
                key={item._id}
                style={{ marginVertical: 5 }}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [
                      { name: "cart", params: { item: JSON.stringify(item) } },
                    ],
                  })
                }
              >
                <Text
                  style={{
                    width: 100,
                    position: "absolute",
                    zIndex: 1,
                    top: 10,
                    left: 5,
                    color: "white",
                  }}
                >
                  {/* Get the best and the affordable */}
                  {item.label}
                </Text>
                <>
                  {isAdmin ? (
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        right: 5,
                        top: 10,
                      }}
                    >
                      {dropDown !== item._id ? (
                        <TouchableOpacity onPress={() => getDropDown(item._id)}>
                          <Entypo
                            name="menu"
                            size={20}
                            style={{
                              backgroundColor: "white",
                              borderRadius: 50,
                              padding: 5,
                              textAlign: "center",
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => closeDropDown(item._id)}
                        >
                          <FontAwesome
                            name="remove"
                            size={20}
                            style={{
                              backgroundColor: "white",
                              borderRadius: 50,
                              padding: 5,
                              textAlign: "center",
                            }}
                          />
                        </TouchableOpacity>
                      )}
                      {dropDown === item._id ? (
                        <View
                          style={{
                            marginTop: 10,
                            backgroundColor: "black",
                            padding: 10,
                            borderRadius: 10,
                          }}
                        >
                          <TouchableOpacity
                            style={{ marginBottom: 5 }}
                            onPress={() => (
                              setUpdateId(item._id),
                              updateItemRef.current?.open(),
                              closeDropDown(item._id)
                            )}
                          >
                            <Entypo name="pencil" size={20} color="white" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ marginTop: 20 }}
                            onPress={() => trashIt(item._id)}
                          >
                            <Entypo name="trash" size={20} color="white" />
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        right: 5,
                        top: 10,
                        backgroundColor: "white",
                        borderRadius: 50,
                        padding: 5,
                      }}
                      onPress={() =>
                        getLike(item._id, itemState, userState, dispatchItem)
                      }
                    >
                      <Entypo
                        name="heart-outlined"
                        size={20}
                        color={
                          item.likedBy === userState.user._id + item._id
                            ? "red"
                            : "grey"
                        }
                      />
                    </TouchableOpacity>
                  )}
                </>
                <Text
                  style={{
                    position: "absolute",
                    top: 35,
                    zIndex: 1,
                    right: 5,
                    color: "white",
                  }}
                >
                  {item.likedBy === userState.user._id + item._id
                    ? "liked"
                    : null}
                </Text>

                <Image
                  loadingIndicatorSource={<Text>Image loading....</Text>}
                  source={{ uri: item.image }}
                  style={{
                    width: 150,
                    height: 200,
                    borderRadius: 10,
                    opacity: state.darkTheme ? 0.5 : 1,
                  }}
                />
                {deletingId === item._id && deleting === true && (
                  <Text
                    style={{
                      backgroundColor: "black",
                      padding: 5,
                      borderRadius: 10,
                      position: "absolute",
                      bottom: 10,
                      zIndex: 1,
                      color: "white",
                      marginLeft: 50,
                    }}
                  >
                    deleting...
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
    </View>
  );
};
