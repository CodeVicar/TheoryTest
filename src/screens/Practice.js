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
    setSelectedAnswer(answerIndex);

    const newResults = [...results];
    const isCorrect =
      answerIndex === topic.questions[currentQuestion].correctAnswer;
    newResults[currentQuestion] = isCorrect ? "correct" : "incorrect";
    setResults(newResults);
  };

  const handleNextPress = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  const handleFinishPress = () => {
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
      <TouchableOpacity
        style={[
          styles.nextButton,
          selectedAnswer !== null && styles.activeButton,
        ]}
        onPress={
          currentQuestion === topic.questions.length - 1
            ? handleFinishPress
            : handleNextPress
        }
        disabled={selectedAnswer === null}
      >
        <Text
          style={[
            styles.nextButtonText,
            selectedAnswer !== null && styles.activeButtonText,
          ]}
        >
          {currentQuestion === topic.questions.length - 1 ? "Finish" : "Next"}
        </Text>
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
  questionContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  answerButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  answerButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "40%",
  },
  answerButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedAnswerButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "40%",
    borderWidth: 2,
    borderColor: "#000080",
  },
  selectedAnswerButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#000080",
  },
  correctAnswerButton: {
    backgroundColor: "#DFF2BF",
    borderRadius: 10,
    padding: 20,
    width: "40%",
  },
  correctAnswerButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#4F8A10",
  },
  wrongAnswerButton: {
    backgroundColor: "#FFBABA",
    borderRadius: 10,
    padding: 20,
    width: "40%",
  },
  wrongAnswerButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#D8000C",
  },
  questionNumberIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  questionNumberIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  questionNumberIndicatorActive: {
    backgroundColor: "#000080",
  },
  questionNumberIndicatorInactive: {
    backgroundColor: "#D3D3D3",
  },
});
