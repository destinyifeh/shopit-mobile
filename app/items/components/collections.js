import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useContext } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { H2, H3 } from "../../components/Tags";
import { StoreContext } from "../../context/store";
export const NewCollections = (props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <View style={{ padding: 18 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <H2
          style={{
            fontWeight: "bold",
            color: props.state.darkTheme ? "white" : "black",
          }}
        >
          New Collections
        </H2>
        <TouchableOpacity
          onPress={() =>
            //navigation.reset({ index: 0, routes: [{ name: "products" }] })
            navigation.navigate("products")
          }
        >
          <H3 style={{ color: props.state.darkTheme ? "white" : "black" }}>
            See All
          </H3>
        </TouchableOpacity>
      </View>
      {/* <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {props.itemState.items.slice(0, 1).map((item) => {
          <View>
            <Text
              style={{
                position: "absolute",
                zIndex: 1,
                left: 10,
                top: 10,
                backgroundColor: "white",
                padding: 5,
                borderRadius: 10,
                color: "black",
                opacity: 0.9,
              }}
            >
              #{item.price}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("cart")}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 10,
                  opacity: props.state.darkTheme ? 0.5 : 1,
                }}
              />
            </TouchableOpacity>
          </View>;
        })}
        {props.itemState.items.slice(0, 2).map((item) => {
          <View style={{}}>
            <View>
              <Text
                style={{
                  position: "absolute",
                  zIndex: 1,
                  left: 10,
                  top: 10,
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 10,
                  color: "black",
                  opacity: 0.9,
                }}
              >
                {item.price}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("cart")}>
                <Image
                  resizeMode="contain"
                  source={{ uri: item.image }}
                  style={{
                    width: 150,
                    height: 95,
                    borderRadius: 15,
                    opacity: props.state.darkTheme ? 0.5 : 1,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  position: "absolute",
                  zIndex: 1,
                  left: 10,
                  top: 10,
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 10,
                  color: "black",
                  opacity: 0.9,
                  marginTop: 7,
                }}
              >
                {item.price}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("cart")}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    marginVertical: 10,
                    width: 150,
                    height: 95,
                    borderRadius: 15,
                    opacity: props.state.darkTheme ? 0.5 : 1,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>;
        })}
      </View> */}
    </View>
  );
};

export const MainProducts = ({ item, getLike, itemState }) => {
  const navigation = useNavigation();
  const { dispatchItem, userState } = useContext(StoreContext);

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <TouchableOpacity
        style={{ marginVertical: 5 }}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "cart", params: { item: JSON.stringify(item) } }],
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
          Get the best and the affordable
          {item.label}
        </Text>
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
          onPress={() => getLike(item._id, itemState, userState, dispatchItem)}
        >
          <Entypo
            name="heart-outlined"
            size={20}
            color={
              item.likedBy === userState.user._id + item._id ? "red" : "grey"
            }
          />
        </TouchableOpacity>
        <Text
          style={{
            position: "absolute",
            top: 35,
            zIndex: 1,
            right: 5,
            color: "white",
          }}
        >
          {item.likedBy === userState.user._id + item._id ? "liked" : null}
        </Text>
        <Image
          source={{ uri: item.image }}
          style={{ width: 150, height: 200, borderRadius: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export const LikesProducts = ({ item, getLike, itemState }) => {
  const navigation = useNavigation();
  const { dispatchItem, userState } = useContext(StoreContext);
  return (
    <View style={{ paddingHorizontal: 0 }} key={item._id}>
      <TouchableOpacity
        style={{ marginVertical: 5 }}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "cart", params: { item: JSON.stringify(item) } }],
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
          Get the best and the affordable
          {item.label}
        </Text>
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
          onPress={() => getLike(item._id, itemState, userState, dispatchItem)}
        >
          <Entypo
            name="heart-outlined"
            size={20}
            color={
              item.likedBy === userState.user._id + item._id ? "red" : "grey"
            }
          />
        </TouchableOpacity>
        <Text
          style={{
            position: "absolute",
            top: 35,
            zIndex: 1,
            right: 5,
            color: "white",
          }}
        >
          {item.likedBy === userState.user._id + item._id ? "liked" : null}
        </Text>
        <Image
          source={{ uri: item.image }}
          style={{ width: 150, height: 200, borderRadius: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};
