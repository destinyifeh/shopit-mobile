import { useNavigation } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { Loader } from "../components/loader";
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

  React.useEffect(() => {
    dispatchItem(getItems(dispatchItem));
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatchItem(getItems(dispatchItem));
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, [itemState, getItems, dispatchItem, refreshing]);
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
        <>{itemContent()}</>
      ) : (
        <Loader setLoading={setLoading} />
      )}
    </View>
  );
};

export default ProductsScreen;
