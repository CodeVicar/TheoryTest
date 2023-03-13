// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
// } from "react-native";
// import MyComponent from "../components/Test";
// import topicData from "../data/topic.json"; // Import the topic data from the JSON file

// export default function Home({ navigation }) {
//   // Define a function to handle pressing a topic, which navigates to the Practice screen with the selected topic as a parameter
//   const handleTopicPress = (topic) => {
//     navigation.navigate("Practice", { topic });
//   };

//   // Define a function to render each topic as a TouchableOpacity with the topic name and number of questions
//   const renderTopic = ({ item }) => (
//     <TouchableOpacity
//       style={styles.topicContainer}
//       onPress={() => handleTopicPress(item)}
//     >
//       <Text style={styles.topicText}>{item.topicName}</Text>
//       <Text style={styles.numQuestionsText}>({item.questions.length})</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         {/* Add a title for the topic selection screen */}

//         <Text style={styles.title}>Select a topic:</Text>
//         {/* Use a FlatList to render the topics */}
//         <FlatList
//           data={topicData}
//           renderItem={renderTopic}
//           keyExtractor={(item) => item.topicName}
//           style={styles.listContainer}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   topicContainer: {
//     flexDirection: "row", // Align topic name and number of questions in a row
//     alignItems: "center",
//     backgroundColor: "#f2f2f2",
//     borderRadius: 10,
//     marginBottom: 20,
//     padding: 20,
//   },
//   topicText: {
//     flex: 1, // Allow the topic name to take up the available space
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   numQuestionsText: {
//     fontSize: 16,
//     color: "gray",
//   },
//   listContainer: {
//     flex: 1, // Ensure the list takes up the remaining space
//   },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import MyComponent from "../components/Test";
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
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Select a topic:</Text>
        <FlatList
          data={topicData}
          renderItem={renderTopic}
          keyExtractor={(item) => item.topicName}
          style={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    width: "100%",
  },
  topicContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 500,
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
    marginLeft: 10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
  },
});
