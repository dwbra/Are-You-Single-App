import React, { useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import { FormContext } from "../App";

const Stepper = () => {
  // @ts-ignore
  const { activeStepIndex } = useContext(FormContext);

  //use a ternary to return the correct progression step based on context
  let progress =
    activeStepIndex === 0
      ? 0.25
      : activeStepIndex === 1
      ? 0.5
      : activeStepIndex === 2
      ? 0.75
      : activeStepIndex === 69
      ? 1
      : activeStepIndex === 99
      ? 1
      : 0;
  return (
    <SafeAreaView>
      <ProgressBar progress={progress} style={styles.stepper} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stepper: {
    height: 10
  }
});

export default Stepper;
