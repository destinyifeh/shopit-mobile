import { useNavigation, useSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Loader } from "../components/loader";
import Receipt from "../components/receipt";
import ForgotPassword from "../components/users/forgot-passsword";
import Login from "../components/users/login";
import ResetPassword from "../components/users/reset-password";
import Signup from "../components/users/signup";
import VerifyToken from "../components/users/verify-token";
import { getItems } from "../context/actions/itemAction";
import { StoreContext } from "../context/store";
import { MainProducts } from "../items/components/collections";
import { getLike } from "../utils/helper";
const ProductsScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { itemState, dispatchItem, state } = React.useContext(StoreContext);
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const loginRef = React.useRef();
  const signupRef = React.useRef();
  const forgotPasswordRef = React.useRef();
  const resetPasswordRef = React.useRef();
  const verifyRef = React.useRef();
  const receiptRef = React.useRef();
  const params = useSearchParams();
  console.log(params, "ppp");
  const fetchData = async () => {
    try {
      await getItems(dispatchItem, setLoading);
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    fetchData();
    showReceiptModal();
  }, []);

  function showReceiptModal() {
    if (params?.showReceipt) {
      receiptRef.current?.open();
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await getItems(dispatchItem);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const itemContent = () => {
    return (
      <>
        {itemState.items.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              alignItems: "center",
            }}
            data={itemState.items}
            keyExtractor={(item) => item._id}
            initialNumToRender={10}
            numColumns={2}
            horizontal={false}
            ListEmptyComponent={() => <ActivityIndicator color={"black"} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => {
              return (
                <MainProducts
                  item={item}
                  itemState={itemState}
                  getLike={getLike}
                  loginRef={loginRef}
                />
              );
            }}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: state.darkTheme ? "white" : "black",
            }}
          >
            No product available yet!
          </Text>
        )}
      </>
    );
  };

  const closeRBSheet = (route) => {
    if (route === "login") {
      loginRef.current?.open();
      signupRef.current?.close();
      forgotPasswordRef.current?.close();
    } else if (route === "signup") {
      signupRef.current?.open();
      loginRef.current?.close();
    } else if (route === "forgotPassword") {
      forgotPasswordRef.current?.open();
      loginRef.current?.close();
      verifyRef.current?.close();
      resetPasswordRef.current?.close();
    } else if (route === "verifyToken") {
      verifyRef.current?.open();
      forgotPasswordRef.current?.close();
    } else if (route === "resetPassword") {
      verifyRef.current?.close();
      resetPasswordRef.current?.open();
    } else if (route === "finalStep") {
      resetPasswordRef.current?.close();
      loginRef.current?.close();
    } else {
      return null;
    }
  };

  const getProducts = async () => {
    fetchData();
  };
  const onErrorOccurred = () => {
    return (
      <View style={{ marginTop: 30, alignSelf: "center" }}>
        <Text>Oops! An error occurred while loading items</Text>

        <TouchableOpacity style={{ marginTop: 20 }} onPress={getProducts}>
          <Text style={{ textAlign: "center", color: "blue" }}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const isProduct = true;

  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        paddingVertical: 30,

        backgroundColor: state.darkTheme ? "#121212" : "white",
      }}
    >
      {loading === false ? (
        <>
          {itemState.isItemError === true ? onErrorOccurred() : itemContent()}
        </>
      ) : (
        <Loader setLoading={setLoading} style={{}} isProduct={isProduct} />
      )}

      <Login refRBSheet={loginRef} closeRBSheet={closeRBSheet} />
      <Signup refRBSheet={signupRef} closeRBSheet={closeRBSheet} />
      <ForgotPassword
        refRBSheet={forgotPasswordRef}
        closeRBSheet={closeRBSheet}
      />
      <ResetPassword
        refRBSheet={resetPasswordRef}
        closeRBSheet={closeRBSheet}
      />
      <VerifyToken refRBSheet={verifyRef} closeRBSheet={closeRBSheet} />

      <Receipt refRBSheet={receiptRef} paymentInfo={params} />
    </View>
  );
};

export default ProductsScreen;
