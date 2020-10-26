import React from "react";
import { View, Text } from "react-native";
import Colors from "../constants/Colors";

export default function Heading({ title, subtitle, styleName = "dark" }) {
  const style = styles[styleName];
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <Text
        style={{ fontSize: 40, paddingVertical: 20, ...style.headingTitle }}
      >
        {title}
      </Text>
      <Text style={{ ...style.headingSubtitle }}>{subtitle}</Text>
    </View>
  );
}

const styles = {
  light: {
    headingTitle: {
      color: "#fff",
    },
    headingSubtitle: {
      color: "#fff",
    },
  },
  dark: {
    headingTitle: {
      color: Colors.Primary,
    },
    headingSubtitle: {
      color: "#000",
    },
  },
};
