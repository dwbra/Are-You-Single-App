import React, { useState, useEffect, useContext } from "react";
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
import { Button as PaperButton, Text as PaperText } from "react-native-paper";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { updateAdmin, createAdmin, getAdminData } from "../db/database-helpers";
import * as yup from "yup";
import { FormContext } from "../App";

const Settings = () => {
  const {
    // @ts-ignore
    adminDataStore,
    // @ts-ignore
    setAdminDataStore,
    // @ts-ignore
    doesAdminExist,
  } = useContext(FormContext);

  const ValidationSchema = yup.object().shape({
    name: yup.string().required(),
    age: yup.string().required(),
    job: yup.string().required(),
  });

  // @ts-ignore
  const ErrorMessage = ({ errorValue }) => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorValue}</Text>
    </View>
  );

  const { name, age, job, id } = adminDataStore;
  // const ageInt = parseInt(age);
  // console.log(ageInt);

  // useEffect(() => {
  //   const adminData = getAdminData();
  //   console.log(adminData);
  // }, [adminDataStore]);

  const updateAdminDatabase = () => {
    console.log("DB UPDATE ADMIN FLUNCLTOO: FIRING")
    if (adminDataStore.length > 0 && doesAdminExist === false) {
      createAdminDB();
    } else {
      updateAdminDB();
    }
  };

  const updateAdminDB = async () => {
    try {
      // @ts-ignore
      if (adminDataStore.length > 0) {
        const result = await updateAdmin(id, name, age, job);
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createAdminDB = async () => {
    try {
      // @ts-ignore
      if (adminDataStore.length > 0) {
        const result = await createAdmin(name, age, job);
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(
    "Settings component - adminDataStore useContext useState: " +
      JSON.stringify(adminDataStore)
  );

  useEffect(() => {
    updateAdminDatabase();
  }, [adminDataStore]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollViwContainer}>
          <View>
            <PaperText variant="headlineLarge" style={styles.title}>
              Admin Settings
            </PaperText>
          </View>
          <Formik
            initialValues={{
              name: "",
              age: 0,
              job: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => {
              setAdminDataStore([{ ...values }]);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <View style={styles.formContainer}>
                <View style={styles.formStyling}>
                  <PaperText>Name</PaperText>
                  <TextInput
                    style={styles.input}
                    placeholder={
                      adminDataStore.name ? adminDataStore.name : "your name"
                    }
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  <PaperText>Age</PaperText>
                  <TextInput
                    style={styles.input}
                    placeholder={
                      adminDataStore.age ? adminDataStore.age : "your age"
                    }
                    onChangeText={handleChange("age")}
                    onBlur={handleBlur("age")}
                    keyboardType="numeric"
                    // @ts-ignore
                    value={values.age}
                  />
                  <PaperText>Job</PaperText>
                  <TextInput
                    style={styles.input}
                    placeholder={
                      adminDataStore.job ? adminDataStore.job : "your job"
                    }
                    onChangeText={handleChange("job")}
                    onBlur={handleBlur("job")}
                    value={values.job}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                  <ErrorMessage errorValue={touched.age && errors.age} />
                  <ErrorMessage errorValue={touched.job && errors.job} />
                </View>
                <View style={styles.buttonContainer}>
                  <PaperButton mode="contained" onPress={handleSubmit}>
                    {!!adminDataStore
                      ? "Update your details"
                      : "Save your details"}
                  </PaperButton>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
  },
  formContainer: {
    position: "relative",
    height: "100%",
  },
  formStyling: {
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
  },
  userData: {
    color: "black",
    fontSize: 18,
  },
  buttonContainer: {
    position: "absolute",
    bottom: -100,
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
  errorContainer: {
    marginTop: 15,
    width: Dimensions.get("window").width - 50,
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  input: {
    marginVertical: 10,
    width: Dimensions.get("window").width - 50,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
export default Settings;
