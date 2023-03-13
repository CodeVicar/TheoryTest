import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // import NavigationContainer from @react-navigation/native
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // import createNativeStackNavigator from @react-navigation/native-stack
import { createDrawerNavigator } from "@react-navigation/drawer"; // import createDrawerNavigator from @react-navigation/drawer

import Home from "./src/screens/Home"; // import Home screen component
import MockTest from "./src/screens/MockTest"; // import MockTest screen component
import Practice from "./src/screens/Practice"; // import Practice screen component
import PracticeResult from "./src/screens/PracticeResult"; // import PracticeResult screen component
import Result from "./src/screens/Result"; // import Result screen component
import Test from "./src/components/Test"; // import Test component

const Stack = createNativeStackNavigator(); // create stack navigator
const Drawer = createDrawerNavigator(); // create drawer navigator

function Root() {
  // define a component for the drawer navigator
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Practise Test" component={Home} />
      <Drawer.Screen name="Mock Test" component={MockTest} />
    </Drawer.Navigator>
  );
}

export default function App() {
  // define main App component
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MockTest" component={MockTest} />
        <Stack.Screen name="Practice" component={Practice} />
        <Stack.Screen name="PracticeResult" component={PracticeResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {}, // define styles for container (empty for now)
});
