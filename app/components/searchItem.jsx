import { Entypo, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet from "../components/bottomSheet";
import { Loader } from "../components/loader";
import { StoreContext } from "../context/store";
import UpdateItem from "../items/components/update-item";

import { checkExist, getLike } from "../utils/helper";
import { H3 } from "./Tags";
export default function SearchItem({
  loading,
  setQuery,
  setLoading,
  query,
  refRBSheet,
  isAdmin,
  setUpdateId,
  updateId,
}) {
  const [dropDown, setDropDown] = React.useState("");
  const updateItemRef = React.useRef();
  const navigation = useNavigation();
  const searchQuery = JSON.stringify(query.trim());
  const q = JSON.parse(searchQuery);
  const { itemState, userState, dispatchItem, state } =
    React.useContext(StoreContext);

  React.useEffect(() => {
    console.log(updateId, "id");
  }, [updateId]);
  const transformText = (val) => {
    let regrexPattern = /\s+/g;
    let value = JSON.stringify(val);
    let transformValue = JSON.parse(
      value.toLowerCase().replace(regrexPattern, " ").trimEnd().trimStart()
    );
    return transformValue;
  };

  const getDropDown = (productId) => {
    const checkItem = itemState.items.find((item) => item._id === productId);
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

  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{
        height: "100%",
        backgroundColor: state.darkTheme ? "#121212" : "white",
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ paddingLeft: 5 }}
          onPress={() => (refRBSheet.current?.close(), setQuery(""))}
        >
          <EvilIcons name="arrow-left" size={30} style={{ padding: 5 }} />
        </TouchableOpacity>
        <H3
          style={{
            marginTop: 5,
            textAlign: "center",
            color: state.darkTheme ? "white" : "black",
          }}
        >
          Search items
        </H3>

        {loading === false ? (
          <>
            {checkExist(
              itemState,
              (option = transformText(q)),
              (isSearch = true)
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              {itemState?.items &&
                itemState.items
                  .filter((item) => {
                    const label = item.label ? item.label.toLowerCase() : "";
                    const title = item.title ? item.title.toLowerCase() : "";
                    const desc = item.desc ? item.desc.toLowerCase() : "";
                    const transformedText = transformText(q);
                    return (
                      String(label).includes(transformedText) ||
                      String(title).includes(transformedText) ||
                      String(desc).includes(transformedText)
                    );
                  })
                  .map((item, idx) => {
                    return (
                      <TouchableOpacity
                        key={item._id}
                        style={{ marginVertical: 5 }}
                        onPress={() =>
                          navigation.reset({
                            index: 0,
                            routes: [
                              {
                                name: "cart",
                                params: { item: JSON.stringify(item) },
                              },
                            ],
                          })
                        }
                      >
                        {/* <Text
                          style={{
                            width: 100,
                            position: "absolute",
                            zIndex: 1,
                            top: 10,
                            left: 5,
                            color: "white",
                          }}
                        >
                          {item.label}
                        </Text> */}
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
                                <TouchableOpacity
                                  onPress={() => getDropDown(item._id)}
                                >
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
                                    <Entypo
                                      name="pencil"
                                      size={20}
                                      color="white"
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    style={{ marginTop: 20 }}
                                    onPress={() =>
                                      Alert.alert(null, "Do you want to delete")
                                    }
                                  >
                                    <Entypo
                                      name="trash"
                                      size={20}
                                      color="white"
                                    />
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
                                getLike(
                                  item._id,
                                  itemState,
                                  userState,
                                  dispatchItem
                                )
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
                            color: "red",
                          }}
                        >
                          {item.likedBy === userState.user._id + item._id
                            ? "liked"
                            : null}
                        </Text>

                        <Image
                          resizeMode="contain"
                          source={{ uri: item.image }}
                          style={{ width: 150, height: 200, borderRadius: 10 }}
                        />
                      </TouchableOpacity>
                    );
                  })}
            </View>
          </>
        ) : (
          <Loader loading={loading} setLoading={setLoading} />
        )}
        <UpdateItem updateId={updateId} refRBSheet={updateItemRef} />
      </ScrollView>
    </BottomSheet>
  );
}
