import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from "react-native";

type Props = {};

const Home = (props: Props) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}> To Do Application </Text>
        </View>
        {/* <View>
          {todos.map((todo) => (
            <ToDoItemComponent
              key={todo.id}
              todo={todo}
              deleteItem={deleteItem}
            />
          ))}
        </View> */}
        <View style={styles.textInputContainer}>
          <Text> What's your name? </Text>
          <TextInput
            style={styles.textInput}
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
          <Button
            onPress={addTodo}
            title="Next"
            color="#841584"
            accessibilityLabel="next button to continue on with the questions"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
