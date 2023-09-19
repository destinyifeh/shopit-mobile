import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useContext } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StoreContext } from "../context/store";
import { getData, saveData } from "../utils/storage";
import { H3 } from "./Tags";
export default function CartItems() {
  const { state } = useContext(StoreContext);
  const navigation = useNavigation();
  React.useEffect(() => {
    getSavedItem();
  }, []);

  const [data, setData] = React.useState([]);
  const getSavedItem = async () => {
    let res = await getData("cartItems");
    if (res?.length > 0) {
      setData(res);
    }
  };
  const removeItem = async (index) => {
    let updatedData = [...data];
    let item = data[index];
    if (item) {
      updatedData.splice(index, 1);
      setData(updatedData);
      navigation.setOptions({ tabBarBadge: updatedData.length });
      await saveData("cartItems", updatedData);
      return true;
    }
    Alert.alert(null, "Item not found");
    return false;
  };

  const increaseCartQuantity = (productId, qty) => {
    const updatedData = data.map((item) => {
      if (item._id === productId && item.qty === qty) {
        return {
          ...item,
          qty: item.qty + 1,
          price: (item.price * (item.qty + 1)) / item.qty, // Update the price based on the new quantity
        };
      }
      return item;
    });
    setData(updatedData);
  };
  const decreaseCartQuantity = (productId, qty) => {
    const updatedData = data.map((item) => {
      if (item._id === productId && item.qty === qty && item.qty > 1) {
        return {
          ...item,
          qty: item.qty - 1,
          price: (item.price * (item.qty - 1)) / item.qty, // Update the price based on the new quantity
        };
      }
      return item;
    });
    setData(updatedData);
  };
  const totalPrice = data.reduce((accumulated, item) => {
    return accumulated + JSON.parse(item.price);
  }, 0);
  return (
    <>
      {data.length > 0 ? (
        <>
          <ScrollView style={{ flex: 1 }}>
            <H3
              style={{
                textAlign: "center",
                marginVertical: 15,
                color: state.darkTheme ? "white" : "black",
              }}
            >
              Your cart items
            </H3>

            <View
              style={{
                padding: 10,
                backgroundColor: state.darkTheme ? "#121212" : "white",
                elevation: 5,
                margin: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  justifyContent: "space-around",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: state.darkTheme ? "white" : "black",
                  }}
                >
                  Product
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: state.darkTheme ? "white" : "black",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: state.darkTheme ? "white" : "black",
                  }}
                >
                  Quantity
                </Text>
              </View>
              {data.map((item, idx) => {
                return (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      justifyContent: "space-around",
                    }}
                    key={item._id + idx}
                  >
                    <TouchableOpacity
                      onPress={() => removeItem(idx)}
                      style={{ position: "absolute", right: 0, top: 9 }}
                    >
                      <EvilIcons name="trash" size={25} style={{}} />
                    </TouchableOpacity>

                    <View>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 30, height: 30 }}
                      />
                    </View>
                    <Text style={{ textAlign: "center", marginLeft: 5 }}>
                      N{item.price}
                    </Text>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Text>{item.qty}</Text>
                      <View style={{ marginLeft: 10, bottom: 4 }}>
                        <TouchableOpacity
                          onPress={() =>
                            increaseCartQuantity(item._id, item.qty)
                          }
                        >
                          <EvilIcons name="plus" size={30} style={{}} />
                        </TouchableOpacity>
                        {item.qty > 1 && (
                          <TouchableOpacity
                            onPress={() =>
                              decreaseCartQuantity(item._id, item.qty)
                            }
                            style={{ marginVertical: 10 }}
                          >
                            <EvilIcons name="minus" size={30} style={{}} />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
              <H3
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: state.darkTheme ? "white" : "black",
                }}
              >
                Total: N{totalPrice && totalPrice}
              </H3>
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Oops!",
                "No payment options available yet, please come back."
              )
            }
            style={{
              position: "absolute",
              bottom: 10,
              right: 20,
              backgroundColor: "black",
              padding: 10,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Checkout</Text>
            <EvilIcons name="arrow-right" color="white" size={30} style={{}} />
          </TouchableOpacity>
        </>
      ) : (
        <H3
          style={{
            textAlign: "center",
            marginVertical: 15,
            color: state.darkTheme ? "white" : "black",
          }}
        >
          No cart items available
        </H3>
      )}
    </>
  );
}
