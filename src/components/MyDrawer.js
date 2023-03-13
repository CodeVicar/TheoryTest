import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Practice from "./src/screens/Practice";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <NavigationContainer>
      <TopNavigation.Navigator initialRouteName="Home">
        <TopNavigation.Screen name="Home" component={Home} />
        <TopNavigation.Screen name="Practice" component={Practice} />
      </TopNavigation.Navigator>
    </NavigationContainer>
  );
}
