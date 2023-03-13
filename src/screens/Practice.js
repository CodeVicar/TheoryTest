import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Practice({ route, navigation }) {
  // Get the topic from the navigation params
  const { topic } = route.params;

  // Initialize state variables
  const [currentQuestion, setCurrentQuestion] = useState(0); // Index of the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Index of the selected answer for the current question
  const [results, setResults] = useState(
    // Array of results for each question (either 'correct', 'incorrect', or 'unanswered')
    Array(topic.questions.length).fill(null)
  );
  const [answered, setAnswered] = useState(false); // Whether the user has answered the current question

  // Function to handle when the user selects an answer
  const handleAnswerPress = (answerIndex) => {
    setSelectedAnswer(answerIndex); // Set the index of the selected answer
    setAnswered(true); // Set answered to true

    const newResults = [...results]; // Copy the current results array
    const isCorrect =
      answerIndex === topic.questions[currentQuestion].correctAnswer; // Check if the selected answer is correct
    newResults[currentQuestion] = isCorrect ? "correct" : "incorrect"; // Update the results array with the result for the current question
    setResults(newResults); // Set the updated results array
  };

  // Function to handle when the user presses the Next button
  const handleNextPress = () => {
    setCurrentQuestion(currentQuestion + 1); // Move to the next question
    setSelectedAnswer(null); // Reset the selected answer
    setAnswered(false); // Set answered to false

    // If the user hasn't selected an answer, mark the question as unanswered
    if (selectedAnswer === null) {
      const newResults = [...results]; // Copy the current results array
      newResults[currentQuestion] = "unanswered"; // Set the result for the current question to 'unanswered'
      setResults(newResults); // Set the updated results array
    }
  };

  // Function to handle when the user presses the Prev button
  const handlePrevPress = () => {
    setCurrentQuestion(currentQuestion - 1); // Move to the previous question
    setSelectedAnswer(null); // Reset the selected answer
    setAnswered(false); // Set answered to false
  };

  // Function to handle when the user presses the Hint button

  // Function to handle when the user presses the Hint button
  const handleHintPress = () => {
    alert(topic.questions[currentQuestion].hint); // Show an alert with the hint for the current question
  };

  // Function to handle when the user presses the Finish button
  const handleFinishPress = () => {
    navigation.navigate("PracticeResult", { topic, results }); // Navigate to the PracticeResult screen with the topic and results as params
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {topic.questions.length}
          </Text>
          <Text style={styles.topicTitle}>{topic.topicName}</Text>
        </View>

        <Text style={styles.questionText}>
          {topic.questions[currentQuestion].questionText}
        </Text>

        <FlatList
          data={topic.questions[currentQuestion].answers}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === index && styles.selectedAnswerButton,
                // results[currentQuestion] === "correct" &&
                //   selectedAnswer === index &&
                //   styles.correctAnswerButton,
                // results[currentQuestion] === "incorrect" &&
                //   selectedAnswer === index &&
                //   styles.incorrectAnswerButton,
              ]}
              onPress={() => handleAnswerPress(index)}
            >
              <Text style={styles.answerButtonText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.answersContainer}
        />

        <View style={styles.bottomButtonsContainer}>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                styles.prevButton,
                currentQuestion === 0 && styles.disabledButton,
              ]}
              onPress={handlePrevPress}
              disabled={currentQuestion === 0}
            >
              <Text style={styles.bottomButtonText}>Prev</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.hintButton}
              onPress={handleHintPress}
            >
              <Text style={styles.bottomButtonText}>?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                styles.nextButton,
                selectedAnswer === null && styles.disabledButton,
                currentQuestion === topic.questions.length - 1 &&
                  selectedAnswer !== null &&
                  styles.lastButton,
              ]}
              onPress={
                currentQuestion === topic.questions.length - 1
                  ? handleFinishPress
                  : handleNextPress
              }
              disabled={false}
            >
              <Text style={styles.bottomButtonText}>
                {currentQuestion === topic.questions.length - 1
                  ? "Finish"
                  : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  questionNumber: {
    fontSize: 18,
    color: "#333",

    marginHorizontal: 20,
  },
  topicTitle: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  answerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "silver",
  },
  selectedAnswerButton: {
    backgroundColor: "lightblue",
    borderColor: "#4CAF50",
  },
  correctAnswerButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  incorrectAnswerButton: {
    backgroundColor: "#F44336",
    borderColor: "#F44336",
  },
  answerButtonText: {
    fontSize: 18,
    color: "#333",
  },
  answersContainer: {
    flex: 1,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  bottomView: {
    flex: 1,
    alignItems: "center",
  },
  bottomButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
  prevButton: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  hintButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
    marginBottom: 10,
  },
  lastButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
    marginBottom: 10,
  },
  bottomButtonText: {
    fontSize: 18,
    color: "#333",
  },
});
