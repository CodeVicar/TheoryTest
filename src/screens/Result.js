import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function PracticeResult({ route, navigation }) {
  const { questions, responses } = route.params;

  const totalQuestions = questions.length;
  const correctAnswers = responses.filter(
    (response, index) => response === questions[index].correctAnswer
  ).length;
  const wrongAnswers = responses.filter(
    (response, index) =>
      response !== questions[index].correctAnswer && response !== null
  ).length;
  const unansweredQuestions = responses.filter(
    (response) => response === null
  ).length;

  const filteredQuestions = (filterType) => {
    switch (filterType) {
      case "correct":
        return questions.filter((question, index) => {
          return responses[index] === question.correctAnswer;
        });
      case "wrong":
        return questions.filter((question, index) => {
          return (
            responses[index] !== question.correctAnswer &&
            responses[index] !== null
          );
        });
      case "unanswered":
        return questions.filter((question, index) => {
          return responses[index] === null;
        });
      default:
        return questions;
    }
  };

  const renderQuestionRow = (question, index) => {
    const response = responses[index];
    const isCorrect = response === question.correctAnswer;
    const responseText = isCorrect ? "*" : response !== null ? "x" : "";

    return (
      <View key={index} style={styles.questionRow}>
        <Text style={styles.questionText}>{question.questionText}</Text>
        <Text style={styles.responseText}>{responseText}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          You answered {correctAnswers} out of {totalQuestions} questions
          correctly
        </Text>
        <TouchableOpacity
          style={styles.summaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.summaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilter("all")}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilter("correct")}
        >
          <Text style={styles.filterButtonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilter("wrong")}
        >
          <Text style={styles.filterButtonText}>Wrong</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilter("unanswered")}
        >
          <Text style={styles.filterButtonText}>Unanswered</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.questionList}>
        {filteredQuestions(filter).map(renderQuestionRow)}
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
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
