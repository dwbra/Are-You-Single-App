import React, { useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { FormContext } from "../../App";
import { Button as PaperButton, Text as PaperText } from "react-native-paper";

const SecondStep = () => {
  const {
    // @ts-ignore
    activeStepIndex,
    // @ts-ignore
    setActiveStepIndex,
    // @ts-ignore
    formData,
    // @ts-ignore
    adminDataStore
  } = useContext(FormContext);

  const { name } = formData;

  const accept = () => {
    setActiveStepIndex(2);
  };

  const deny = () => {
    setActiveStepIndex(99);
  };

  return (
    <View style={styles.container}>
      <PaperText variant="bodyLarge" style={styles.text}>
        <>
          Nice to make your acquaintance {name}. So I'm going to keep it short
          and sweet, I think you're cute and I'd like to ask for your number if
          thats cool?
        </>
      </PaperText>
      <View style={styles.buttonFlex}>
        <PaperButton mode="contained" onPress={accept}>
          Yes
        </PaperButton>
        <PaperButton mode="contained" onPress={deny}>
          No
        </PaperButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    width: Dimensions.get("window").width - 50
  },
  container: {
    alignItems: "center",
    marginTop: 20
  },
  buttonFlex: {
    width: Dimensions.get("window").width - 50,
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export default SecondStep;
