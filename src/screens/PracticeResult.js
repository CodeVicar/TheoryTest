// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";

// export default function PracticeResult({ route }) {
//   const { topic, results } = route.params;
//   const [filteredResults, setFilteredResults] = useState(results);

//   useEffect(() => {
//     setFilteredResults(results);
//   }, [results]);

//   const handleFilterPress = (filter) => {
//     switch (filter) {
//       case "all":
//         setFilteredResults(results);
//         break;
//       case "correct":
//         setFilteredResults(results.filter((result) => result === "correct"));
//         break;
//       case "incorrect":
//         setFilteredResults(results.filter((result) => result === "incorrect"));
//         break;
//       case "unanswered":
//         setFilteredResults(
//           results.map((result) => (result === null ? "unanswered" : result))
//         );
//         break;
//       default:
//         setFilteredResults(results);
//     }
//   };

//   const renderResultItem = ({ item, index }) => {
//     let resultIcon;
//     switch (item) {
//       case "correct":
//         resultIcon = "*";
//         break;
//       case "incorrect":
//         resultIcon = "x";
//         break;
//       case "unanswered":
//         resultIcon = "-";
//         break;
//       default:
//         resultIcon = "-";
//     }
//     return (
//       <View style={styles.resultItem}>
//         <Text style={styles.resultItemNumber}>{index + 1}.</Text>
//         <Text style={styles.resultItemIcon}>{resultIcon}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.topicTitle}>{topic.topicName}</Text>
//       <View style={styles.filterContainer}>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filteredResults === results && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterPress("all")}
//         >
//           <Text style={styles.filterButtonText}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filteredResults !== results && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterPress("correct")}
//         >
//           <Text style={styles.filterButtonText}>Correct</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filteredResults !== results && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterPress("incorrect")}
//         >
//           <Text style={styles.filterButtonText}>Incorrect</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filteredResults !== results && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterPress("unanswered")}
//         >
//           <Text style={styles.filterButtonText}>Unanswered</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={filteredResults}
//         renderItem={renderResultItem}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.resultsContainer}
//       />
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
//   filterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   filterButton: {
//     padding: 10,
//     borderRadius: 10,
//   },
//   filterButtonActive: {
//     backgroundColor: "#000080",
//   },
//   filterButtonInactive: {
//     backgroundColor: "#f2f2f2",
//   },
//   filterButtonText: {
//     fontSize: 16,
//     color: "#fff",
//     textAlign: "center",
//   },
//   filterButtonTextInactive: {
//     color: "#000080",
//   },
//   questionContainer: {
//     backgroundColor: "#f2f2f2",
//     borderRadius: 10,
//     marginBottom: 20,
//     padding: 20,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   questionText: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   resultText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   correctResultText: {
//     color: "#4F8A10",
//   },
//   incorrectResultText: {
//     color: "#D8000C",
//   },
//   unansweredResultText: {
//     color: "#D3D3D3",
//   },
// });

// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";

// export default function PracticeResult({ route, navigation }) {
//   const { topic, results } = route.params;
//   const [filter, setFilter] = useState("all");

//   const handleFilterPress = (filter) => {
//     setFilter(filter);
//   };

//   const questions = topic.questions;

//   const renderResultItem = ({ item, index }) => {
//     const isCorrect = results[index] === "correct";
//     const isIncorrect = results[index] === "incorrect";
//     const isUnanswered = results[index] === null;

//     if (filter === "correct" && !isCorrect) {
//       return null;
//     }
//     if (filter === "wrong" && !isIncorrect) {
//       return null;
//     }
//     if (filter === "unanswered" && !isUnanswered) {
//       return null;
//     }

//     const questionText = `${index + 1}. ${item.questionText} ${
//       isCorrect ? "*" : isIncorrect ? "X" : ""
//     }`;

//     return (
//       <Text
//         style={[
//           styles.resultItem,
//           isCorrect && styles.correctResultItem,
//           isIncorrect && styles.incorrectResultItem,
//           isUnanswered && styles.unansweredResultItem,
//         ]}
//       >
//         {questionText}
//       </Text>
//     );
//   };

//   const numCorrect = results.filter((result) => result === "correct").length;
//   const numIncorrect = results.filter(
//     (result) => result === "incorrect"
//   ).length;
//   const numUnanswered = results.filter((result) => result === null).length;
//   const totalQuestions = questions.length;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.topicTitle}>{topic.topicName}</Text>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filter === "all" && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterPress("all")}
//         >
//           <Text style={styles.filterButtonText}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filter === "correct" && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterPress("correct")}
//         >
//           <Text style={styles.filterButtonText}>Correct</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filter === "wrong" && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterPress("wrong")}
//         >
//           <Text style={styles.filterButtonText}>Wrong</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filter === "unanswered" && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterPress("unanswered")}
//         >
//           <Text style={styles.filterButtonText}>Unanswered</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.resultContainer}
//             onPress={() => handleResultPress(item.title)}
//           >
//             <Text style={styles.resultTitle}>{item.title}</Text>
//             <View style={styles.resultDetailsContainer}>
//               <Text style={styles.resultDetailText}>
//                 Correct: {item.numCorrect}
//               </Text>
//               <Text style={styles.resultDetailText}>
//                 Incorrect: {item.numIncorrect}
//               </Text>
//               <Text style={styles.resultDetailText}>
//                 Unanswered: {item.numUnanswered}
//               </Text>
//             </View>
//             <View style={styles.questionListContainer}>
//               {item.questions.map((question, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.questionListItem,
//                     question.isCorrect && styles.correctQuestion,
//                     question.isIncorrect && styles.incorrectQuestion,
//                   ]}
//                 >
//                   <Text style={styles.questionText}>
//                     {question.text}{" "}
//                     {question.isCorrect ? (
//                       <Text style={styles.resultIcon}>✓</Text>
//                     ) : (
//                       <Text style={styles.resultIcon}>X</Text>
//                     )}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.title}
//         style={styles.listContainer}
//       />
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
//   resultContainer: {
//     backgroundColor: "#f2f2f2",
//     borderRadius: 10,
//     marginBottom: 20,
//     padding: 20,
//   },
//   resultTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   resultDetailsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   resultDetailText: {
//     fontSize: 16,
//     color: "gray",
//   },
//   questionListContainer: {
//     marginTop: 10,
//   },
//   questionListItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   questionText: {
//     flex: 1,
//     fontSize: 16,
//   },
//   resultIcon: {
//     fontSize: 16,
//     marginLeft: 10,
//     color: "#000080",
//   },
//   correctQuestion: {
//     backgroundColor: "#DFF2BF",
//   },
//   incorrectQuestion: {
//     backgroundColor: "#FFBABA",
//   },
// });

import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function PracticeResult({ route }) {
  const { topic, results } = route.params;

  const numCorrect = results.filter((result) => result === "correct").length;
  const numWrong = results.filter((result) => result === "incorrect").length;
  const numUnanswered = results.filter((result) => result === null).length;

  const allQuestions = topic.questions.map((question, index) => {
    const result = results[index];
    const isCorrect = result === "correct";
    const displayResult = result === "correct" ? "*" : "X";
    return {
      question: question.questionText,
      isCorrect,
      displayResult,
    };
  });

  const correctQuestions = allQuestions.filter(
    (question) => question.isCorrect
  );
  const wrongQuestions = allQuestions.filter((question) => !question.isCorrect);

  const renderItem = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        {item.question} {item.displayResult}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Results</Text>
        <Text style={styles.subtitle}>{topic.topicName}</Text>
      </View>
      <FlatList
        data={allQuestions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Filter:</Text>
        <Text style={styles.filterButton}>All ({results.length})</Text>
        <Text style={styles.filterButton}>Correct ({numCorrect})</Text>
        <Text style={styles.filterButton}>Incorrect ({numWrong})</Text>
        <Text style={styles.filterButton}>Unanswered ({numUnanswered})</Text>
      </View>
    </View>
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
  listContainer: {
    flex: 1,
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
    justifyContent: "space-between",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
  },
});
