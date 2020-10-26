import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import "react-native-gesture-handler";
import HomeScreen from "./screens/Home";
import StandScreen from "./screens/Stand";
import OrderScreen from "./screens/Order";
import OrderConfirmScreen from "./screens/OrderConfirm";
import OrderCompletedScreen from "./screens/OrderCompleted";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stand" component={StandScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
        <Stack.Screen name="OrderCompleted" component={OrderCompletedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
