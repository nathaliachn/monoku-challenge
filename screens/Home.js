import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";
import Heading from "../components/Heading";

export default function HomeScreen({ navigation }) {
  const [stands, setStands] = useState([]);
  const [hasCameraPermission, setCameraPermission] = useState(false);
  const [borderColor, setBorderColor] = useState(Colors.Primary);
  const [barcodeData, setBarcodeData] = useState(null);

  useEffect(() => {
    setBorderColor(Colors.Primary);

    (async () => {
      const response = await fetch("https://prueba2020.monoku.com/api/stands/");
      const data = await response.json();
      setStands(data);

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const onBarCodeRead = ({ data }) => {
    if (data == barcodeData) {
      return;
    }

    const stand = stands.find((el) => el.id == data);

    if (stand !== undefined) {
      setBorderColor(Colors.Success);

      // Wait a half a second before navigate to the Stand, so the user can see the green highlight
      setTimeout(() => {
        navigation.navigate("Stand", { stand });
        setBarcodeData(null); // So the next time the user chose the same qr code it will works
      }, 500);
    } else {
      // Show a red border so the user knows the QR code is incorrect.
      setBorderColor(Colors.Error);
    }

    // Clear the border after .5s
    setTimeout(() => setBorderColor(Colors.Primary), 500);
  };
  
  return (
    <View
      style={{
        backgroundColor: Colors.Primary,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Heading
        styleName="light"
        title="Bienvenidx"
        subtitle="Escanea el código QR"
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            height: 260,
            width: 260,
            borderRadius: 260,
            overflow: "hidden",
            backgroundColor: "#fff",
            borderColor: borderColor,
            borderWidth: 8,
            marginTop: 50,
            marginBottom: 50,
          }}
        >
          {(hasCameraPermission && stands.length > 0) && (
            <BarCodeScanner
              barCodeTypes={["org.iso.QRCode"]}
              onBarCodeScanned={onBarCodeRead}
              style={{ height: "100%", width: "100%" }}
            />
          )}
        </View>
      </View>

      <View style={{ padding: 40 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Encuentra los códigos QR y llevate una de nuestras prendas originales.
        </Text>
      </View>

      <StatusBar style="light" />
    </View>
  );
}
