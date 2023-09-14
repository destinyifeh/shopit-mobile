import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Loader } from "../components/loader";
import { StoreContext } from "../context/store";
import { LikesProducts } from "../items/components/collections";
import { getLike } from "../utils/helper";
export default function Likes() {
  const { itemState, userState, state } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);

  const checkItem =
    itemState.items &&
    itemState.items.find(
      (item) => item.likedBy === userState.user._id + item._id
    );

  const checkExist = () => {
    return (
      <>
        {checkItem ? null : (
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              color: state.darkTheme ? "white" : "black",
            }}
          >
            Hi{" "}
            <Text
              style={{
                color: state.darkTheme ? "white" : "black",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {userState.user?.username}!
            </Text>{" "}
            You don't have any active like yet.
          </Text>
        )}
      </>
    );
  };
  return (
    <>
      {loading === false ? (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: state.darkTheme ? "#121212" : "white",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              top: 20,
              color: state.darkTheme ? "grey" : "black",
            }}
          >
            Your likes Item
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              marginTop: 40,
            }}
          >
            {checkExist()}

            {itemState.items
              .filter((item) => item.likedBy === userState.user._id + item._id)
              .map((item) => {
                return (
                  <LikesProducts
                    key={item._id}
                    item={item}
                    getLike={getLike}
                    itemState={itemState}
                  />
                );
              })}
          </View>
        </ScrollView>
      ) : (
        <Loader setLoading={setLoading} />
      )}
    </>
  );
}
