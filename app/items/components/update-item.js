import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Button, Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { H2 } from "../../components/Tags";
import BottomSheet from "../../components/bottomSheet";
import { getItems, updateItem } from "../../context/actions/itemAction";
import { StoreContext } from "../../context/store";
export default function UpdateItem({ refRBSheet, closeRBSheet, updateId }) {
  const inputRef = React.useRef();
  const { dispatchItem, itemState } = React.useContext(StoreContext);
  const navigation = useNavigation();
  const initialState = {
    title: "",
    price: "",
    desc: "",
    image: "",
    loading: false,
    imageUrl: "",
    imageName: "",
    file: "",
    category: null,
    base64: "",
    newImage: false,
  };
  const [value, setValue] = React.useState(initialState);
  const [errorMessage, setErrorMessage] = React.useState({
    title: "",
    price: "",
    desc: "",
    image: "",
    category: "",
  });
  const [items, setItems] = React.useState("");
  React.useEffect(() => {
    inputRef.current?.focus();
    getItem();
  }, [updateId]);

  const updateState = React.useCallback(() => {
    dispatchItem(getItems(dispatchItem));
    navigation.reset({ index: 0, routes: [{ name: "admin" }] });
  }, [getItems, navigation, dispatchItem]);

  function getItem() {
    const item =
      itemState.items && itemState.items.find((item) => item._id === updateId);
    if (item !== undefined) {
      const imageId = item?.image?.substring(item.image.lastIndexOf("/") + 1);
      setValue((prevState) => ({
        ...prevState,
        title: item.title,
        desc: item.desc,
        price: item.price,
        imageName: imageId,
        image: imageId,
        file: item.image,
        category: item.label,
      }));
    }
  }

  const uploadFile = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        quality: 1,
        aspect: [4, 3],
        base64: true,
      });

      if (!result.canceled) {
        const imageName = result.uri.substring(result.uri.lastIndexOf("/") + 1);

        setValue({
          ...value,
          imageName: imageName,
          file: result.uri,
          image: imageName,
          newImage: true,
          base64: `data:image/jpg;base64,${result.base64}`,
        });
      }
    } catch (err) {
      console.log(err.message, "err");
    }
  };

  const handleChange = (name, val) => {
    //setValue({ ...value, [name]: val });
    setValue((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSubmit = async () => {
    let error;
    setValue({ ...value, ["loading"]: true });
    if (!value.title) {
      error = "Please enter item title";
      setErrorMessage({
        ...errorMessage,
        price: "",
        desc: "",
        image: "",
        category: "",
        ["title"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.price) {
      error = "Please enter item price ";
      setErrorMessage({
        ...errorMessage,
        title: "",
        desc: "",
        image: "",
        category: "",
        ["price"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.desc) {
      error = "Please enter your password";
      setErrorMessage({
        ...errorMessage,
        title: "",
        price: "",
        image: "",
        category: "",
        ["desc"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (!value.imageName) {
      error = "Please upload item image";
      setErrorMessage({
        ...errorMessage,
        price: "",
        title: "",
        desc: "",
        category: "",
        ["image"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (value.desc?.length < 5) {
      error = "Please description should be at least 5 unique characters long";
      setErrorMessage({
        ...errorMessage,
        title: "",
        price: "",
        image: "",
        category: "",
        ["desc"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else if (value.category === "nothing" || value.category === null) {
      error = "Please select item category";
      setErrorMessage({
        ...errorMessage,
        title: "",
        price: "",
        image: "",
        desc: "",
        ["category"]: error,
      });
      setValue({ ...value, ["loading"]: false });
      return false;
    } else {
      setErrorMessage({
        ...errorMessage,
        price: "",
        title: "",
        desc: "",
        image: "",
      });

      await updateItem(updateId, value, dispatchItem, setValue, navigation);
      //updateState();
      return true;
    }
  };
  return (
    <BottomSheet
      refRBSheet={refRBSheet}
      style={{ borderRadius: 10, height: "100%" }}
    >
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <H2 style={{ textAlign: "center", marginBottom: 20 }}>Update Item </H2>
        <KeyboardAvoidingView behavior="height">
          <Input
            label="Item Title"
            value={value?.title}
            leftIcon={<Entypo name="pencil" />}
            placeholder="Enter item title..."
            onChangeText={(val) => handleChange("title", val)}
            errorMessage={errorMessage.title ? errorMessage.title : ""}
          />
          <Input
            label="Item Price"
            value={value?.price}
            keyboardType="number-pad"
            leftIcon={<Entypo name="pencil" />}
            placeholder="Enter item price..."
            onChangeText={(val) => handleChange("price", val)}
            errorMessage={errorMessage.price ? errorMessage.price : ""}
          />
          <Input
            label="Item Description"
            value={value?.desc}
            leftIcon={<Entypo name="pencil" />}
            placeholder="Enter item description..."
            onChangeText={(val) => handleChange("desc", val)}
            errorMessage={errorMessage.desc ? errorMessage.desc : ""}
          />

          <Input
            label="Item Image"
            onPressIn={() => uploadFile()}
            leftIcon={<Entypo name="image" />}
            placeholder="upload item image..."
            //onChangeText={(val) => handleChange("image", val)}
            errorMessage={errorMessage.image ? errorMessage.image : ""}
            showSoftInputOnFocus={false}
            value={value.imageName && value.imageName}
          />
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity
              style={{
                marginBottom: 20,
              }}
            >
              {value.file && (
                <Image
                  source={{ uri: value.file }}
                  style={{ width: 100, height: 90, borderRadius: 20 }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 25,
            }}
          >
            <Picker
              dropdownIconColor={"red"}
              selectedValue={value.category}
              onValueChange={(val) => handleChange("category", val)}
            >
              <Picker.Item
                style={{ fontWeight: "bold", fontSize: 20 }}
                label="Select item category"
                value="nothing"
              />

              <Picker.Item label="Clothing" value="clothing" />
              <Picker.Item label="Shoe" value="shoe" />
              <Picker.Item label="Bag" value="bag" />

              <Picker.Item label="Accessories" value="accessories" />
            </Picker>
            <Text style={{ color: "red" }}>
              {errorMessage?.category && errorMessage.category}
            </Text>
          </View>

          <Button
            loading={value.loading}
            uppercase={true}
            buttonStyle={{ borderRadius: 10, padding: 12 }}
            onPress={() => handleSubmit()}
          >
            Update
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </BottomSheet>
  );
}
