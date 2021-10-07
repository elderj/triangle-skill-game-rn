import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export default function Circle(props) {
  return (
    <React.Fragment>
      {props.condition === "open" && <View style={styles.EmptyCircle} />}
      {props.condition === "filled" && <View style={styles.FullCircle} />}
      {props.condition === "selected" && <View style={styles.SelectedCircle} />}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  EmptyCircle: {
    width: windowWidth / 12,
    height: windowWidth / 12,
    borderRadius: windowWidth / 2,
    backgroundColor: "grey",
    margin: windowWidth / 50,
    zIndex: 2,
  },
  FullCircle: {
    width: windowWidth / 12,
    height: windowWidth / 12,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: windowWidth / 2,
    backgroundColor: "white",
    margin: windowWidth / 50,
    zIndex: 2,
  },
  SelectedCircle: {
    width: windowWidth / 12,
    height: windowWidth / 12,
    borderRadius: windowWidth / 2,
    borderColor: "maroon",
    borderWidth: 2,
    backgroundColor: "red",
    margin: windowWidth / 50,
    zIndex: 2,
  },
});
