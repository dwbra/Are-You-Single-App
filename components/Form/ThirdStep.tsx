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

const ThirdStep = () => {
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

  const ValidationSchema = yup.object().shape({
    number: yup.number().required()
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
        number: 0
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(69);
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
            <>Sick! You can chuck in your digits below.</>
          </PaperText>
          <TextInput
            style={styles.input}
            placeholder="your number"
            keyboardType="numeric"
            onChangeText={handleChange("number")}
            onBlur={handleBlur("number")}
            maxLength={10}
            // @ts-ignore
            value={values.number}
          />
          <PaperButton mode="contained" onPress={handleSubmit}>
            Continue
          </PaperButton>
          <ErrorMessage errorValue={touched.number && errors.number} />
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
    marginTop: 15,
    width: Dimensions.get("window").width - 50
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

export default ThirdStep;
