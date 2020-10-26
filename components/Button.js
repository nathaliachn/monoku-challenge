import React from "react";
import Colors from "../constants/Colors";
import { TouchableOpacity, View, Text } from "react-native";

export default function ({
  title,
  styleName = "default",
  disabled = false,
  ...props
}) {
  const style = styles[styleName] || styles["default"];
  const buttonTextStyle = {
    ...styles.base.buttonText,
    ...style.buttonText,
    ...(disabled ? style.buttonDisabledText : {}),
  };

  return (
    <View opacity={disabled ? 0.5 : 1.0}>
      <TouchableOpacity
        {...props}
        disabled={disabled}
        style={{
          ...styles.base.button,
          ...style.button,
          ...(props.style || {}),
        }}
        underlayColor="#fff"
      >
        <Text style={buttonTextStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  base: {
    button: {
      alignSelf: "stretch",
      textAlign: "center",
      width: 320,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 3,
      borderWidth: 0,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
  },
  primary: {
    button: {
      backgroundColor: Colors.Primary,
    },
    buttonText: {
      color: "#fff",
    },
    buttonDisabledText: {
      color: "#775ba2",
    },
  },
  default: {
    button: {
      backgroundColor: "#EEEFF1",
    },
    buttonText: {
      color: "#000",
    },
    buttonDisabledText: {
      color: "#7b7b7b",
    },
  },
};