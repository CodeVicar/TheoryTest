import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import MockTest from "./src/screens/MockTest";
import Practice from "./src/screens/Practice";
import PracticeResult from "./src/screens/PracticeResult";
import Result from "./src/screens/Result";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MockTest" component={MockTest} />
        <Stack.Screen name="Practice" component={Practice} />
        <Stack.Screen name="PracticeResult" component={PracticeResult} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
