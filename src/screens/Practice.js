import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function Practice({ route, navigation }) {
  const { topic } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [results, setResults] = useState(
    Array(topic.questions.length).fill(null)
  );

  const handleAnswerPress = (answerIndex) => {
    // When an answer is selected, update the selected answer state and the results state
    setSelectedAnswer(answerIndex);

    const newResults = [...results];
    const isCorrect =
      answerIndex === topic.questions[currentQuestion].correctAnswer;
    newResults[currentQuestion] = isCorrect ? "correct" : "incorrect";
    setResults(newResults);
  };

  const handleNextPress = () => {
    // When the next button is pressed, update the current question state and reset the selected answer state
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  const handlePrevPress = () => {
    // When the prev button is pressed, update the current question state and reset the selected answer state
    setCurrentQuestion(currentQuestion - 1);
    setSelectedAnswer(null);
  };

  const handleHintPress = () => {
    // You can implement your own hint logic here
    alert(topic.questions[currentQuestion].hint);
  };

  const handleFinishPress = () => {
    // When the finish button is pressed, navigate to the practice result screen with the topic and results as parameters
    navigation.navigate("PracticeResult", { topic, results });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topicTitle}>{topic.topicName}</Text>
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
              results[currentQuestion] === "correct" &&
                selectedAnswer === index &&
                styles.correctAnswerButton,
              results[currentQuestion] === "incorrect" &&
                selectedAnswer === index &&
                styles.incorrectAnswerButton,
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
          <TouchableOpacity style={styles.hintButton} onPress={handleHintPress}>
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
            disabled={selectedAnswer === null}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  topicTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  answerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  selectedAnswerButton: {
    backgroundColor: "#4CAF50",
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
