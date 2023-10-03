import React from "react";
//import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ViewShot from "react-native-view-shot";
import BottomSheet from "./bottomSheet";
function Receipt({ refRBSheet, paymentInfo }) {
  const [downloading, setDownloading] = React.useState(false);
  const ref = React.useRef();
  const downloadReceipt = async () => {
    try {
      ref.current.capture().then((uri) => {
        saveFile(uri);
      });
    } catch (error) {
      console.error("Error downloading or sharing receipt:", error);
    }
  };

  const saveFile = async (filePath) => {
    setDownloading(true);
    try {
      await MediaLibrary.saveToLibraryAsync(filePath);
      setTimeout(() => {
        setDownloading(false);
        Alert.alert(null, "Transaction receipt downloaded");
      }, 3000);
    } catch (error) {
      Alert.alert(null, "Oops! An error occurred while downloading receipt");
      console.error("Error:", error);
    }
  };

  return (
    <BottomSheet refRBSheet={refRBSheet} style={{ height: "40%" }}>
      <ViewShot
        ref={ref}
        options={{
          fileName: "Shopit Transaction Receipt",
          format: "jpg",
          quality: 0.9,
        }}
      >
        <View style={styles.receiptContainer}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Thanks for your patronage!{" "}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            Below is a copy of your receipt
          </Text>

          <View style={{ marginVertical: 20, alignSelf: "center" }}>
            <Text style={styles.receiptText}>
              TransactionRef:{" "}
              <Text style={{ color: "grey" }}>{paymentInfo?.reference}</Text>
            </Text>
            <Text style={styles.receiptText}>
              Status:{" "}
              <Text style={{ color: "grey" }}>{paymentInfo?.status}</Text>
            </Text>
            <Text style={styles.receiptText}>
              Data:<Text style={{ color: "grey" }}> 02/09/2023</Text>
            </Text>

            <Text style={styles.receiptText}>
              price:{" "}
              <Text style={{ color: "grey" }}>N{paymentInfo?.amount}</Text>
            </Text>
          </View>
        </View>
      </ViewShot>
      <View style={styles.receiptOptionsView}>
        <TouchableOpacity onPress={downloadReceipt}>
          <Text style={{ color: "blue", fontSize: 16 }}>
            {downloading ? "Downloading..." : "Download"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
          <Text style={{ color: "red", fontSize: 16 }}>Close</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  receiptContainer: {
    backgroundColor: "white",
    padding: 10,
  },
  receiptText: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 5,
  },
  receiptOptionsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  receiptOptionsViewButton: {
    color: "black",
  },
});
export default Receipt;
