import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Badge } from "react-native-ui-lib";
import { Loader } from "../../components/loader";
import ForgotPassword from "../../components/users/forgot-passsword";
import Login from "../../components/users/login";
import ResetPassword from "../../components/users/reset-password";
import Signup from "../../components/users/signup";
import VerifyToken from "../../components/users/verify-token";
import { deleteItem } from "../../context/actions/itemAction";
import { StoreContext } from "../../context/store";
import { requester } from "../../services/api";
import { getLike } from "../../utils/helper";
export const Products = ({
  updateItemRef,
  isAdmin,
  option,
  state,
  setUpdateId,
}) => {
  const navigation = useNavigation();

  const loginRef = React.useRef();
  const signupRef = React.useRef();
  const forgotPasswordRef = React.useRef();
  const resetPasswordRef = React.useRef();
  const verifyRef = React.useRef();
  const [deletingId, setDeletingId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [dropDown, setDropDown] = React.useState("");
  const [data, setData] = React.useState([]);
  const [dropDownList, setDropDownList] = React.useState(false);
  const { itemState, dispatchItem, userState } = React.useContext(StoreContext);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);

    try {
      const { data } = await requester.get("/items");
      setData(data);
      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
      return false;
    }
  }

  const onErrorOccurred = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <Text>Oops! An error occurred while loading items</Text>

        <TouchableOpacity style={{ marginTop: 20 }} onPress={getProducts}>
          <Text style={{ textAlign: "center", color: "blue" }}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const checkItem =
    data.length > 0 ? data.find((item) => item.label === option) : null;
  const checkExist = () => {
    return (
      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          color: state.darkTheme ? "white" : "black",
        }}
      >
        {checkItem === undefined || checkItem === null
          ? `No ${option} available yet!`
          : null}
      </Text>
    );
  };

  const getDropDown = (productId) => {
    const checkItem = data.find((item) => item._id === productId)?._id;
    if (checkItem) {
      setDropDown(productId);
    }
  };

  const closeDropDown = (productId) => {
    const checkItem = data.find((item) => item._id === productId);
    if (checkItem) {
      setDropDown("");
    }
  };

  const trashIt = async (itemId) => {
    setDeletingId(itemId);
    let checkItem = data.find((item) => item._id === itemId)._id;
    if (checkItem) {
      setDeleting(true);
      dispatchItem(deleteItem(itemId, dispatchItem, setDeleting));
    }
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
  const isProduct = true;
  return (
    <>
      {loading ? (
        <Loader
          setLoading={setLoading}
          style={{ marginTop: 30 }}
          isProduct={isProduct}
        />
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              columnGap: 15,
            }}
          >
            {error ? onErrorOccurred() : checkExist()}
            {data.length > 0 &&
              data
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
                    color: "red",

                    width: 50,
                    textAlign: "center",
                  }}
                >
                  N{item.price}
                </Text> */}
                      <Badge
                        label={`N${item.price}`}
                        size={18}
                        labelStyle={{ color: "grey" }}
                        backgroundColor="#FAF9F6"
                        containerStyle={{
                          position: "absolute",
                          zIndex: 1,
                          top: 10,
                          left: 5,
                        }}
                      />

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
                                  onPress={() => trashIt(item._id)}
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
                              backgroundColor: "#FAF9F6",
                              borderRadius: 50,
                              padding: 5,
                            }}
                            onPress={() =>
                              getLike(
                                item._id,
                                itemState,
                                userState,
                                dispatchItem,
                                loginRef,
                                setData,
                                data
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
                        resizeMethod="auto"
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
        </>
      )}
    </>
  );
};
