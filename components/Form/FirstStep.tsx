import React, { useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions
} from "react-native";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormContext } from "../../App";
import * as yup from "yup";
import { Button as PaperButton, Text as PaperText } from "react-native-paper";

const FirstStep = () => {
  const {
    // @ts-ignore
    activeStepIndex,
    // @ts-ignore
    setActiveStepIndex,
    // @ts-ignore
    formData,
    // @ts-ignore
    setFormData,
    // @ts-ignore
    adminDataStore
  } = useContext(FormContext);

  const adminName = adminDataStore[0]?.name;

  const ValidationSchema = yup.object().shape({
    name: yup.string().required()
  });

  // @ts-ignore
  const ErrorMessage = ({ errorValue }) => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorValue}</Text>
    </View>
  );

  return (
    <Formik
      initialValues={{
        name: ""
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors
      }) => (
        <View style={styles.container}>
          <PaperText variant="bodyLarge" style={styles.text}>
            <>
              Hey, usually I'd ask you this in person, but what's your name? My
              names {adminName}.
            </>
          </PaperText>
          <TextInput
            style={styles.input}
            placeholder="your name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          <ErrorMessage errorValue={touched.name && errors.name} />
          <PaperButton mode="contained" onPress={handleSubmit}>
            Continue
          </PaperButton>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  text: {
    width: Dimensions.get("window").width - 50
  },
  errorContainer: {
    marginVertical: 5,
    marginBottom: 15
  },
  errorText: {
    color: "red"
  },
  container: {
    alignItems: "center",
    marginTop: 20
  },
  input: {
    marginVertical: 10,
    width: Dimensions.get("window").width - 50,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  }
});

export default FirstStep;
