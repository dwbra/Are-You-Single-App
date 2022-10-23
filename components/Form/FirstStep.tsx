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
import { Button as PaperButton } from "react-native-paper";

const FirstStep = () => {
  // @ts-ignore
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message: any) => <Text>{message}</Text>;

  const ValidationSchema = yup.object().shape({
    name: yup.string().required()
  });

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
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <TextInput
            style={styles.input}
            placeholder="your name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          <Button onPress={handleSubmit} title="continue" />
        </View>
      )}
    </Formik>
  );
};

// <View style={styles.todoContainer}>
//   <View style={styles.todoTextContainer}>
//     <Text style={styles.sectionTitle}>{"FIRST STEP"}</Text>
//   </View>
//   <Button
//     // onPress={() => deleteItem(id)}
//     title="Yes"
//     color="#841584"
//     accessibilityLabel="yes"
//   />
//   <Button
//     // onPress={() => deleteItem(id)}
//     title="No"
//     color="#841584"
//     accessibilityLabel="no"
//   />
// </View>

// const styles = StyleSheet.create({
//   todoContainer: {
//     marginTop: 10,
//     paddingHorizontal: 24,
//     backgroundColor: "deepskyblue",
//     marginLeft: 20,
//     marginRight: 20,
//     borderRadius: 10,
//     borderColor: "black",
//     borderWidth: 1
//   },
//   todoTextContainer: {
//     justifyContent: "center",
//     flexDirection: "row"
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "400"
//   }
// });

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: "red"
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40
  },
  input: {
    marginVertical: 10,
    width: Dimensions.get("window").width - 100,

    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width - 200,
    height: 44,
    borderRadius: 5,
    backgroundColor: "#343434"
  },
  buttonText: {
    fontSize: 42,
    color: "red"
  }
});

export default FirstStep;
