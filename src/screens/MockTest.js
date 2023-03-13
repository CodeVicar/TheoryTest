import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function MockTest({ navigation }) {
  return (
    <View>
      <Text>Hello World</Text>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Go to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
