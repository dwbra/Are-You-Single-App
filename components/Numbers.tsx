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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollViwContainer}>
          <View>
            <PaperText variant="headlineLarge" style={styles.title}>
              Previous Contacts
            </PaperText>
            {userDataStore.map((user: any, index: number) => {
              return (
                <View style={styles.dataTable} key={user.id}>
                  <Text style={styles.userData}>{user.name}</Text>
                  <Text style={styles.userData}>{user.number}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <PaperButton mode="contained" onPress={deleteAllNumbers}>
            Delete All Data Collected
          </PaperButton>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
  },
  userData: {
    color: "black",
    fontSize: 18,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  dataTable: {
    marginTop: 20,
    width: Dimensions.get("window").width - 50,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  title: {
    textAlign: "center",
    marginTop: 10,
  },
  scrollViwContainer: {
    marginBottom: 100,
  },
});

export default Numbers;
