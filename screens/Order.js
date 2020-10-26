import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Product from "../components/Product";
import RadioButton from "../components/RadioButton";
import Button from "../components/Button";
import Heading from "../components/Heading";

export default function OrderScreen({ route, navigation }) {
  const { product } = route.params;
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState({ id: null });

  useEffect(() => {
    (async () => {
      const query = new URLSearchParams({ producto: product.id });
      const url = `https://prueba2020.monoku.com/api/opciones-producto/?${query}`;
      const response = await fetch(url);
      const data = await response.json();

      setOptions(data.sort((a, b) => (a.orden > b.orden ? 1 : -1)));
    })();
  }, []);

  const continueHandler = useCallback(
    () =>
      navigation.navigate("OrderConfirm", {
        product: product,
        option: selected,
      }),
    [product, selected]
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#efefef",

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar style="dark" />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View
          style={{
            marginTop: 80,
            marginBottom: 40,
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <Product product={product} />
          <Heading
            title="¡Escogiste algo increíble!"
            subtitle="Ahora, selecciona una talla."
            style={{ textAlign: "center", marginTop: 20 }}
          ></Heading>
        </View>

        <View style={{ flexDirection: "column", flex: 1 }}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelected(option)}
              style={{
                flexDirection: "row",
                padding: 10,
                width: 320,
                alignItems: "center",
                marginBottom: 5,
                marginTop: 5,
                backgroundColor: "#fff",
                borderRadius: 4,
              }}
            >
              <RadioButton
                style={{ marginRight: 10 }}
                selected={selected.id == option.id}
              />
              <Text key={option.id}>{option.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          flex: 0,
          marginLeft: 20,
          marginRight: 20,
          paddingTop: 20,
          paddingBottom: 20,
          width: "100%",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Button
          title="Siguiente"
          styleName="primary"
          onPress={continueHandler}
          disabled={selected.id === null}
          style={{ marginBottom: 10 }}
        />
        <Button title="Atrás" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
