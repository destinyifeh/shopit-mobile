import { PricingCard } from "@rneui/themed";
import { useNavigation, useSearchParams } from "expo-router";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import CartItems from "../components/cartItems";
import { Loader } from "../components/loader";
import { StoreContext } from "../context/store";
import { getData, saveData } from "../utils/storage";
export default function Cart(props) {
  const [cart, setCart] = React.useState(null);
  const [cartItems, setCartItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  const params = useSearchParams();
  const refRBSheet = React.useRef();
  const { itemState, userState, state } = React.useContext(StoreContext);
  const item = params.item ? JSON.parse(params.item) : null;
  React.useEffect(() => {
    //  deleteData("cartItems");
    refRBSheet.current?.open();
    getSavedItem();
  }, [refRBSheet]);
  const getSavedItem = async () => {
    let res = await getData("cartItems");
    if (res?.length > 0) {
      setCartItems(res);
      navigation.setOptions({ tabBarBadge: res.length });
    }
  };

  const onCartPress = async (item) => {
    if (!userState.user._id) {
      return Alert.alert(null, "Login to perform this operation");
    }
    let isExist = cartItems.find((cartItem) => cartItem._id === item._id)?._id;
    if (isExist) {
      Alert.alert(null, "This item already added to cart");
      return false;
    }
    setCartItems((prev) => [...prev, item]);
    const updatedCartItems = [...cartItems, item];
    navigation.setOptions({ tabBarBadge: updatedCartItems.length });
    await saveData("cartItems", [...cartItems, item]);
    return true;
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: state.darkTheme ? "#121212" : "white",
      }}
    >
      {loading === false ? (
        <>
          {item ? (
            <View>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  marginTop: 10,
                }}
              />
              <PricingCard
                key={item._id}
                title={item.title}
                price={`N${item.price}`}
                info={[item.desc]}
                button={{
                  title: "Add to Cart",
                  icon: "shopping-cart",
                }}
                onButtonPress={() => onCartPress(item)}
              />
              <TouchableOpacity
                onPress={() =>
                  !userState.user._id
                    ? Alert.alert(null, "Login to perform this operation")
                    : navigation.reset({
                        index: 0,
                        routes: [{ name: "cart" }],
                      })
                }
                style={{ alignSelf: "flex-end", right: 20 }}
              >
                <Text style={{ color: "blue" }}>view added cart items</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <CartItems />
          )}
        </>
      ) : (
        <Loader setLoading={setLoading} />
      )}
    </View>
  );
}
