import { EvilIcons } from "@expo/vector-icons";
import { useNavigation, useSearchParams } from "expo-router";

import React, { useContext } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { AddNote, AllNotifications } from "../components/notify";
import { SearchBar } from "../components/searchBar";
import SearchItem from "../components/searchItem";
import { StoreContext } from "../context/store";
import Items from "../items";
import AddItem from "../items/components/add-item";
import UpdateItem from "../items/components/update-item";
import { themeBackgroundColor, themeColor } from "../utils/theme";
export default function AdminDashboard({ isAdmin = true }) {
  const { state, itemState, dispatchItem } = useContext(StoreContext);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  const refRBSheet = React.useRef();
  const updateItemRef = React.useRef();
  const searchRefRBSheet = React.useRef();
  const addNoteRefRBSheet = React.useRef();
  const allNoteRefRBSheet = React.useRef();

  const [updateId, setUpdateId] = React.useState("");
  const params = useSearchParams();
  React.useEffect(() => {}, []);
  const handleSearch = () => {
    if (!query) {
      Alert.alert(null, "You can't submit empty form");
    } else {
      searchRefRBSheet.current?.open();
      setLoading(true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeBackgroundColor(state) }}>
      <Text
        style={{
          color: themeColor(state),
          textAlign: "center",
          fontSize: 16,
          margin: 20,
        }}
      >
        Welcome to Admin Dashboard
      </Text>
      <View style={{ alignItems: "center" }}>
        <SearchBar
          value={query}
          onPress={() => handleSearch()}
          state={state}
          onChangeText={(val) => setQuery(val)}
        />
        <TouchableOpacity
          style={{
            marginLeft: "50%",
            marginTop: 20,
            backgroundColor: "black",
            padding: 5,
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => addNoteRefRBSheet.current?.open()}
        >
          <Text style={{ color: "white" }}>Notify</Text>

          <EvilIcons name="arrow-right" color="white" size={30} style={{}} />
        </TouchableOpacity>
      </View>
      <Items
        setUpdateId={setUpdateId}
        updateId={updateId}
        updateItemRef={updateItemRef}
        isAdmin={isAdmin}
        state={state}
        updatedOption={params.option}
      />
      <View>
        <TouchableOpacity
          onPress={() => refRBSheet.current?.open()}
          style={{
            position: "absolute",
            bottom: 10,
            right: 20,
            backgroundColor: "black",
            padding: 10,
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            elevation: 5,
          }}
        >
          <Text style={{ color: "white" }}>Add Item</Text>
          <EvilIcons name="arrow-right" color="white" size={30} style={{}} />
        </TouchableOpacity>
      </View>
      <AddItem refRBSheet={refRBSheet} />
      <UpdateItem updateId={updateId} refRBSheet={updateItemRef} />
      <SearchItem
        isAdmin={isAdmin}
        loading={loading}
        setLoading={setLoading}
        query={query}
        refRBSheet={searchRefRBSheet}
        setQuery={setQuery}
        setUpdateId={setUpdateId}
        updateId={updateId}
      />
      <AddNote refRBSheet={addNoteRefRBSheet} refRBSheet2={allNoteRefRBSheet} />
      <AllNotifications refRBSheet={allNoteRefRBSheet} />
    </View>
  );
}
