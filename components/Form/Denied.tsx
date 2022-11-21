import React, { useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button as PaperButton, Text as PaperText } from "react-native-paper";
import { FormContext } from "../../App";

const Denied = () => {
  // @ts-ignore
  const { setFormData, setActiveStepIndex } = useContext(FormContext);
  const restartForm = () => {
    setFormData({});
    setActiveStepIndex(0);
  };
  return (
    <View style={styles.container}>
      <PaperText variant="bodyLarge" style={styles.text}>
        <>
          No worries! I get this is a bit of a weird way to ask someone out so
          no stress. Take it easy!
        </>
      </PaperText>
      <PaperButton mode="contained" onPress={restartForm}>
        Restart
      </PaperButton>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    width: Dimensions.get("window").width - 50,
  },
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonFlex: {
    width: Dimensions.get("window").width - 50,
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Denied;
