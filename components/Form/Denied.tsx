import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text as PaperText } from "react-native-paper";

const Denied = () => {
  return (
    <View style={styles.container}>
      <PaperText variant="bodyLarge" style={styles.text}>
        <>
          No worries! I get this is a bit of a weird way to ask someone out so
          no stress. Take it easy!
        </>
      </PaperText>
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

export default Denied;
