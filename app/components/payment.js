import { useNavigation } from "expo-router";
import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import { deleteData } from "../utils/storage";
export const ItemPayment = ({ price, setShowPaymentModal }) => {
  console.log(price, "pricee");
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Paystack
        //public key
        paystackKey="pk_test_ea78b89e09b55421178250cd2a3e9d7375a8bda0"
        amount={`${price}.00`}
        billingEmail="shopit@pay.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
          setShowPaymentModal(false);
        }}
        onSuccess={async (res) => {
          // handle response here
          console.log(res.data, "restooo");
          const { transactionRef } = res.data;
          setShowPaymentModal(false);
          await deleteData("cartItems");
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "products",
                params: {
                  showReceipt: true,
                  reference: transactionRef.reference,
                  message: transactionRef.message,
                  status: transactionRef.status,
                  amount: price,
                },
              },
            ],
          });
          // Alert.alert(null, "Your payment was successful, continue shopping");
        }}
        autoStart={true}
      />
    </View>
  );
};
