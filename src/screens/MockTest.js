import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function MockTest({ navigation }) {
  return (
    <View>
      <Text>MockTest</Text>

      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
