import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Heading from "../components/Heading";
import Product from "../components/Product";
import Button from "../components/Button";

export default function StandScreen({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState({ id: null });
  const { stand } = route.params;

  useEffect(() => {
    (async () => {
      const query = new URLSearchParams({ stand: stand.id });
      const url = `https://prueba2020.monoku.com/api/productos/?${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Heading
        title="¡Felicitaciones!"
        subtitle="Escoge una de nuestras prendas únicas"
      />

      <View style={styles.productList}>
        {products.map((product) => {
          return (
            <Product
              onPress={() => setSelected(product)}
              key={product.id}
              product={product}
              style={{ marginLeft: 20, marginRight: 20 }}
              selected={selected.id == product.id}
            />
          );
        })}
      </View>

      <View style={{ marginBottom: 40, marginLeft: 20, marginRight: 20 }}>
        <Button
          title="Siguiente"
          disabled={selected.id === null}
          styleName="primary"
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate("Order", { product: selected })}
        />

        <Button title="Atrás" onPress={() => navigation.goBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  productList: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 20,
  },
});
