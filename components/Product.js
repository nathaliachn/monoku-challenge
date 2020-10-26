import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";

export default function ({ product, selected = false, style={}, onPress = () => {} }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.5}
      underlayColor="#fff"
      style={style}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: product.image }}
          style={{ height: 80, width: 80, borderRadius: 80 }}
        />
        <Text style={{ textAlign: "center" }}>{product.nombre}</Text>
        {selected && (
          <Image
            source={require("../assets/mark.png")}
            style={{
              height: 30,
              width: 30,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
        )}
      </View>
    </TouchableHighlight>
  );
}
