import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import ProgressCircle from "react-native-progress-circle";
//import Ionicons

export default function PracticeResult({ route }) {
  const { topic, results } = route.params;
  const [filteredQuestions, setFilteredQuestions] = useState(
    topic.questions.map((question, index) => {
      const result = results[index];
      const isCorrect = result === "correct";
      const displayResult = isCorrect ? "*" : "X";
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

  const handleFilterPress = (filter) => {
    if (filter === "All") {
      setFilteredQuestions(
        topic.questions.map((question, index) => {
          const result = results[index];
          const isCorrect = result === "correct";
          const displayResult = isCorrect ? "*" : "X";
          return {
            question: question.questionText,
            isCorrect,
            displayResult,
          };
        })
      );
    } else if (filter === "Correct") {
      setFilteredQuestions(correctQuestions);
    } else if (filter === "Incorrect") {
      setFilteredQuestions(wrongQuestions);
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
        <Text
          style={styles.filterButton}
          onPress={() => handleFilterPress("All")}
        >
          All ({totalQuestions})
        </Text>
        <Text
          style={styles.filterButton}
          onPress={() => handleFilterPress("Correct")}
        >
          Correct ({numCorrect})
        </Text>
        <Text
          style={styles.filterButton}
          onPress={() => handleFilterPress("Incorrect")}
        >
          Incorrect ({numWrong})
        </Text>
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
    justifyContent: "space-between",
    marginTop: 20,
  },
  filterButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
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
