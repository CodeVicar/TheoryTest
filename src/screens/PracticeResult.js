import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

//import Ionicons

export default function PracticeResult({ route }) {
  const { topic, results } = route.params;
  const [filteredQuestions, setFilteredQuestions] = useState(
    topic.questions.map((question, index) => {
      const result = results[index];
      const isCorrect = result === "correct";
      const displayResult = isCorrect ? (
        <AntDesign name="checkcircle" size={24} color="green" />
      ) : (
        <AntDesign name="closecircle" size={24} color="red" />
      );
      return {
        question: question.questionText,
        isCorrect,
        displayResult,
      };
    })
  );

  const numCorrect = results.filter((result) => result === "correct").length;
  const numWrong = results.filter((result) => result === "incorrect").length;
  const numUnanswered = results.filter((result) => result === null).length;
  const totalQuestions = results.length;

  const correctQuestions = filteredQuestions.filter(
    (question) => question.isCorrect
  );
  const wrongQuestions = filteredQuestions.filter(
    (question) => !question.isCorrect
  );
  const progress = Math.round((numCorrect / totalQuestions) * 100);

  const renderItem = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        {item.question} {item.displayResult}
      </Text>
    </View>
  );

  const handleFilterPress = (filter, questionIndex = null) => {
    let filteredQuestions;
    if (filter === "All") {
      filteredQuestions = topic.questions.map((question, index) => {
        const result = results[index];
        const isCorrect = result === "correct";
        const displayResult = isCorrect ? (
          <AntDesign name="checkcircle" size={24} color="green" />
        ) : (
          <AntDesign name="closecircle" size={24} color="red" />
        );
        return {
          question: question.questionText,
          isCorrect,
          displayResult,
        };
      });
    } else {
      filteredQuestions = topic.questions
        .map((question, index) => {
          const result = results[index];
          const isCorrect = result === "correct";
          const displayResult = isCorrect ? (
            <AntDesign name="checkcircle" size={24} color="green" />
          ) : (
            <AntDesign name="closecircle" size={24} color="red" />
          );
          return {
            question: question.questionText,
            isCorrect,
            displayResult,
          };
        })
        .filter((question) =>
          filter === "Correct" ? question.isCorrect : !question.isCorrect
        );
    }
    setFilteredQuestions(filteredQuestions);
    if (questionIndex !== null) {
      navigation.navigate("Practice", {
        topic,
        currentQuestion: questionIndex,
        selectedAnswer: null,
        results,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ProgressCircle
          percent={progress}
          radius={50}
          borderWidth={8}
          color="#4CAF50"
          shadowColor="#ccc"
          bgColor="#fff"
        >
          <Text style={styles.progressText}>{progress}%</Text>
        </ProgressCircle>
        <Text style={styles.subtitle}>{topic.topicName}</Text>
        <Text style={styles.resultText}>
          {numCorrect} correct, {numWrong} wrong, {numUnanswered} unanswered
        </Text>
      </View>
      <FlatList
        data={filteredQuestions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
      />
      <View style={styles.footer}>
        <Pressable onPress={() => handleFilterPress("All")}>
          <Text style={styles.filterButton}>All ({totalQuestions})</Text>
        </Pressable>
        <Pressable onPress={() => handleFilterPress("Correct")}>
          <Text style={styles.filterButton}>Correct ({numCorrect})</Text>
        </Pressable>
        <Pressable onPress={() => handleFilterPress("Incorrect")}>
          <Text style={styles.filterButton}>Incorrect ({numWrong})</Text>
        </Pressable>
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
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
  },
  percentage: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  answered: {
    fontSize: 16,
    marginTop: 10,
    color: "#4CAF50",
  },
  unanswered: {
    fontSize: 16,
    marginTop: 10,
    color: "#F44336",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  questionContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  correctQuestionText: {
    color: "#4CAF50",
  },
  wrongQuestionText: {
    color: "#F44336",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeFilter: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  activeFilterButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    color: "#fff",
  },
  disabledFilterButton: {
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
  },
  progressText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: "center",
  },
  questionListContainer: {
    flex: 1,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
  },
  activeNavButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    color: "#fff",
  },
  disabledNavButton: {
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
  },
});

// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   FlatList,
//   Pressable,
// } from "react-native";
// import ProgressCircle from "react-native-progress-circle";
// import Ionicons from "react-native-vector-icons/Ionicons";

// export default function PracticeResult({ route }) {
//   const { topic, results } = route.params;
//   const [filteredQuestions, setFilteredQuestions] = useState(
//     topic.questions.map((question, index) => {
//       const result = results[index];
//       const isCorrect = result === "correct";
//       const displayResult = isCorrect ? "checkmark-circle" : "close-circle";
//       const color = isCorrect ? "#4CAF50" : "#F44336";
//       return {
//         question: question.questionText,
//         displayResult,
//         color,
//       };
//     })
//   );

//   const numCorrect = results.filter((result) => result === "correct").length;
//   const numWrong = results.filter((result) => result === "incorrect").length;
//   const numUnanswered = results.filter((result) => result === null).length;
//   const totalQuestions = results.length;

//   const correctQuestions = filteredQuestions.filter(
//     (question) => question.isCorrect
//   );
//   const wrongQuestions = filteredQuestions.filter(
//     (question) => !question.isCorrect
//   );
//   const progress = Math.round((numCorrect / totalQuestions) * 100);

//   const renderItem = ({ item }) => (
//     <View style={styles.questionContainer}>
//       <Ionicons name={item.displayResult} size={24} color={item.color} />
//       <Text style={[styles.questionText, { color: item.color }]}>
//         {item.question}
//       </Text>
//     </View>
//   );

//   const handleFilterPress = (filter) => {
//     let filteredQuestions;
//     if (filter === "All") {
//       filteredQuestions = topic.questions.map((question, index) => {
//         const result = results[index];
//         const isCorrect = result === "correct";
//         const displayResult = isCorrect ? "checkmark-circle" : "close-circle";
//         const color = isCorrect ? "#4CAF50" : "#F44336";
//         return {
//           question: question.questionText,
//           displayResult,
//           color,
//         };
//       });
//     } else {
//       filteredQuestions = topic.questions
//         .map((question, index) => {
//           const result = results[index];
//           const isCorrect = result === "correct";
//           const displayResult = isCorrect ? "checkmark-circle" : "close-circle";
//           const color = isCorrect ? "#4CAF50" : "#F44336";
//           return {
//             question: question.questionText,
//             displayResult,
//             color,
//           };
//         })
//         .filter((question) =>
//           filter === "Correct" ? question.isCorrect : !question.isCorrect
//         );
//     }
//     setFilteredQuestions(filteredQuestions);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <ProgressCircle
//           percent={progress}
//           radius={50}
//           borderWidth={8}
//           color="#4CAF50"
//           shadowColor="#ccc"
//           bgColor="#fff"
//         >
//           <Text style={styles.progressText}>{progress}%</Text>
//         </ProgressCircle>
//         <Text style={styles.subtitle}>{topic.topicName}</Text>
//         <Text style={styles.resultText}>
//           {numCorrect} correct, {numWrong} wrong, {numUnanswered} unanswered
//         </Text>
//       </View>
//       <FlatList
//         data={filteredQuestions}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.listContainer}
//       />
//       <View style={styles.footer}>
//         <Pressable onPress={() => handleFilterPress("All")}>
//           <Text style={styles.filterButton}>All ({totalQuestions})</Text>
//         </Pressable>
//         <Pressable onPress={() => handleFilterPress("Correct")}>
//           <Text style={styles.filterButton}>Correct ({numCorrect})</Text>
//         </Pressable>
//         <Pressable onPress={() => handleFilterPress("Incorrect")}>
//           <Text style={styles.filterButton}>Incorrect ({numWrong})</Text>
//         </Pressable>
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
//   header: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "gray",
//     marginTop: 10,
//   },
//   percentage: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 20,
//   },
//   answered: {
//     fontSize: 16,
//     marginTop: 10,
//     color: "#4CAF50",
//   },
//   unanswered: {
//     fontSize: 16,
//     marginTop: 10,
//     color: "#F44336",
//   },
//   listContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   questionContainer: {
//     backgroundColor: "#f2f2f2",
//     borderRadius: 10,
//     marginBottom: 20,
//     padding: 20,
//   },
//   questionText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   correctQuestionText: {
//     color: "#4CAF50",
//   },
//   wrongQuestionText: {
//     color: "#F44336",
//   },
//   footer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-around",
//     backgroundColor: "#fff",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderTopColor: "#ccc",
//     borderTopWidth: 1,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   filterButton: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   activeFilter: {
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//   },
//   activeFilterButton: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 14,
//     color: "#fff",
//   },
//   disabledFilterButton: {
//     backgroundColor: "#ccc",
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 14,
//   },
//   progressText: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   progressContainer: {
//     alignItems: "center",
//   },
//   questionListContainer: {
//     flex: 1,
//   },
//   navContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   navButton: {
//     backgroundColor: "#f2f2f2",
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 14,
//   },
//   activeNavButton: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 14,
//     color: "#fff",
//   },
//   disabledNavButton: {
//     backgroundColor: "#ccc",
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 14,
//   },
// });
