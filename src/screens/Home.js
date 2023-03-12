// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";

// const topics = [
//   {
//     topicName: "Traffic Signs",
//     questions: [
//       {
//         questionText: "What does a red circle with a diagonal line mean?",
//         answers: ["No stopping", "No entry"],
//         correctAnswer: 1,
//       },
//       {
//         questionText: "What does a blue circle with a white 'P' mean?",
//         answers: ["No parking", "Parking allowed"],
//         correctAnswer: 1,
//       },
//       {
//         questionText: "What does a yellow diamond shape sign mean?",
//         answers: ["Yield", "Stop"],
//         correctAnswer: 0,
//       },
//     ],
//   },
//   {
//     topicName: "Lane Changes",
//     questions: [
//       {
//         questionText: "What should you do when changing lanes?",
//         answers: [
//           "Signal your intent and check your mirrors and blind spots",
//           "Honk your horn to alert other drivers",
//         ],
//         correctAnswer: 0,
//       },
//       {
//         questionText: "When is it safe to change lanes?",
//         answers: [
//           "When there is a clear gap in the traffic",
//           "When you are going around a corner",
//         ],
//         correctAnswer: 0,
//       },
//       {
//         questionText: "What is the purpose of a blind spot?",
//         answers: [
//           "To make it easier to see other vehicles",
//           "To create a space where you cannot see other vehicles",
//         ],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   {
//     topicName: "Right of Way",
//     questions: [
//       {
//         questionText:
//           "Who has the right of way at an intersection with no traffic signals?",
//         answers: ["The vehicle on the left", "The vehicle on the right"],
//         correctAnswer: 1,
//       },
//       {
//         questionText: "When turning left, who has the right of way?",
//         answers: ["The vehicle turning right", "The vehicle turning left"],
//         correctAnswer: 1,
//       },
//       {
//         questionText:
//           "What should you do if you arrive at a four-way stop at the same time as another vehicle?",
//         answers: [
//           "The vehicle on the left has the right of way",
//           "The vehicle on the right has the right of way",
//         ],
//         correctAnswer: 1,
//       },
//     ],
//   },
// ];

// export default function Home({ navigation }) {
//   const handleTopicPress = (topic) => {
//     navigation.navigate("Practice", { topic });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select a topic:</Text>
//       <FlatList
//         data={topics}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.topicContainer}
//             onPress={() => handleTopicPress(item)}
//           >
//             <Text style={styles.topicText}>{item.topicName}</Text>
//             <Text style={styles.numQuestionsText}>
//               {item.questions.length} questions
//             </Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.topicName}
//         style={styles.listContainer}
//       />
//       <TouchableOpacity
//         style={styles.mockTestButton}
//         onPress={() => navigation.navigate("MockTest")}
//       >
//         <Text style={styles.mockTestButtonText}>Mock Test</Text>
//       </TouchableOpacity>
//     </View>
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
//     backgroundColor: "#f2f2f2",
//     borderRadius: 10,
//     marginBottom: 20,
//     padding: 20,
//   },
//   topicName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   numQuestions: {
//     fontSize: 16,
//     color: "gray",
//   },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

const topics = [
  {
    topicName: "Traffic Signs",
    questions: [
      {
        questionText: "What does a red circle with a diagonal line mean?",
        answers: ["No stopping", "No entry"],
        correctAnswer: 1,
      },
      {
        questionText: "What does a blue circle with a white 'P' mean?",
        answers: ["No parking", "Parking allowed"],
        correctAnswer: 1,
      },
      {
        questionText: "What does a yellow diamond shape sign mean?",
        answers: ["Yield", "Stop"],
        correctAnswer: 0,
      },
    ],
  },
  {
    topicName: "Lane Changes",
    questions: [
      {
        questionText: "What should you do when changing lanes?",
        answers: [
          "Signal your intent and check your mirrors and blind spots",
          "Honk your horn to alert other drivers",
        ],
        correctAnswer: 0,
      },
      {
        questionText: "When is it safe to change lanes?",
        answers: [
          "When there is a clear gap in the traffic",
          "When you are going around a corner",
        ],
        correctAnswer: 0,
      },
      {
        questionText: "What is the purpose of a blind spot?",
        answers: [
          "To make it easier to see other vehicles",
          "To create a space where you cannot see other vehicles",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    topicName: "Right of Way",
    questions: [
      {
        questionText:
          "Who has the right of way at an intersection with no traffic signals?",
        answers: ["The vehicle on the left", "The vehicle on the right"],
        correctAnswer: 1,
      },
      {
        questionText: "When turning left, who has the right of way?",
        answers: ["The vehicle turning right", "The vehicle turning left"],
        correctAnswer: 1,
      },
      {
        questionText:
          "What should you do if you arrive at a four-way stop at the same time as another vehicle?",
        answers: [
          "The vehicle on the left has the right of way",
          "The vehicle on the right has the right of way",
        ],
        correctAnswer: 1,
      },
    ],
  },
];

export default function Home({ navigation }) {
  const handleTopicPress = (topic) => {
    navigation.navigate("Practice", { topic });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a topic:</Text>
      <FlatList
        data={topics}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.topicContainer}
            onPress={() => handleTopicPress(item)}
          >
            <Text style={styles.topicText}>{item.topicName}</Text>
            <Text style={styles.numQuestionsText}>
              {item.questions.length} questions
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.topicName}
        style={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.mockTestButton}
        onPress={() => navigation.navigate("MockTest")}
      >
        <Text style={styles.mockTestButtonText}>Mock Test</Text>
      </TouchableOpacity>
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
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  topicText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  numQuestionsText: {
    fontSize: 16,
    color: "gray",
  },
  mockTestButton: {
    backgroundColor: "#000080",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  mockTestButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  filterButton: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
    width: "24%",
    alignItems: "center",
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000080",
  },
});
