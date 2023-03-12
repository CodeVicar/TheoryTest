import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import topicData from "../data/topic.json";

export default function Home({ navigation }) {
  const handleTopicPress = (topic) => {
    navigation.navigate("Practice", { topic });
  };

  const renderTopic = ({ item }) => (
    <TouchableOpacity
      style={styles.topicContainer}
      onPress={() => handleTopicPress(item)}
    >
      <Text style={styles.topicText}>{item.topicName}</Text>
      <Text style={styles.numQuestionsText}>({item.questions.length})</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a topic:</Text>
      <FlatList
        data={topicData}
        renderItem={renderTopic}
        keyExtractor={(item) => item.topicName}
        style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  topicContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  topicText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  numQuestionsText: {
    fontSize: 16,
    color: "gray",
  },
});
