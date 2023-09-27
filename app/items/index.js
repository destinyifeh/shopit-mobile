import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { Loader } from "../components/loader";
import { getItems } from "../context/actions/itemAction";
import { StoreContext } from "../context/store";
import { NewCollections } from "./components/collections";
import { Products } from "./components/products";
export default function Items({
  updateItemRef,
  state,
  isAdmin,
  setUpdateId,
  updatedId,
  updatedOption,
}) {
  const initialState = {
    clothing: true,
    accessories: false,
    shoe: false,
    bag: false,
    opt3: false,
    opt4: false,
  };
  const { itemState, dispatchItem } = React.useContext(StoreContext);
  const [option, setOption] = React.useState(initialState);
  const [val, setVal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    getUpdatedState();
    dispatchItem(getItems(dispatchItem, setLoading));
  }, [updatedId]);

  const getUpdatedState = () => {
    setLoading(false);
    if (updatedOption === "clothing") {
      setLoading(true);
      setVal("clothing");

      setOption({
        ...option,
        clothing: true,
        accessories: false,
        bag: false,
        shoe: false,
      });
    } else if (updatedOption === "shoe") {
      setLoading(true);
      setVal("shoe");
      setOption({
        ...option,
        clothing: false,
        accessories: false,
        bag: false,
        shoe: true,
      });
    } else if (updatedOption === "bag") {
      setLoading(true);
      setVal("bag");

      setOption({
        ...option,
        clothing: false,
        accessories: false,
        bag: true,
        shoe: false,
      });
    } else if (updatedOption === "accessories") {
      setLoading(true);
      setVal("accessories");

      setOption({
        ...option,
        clothing: false,
        accessories: true,
        bag: false,
        shoe: false,
      });
    } else {
      setVal("clothing");
    }
  };

  const getOption = (value) => {
    setVal(value);
    if (value === "clothing") {
      setLoading(true);
      setOption({
        ...option,
        clothing: true,
        accessories: false,
        bag: false,
        shoe: false,
      });
    } else if (value === "accessories") {
      setLoading(true);
      setOption({
        ...option,
        clothing: false,
        accessories: true,
        bag: false,
        shoe: false,
      });
    } else if (value === "shoe") {
      setLoading(true);
      setOption({
        ...option,
        clothing: false,
        accessories: false,
        bag: false,
        shoe: true,
      });
    } else if (value === "bag") {
      setLoading(true);
      setOption({
        ...option,
        clothing: false,
        accessories: false,
        bag: false,
        shoe: false,
        bag: true,
      });
    } else {
      console.log("Nothing...");
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      {isAdmin === true ? (
        <Text style={{ textAlign: "center", marginVertical: 15, fontSize: 20 }}>
          Actions
        </Text>
      ) : (
        <NewCollections itemState={itemState} state={state} />
      )}
      <ScrollView
        horizontal
        style={{ alignSelf: "center", marginBottom: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => getOption("clothing")}
          style={{
            marginHorizontal: 10,
            backgroundColor: option.clothing === true ? "black" : "white",
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: "grey",
          }}
        >
          <Text style={{ color: option.clothing === true ? "white" : "grey" }}>
            Clothing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getOption("accessories")}
          style={{
            marginHorizontal: 10,
            backgroundColor: option.accessories === true ? "black" : "white",
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: "grey",
          }}
        >
          <Text
            style={{ color: option.accessories === true ? "white" : "grey" }}
          >
            Accessories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => getOption("shoe")}
          style={{
            marginHorizontal: 10,
            backgroundColor: option.shoe === true ? "black" : "white",

            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: "grey",
          }}
        >
          <Text style={{ color: option.shoe === true ? "white" : "grey" }}>
            Shoes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => getOption("bag")}
          style={{
            marginHorizontal: 10,
            backgroundColor: option.bag === true ? "black" : "white",

            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: "grey",
          }}
        >
          <Text style={{ color: option.bag === true ? "white" : "grey" }}>
            {" "}
            Bags
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {loading === true ? (
        <Loader setLoading={setLoading} style={{ marginTop: 30 }} />
      ) : (
        <Products
          updateItemRef={updateItemRef}
          isAdmin={isAdmin}
          option={val}
          state={state}
          setUpdateId={setUpdateId}
        />
      )}
    </ScrollView>
  );
}
