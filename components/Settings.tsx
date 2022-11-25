import React, { useState, useEffect } from "react";
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
import { updateAdmin, createAdmin } from "../db/database-helpers";
import * as yup from "yup";
import { number } from "yup/lib/locale";

const Settings = () => {
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

  interface FormTypes {
    [key: string]: any;
    name: string;
    age: string;
    job: string;
  }

  // @ts-ignore
  const [adminFormData, setAdminFormData] = useState<FormTypes>({});
  const { name, age, job, id } = adminFormData;

  const handleSubmit = () => {
    if (adminFormData.length) {
      updateAdmin();
    } else {
      createAdmin();
    }
  };

  const updateAdmin = async () => {
    try {
      const result = await updateAdmin(id, name, age, job);
      // @ts-ignore
      if (adminFormData.length) {
        setAdminFormData(
          // @ts-ignore
          [...result._array]
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createAdmin = async () => {
    try {
      const result = await createAdmin(name, age, job);
      // @ts-ignore
      if (adminFormData.length) {
        setAdminFormData(
          // @ts-ignore
          [...result._array]
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              age: "",
              job: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => {
              // const data = { ...formData, ...values };
              // setFormData(data);
              // setActiveStepIndex(activeStepIndex + 1);
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
              <View style={styles.formStyling}>
                <PaperText>Name</PaperText>
                <TextInput
                  style={styles.input}
                  placeholder={
                    adminFormData.name ? adminFormData.name : "your name"
                  }
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                <PaperText>Age</PaperText>
                <TextInput
                  style={styles.input}
                  placeholder={
                    adminFormData.age ? adminFormData.age : "your age"
                  }
                  onChangeText={handleChange("age")}
                  onBlur={handleBlur("age")}
                  value={values.age}
                />
                <PaperText>Job</PaperText>
                <TextInput
                  style={styles.input}
                  placeholder={
                    adminFormData.job ? adminFormData.job : "your job"
                  }
                  onChangeText={handleChange("job")}
                  onBlur={handleBlur("job")}
                  value={values.job}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
                <ErrorMessage errorValue={touched.age && errors.age} />
                <ErrorMessage errorValue={touched.job && errors.job} />
              </View>
            )}
          </Formik>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <PaperButton mode="contained" onPress={handleSubmit}>
            {adminFormData ? "Update your details" : "Save your details"}
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
  formStyling: {
    marginLeft: "auto",
    marginRight: "auto",
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
