import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
// import { ToDoItem } from "../type-models";

const FirstStep = () => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoTextContainer}>
        <Text style={styles.sectionTitle}>{"FIRST STEP"}</Text>
      </View>
      <Button
        // onPress={() => deleteItem(id)}
        title="Yes"
        color="#841584"
        accessibilityLabel="yes"
      />
      <Button
        // onPress={() => deleteItem(id)}
        title="No"
        color="#841584"
        accessibilityLabel="no"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: "deepskyblue",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1
  },
  todoTextContainer: {
    justifyContent: "center",
    flexDirection: "row"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "400"
  }
});

export default FirstStep;
