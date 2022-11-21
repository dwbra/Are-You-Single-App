import React, { useCallback, useState, useEffect, useContext } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Dimensions,
} from "react-native";
import { FormContext } from "../App";
import { getUserData, deleteAllUsers } from "../db/database-helpers";
import { Button as PaperButton, Text as PaperText } from "react-native-paper";

const Numbers = () => {
  // @ts-ignore
  const { userDataStore, setUserDataStore, activeStepIndex } =
    useContext(FormContext);

  const getUserInfo = async () => {
    try {
      const userData: {} = (await getUserData()) as {};
      // @ts-ignore
      if (userData.length) {
        setUserDataStore(
          // @ts-ignore
          [...userData._array]
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllNumbers = async () => {
    try {
      const deleted = await deleteAllUsers();
      setUserDataStore([]);
      // @ts-ignore
      console.log(deleted.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [activeStepIndex]);

  // console.log(activeStepIndex);
  // console.log(userDataStore);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {userDataStore.map((user: any, index: number) => (
          <Text key={index} style={styles.text}>
            {user.name}
          </Text>
        ))}
      </View>
      <PaperButton
        mode="contained"
        style={styles.deleteButton}
        onPress={deleteAllNumbers}
      >
        Delete All Data Collected
      </PaperButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 50,
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  deleteButton: {},
});

export default Numbers;
