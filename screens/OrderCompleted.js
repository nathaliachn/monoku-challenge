import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ImageBackground, Text, View } from "react-native";
import Heading from "../components/Heading";
import Colors from "../constants/Colors";


export default function OrderCompletedScreen({ route, navigation }) {
  useEffect(() => {
    // There is no back button, so we redirect the user to home after 1 seconds.
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Primary,
      }}
    >
      <ImageBackground
        source={require("../assets/splash.png")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Heading title="¡Disfrútalo!" style={{ color: "#fff", marginTop: 200 }}></Heading>
        <Text style={{ color: "#fff" }}>Muchas Gracias.</Text>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}