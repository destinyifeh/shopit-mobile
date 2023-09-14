import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveData(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

async function deleteData(key) {
  await AsyncStorage.removeItem(key);
}

async function getData(key) {
  const savedItem = await AsyncStorage.getItem(key);
  if (savedItem) {
    try {
      return JSON.parse(savedItem);
    } catch (err) {
      console.log(err);
    }
  }
  return null;
}

export { deleteData, getData, saveData };
