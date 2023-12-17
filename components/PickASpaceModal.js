import React from "react";
import {
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Circle from "./Circle";
import {
  getAllFilledSpaces,
  getDefaultSpaces,
  getSpecificEmpty,
} from "../data/boardValueUtils";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function PickASpaceModal(props) {
  const renderSpaces = (spacesToRender) => {
    const rows = [];
    spacesToRender.forEach((row, rIdx) => {
      const cols = [];
      row.forEach((col, cIdx) => {
        cols.push(
          <TouchableOpacity
            key={cIdx}
            onPress={() => {
              clickSpace(cIdx, rIdx);
            }}
          >
            <Circle inv condition={spacesToRender[rIdx][cIdx]} />
          </TouchableOpacity>
        );
      });
      rows.push(
        <View key={rIdx} style={styles.Row}>
          {cols}
        </View>
      );
    });

    return <View>{rows}</View>;
  };

  const clickSpace = (cIdx, rIdx) => {
    const newSpaces = getSpecificEmpty(cIdx, rIdx);
    props.setSpaces(newSpaces);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.pickASpaceVisible}
    >
      <ImageBackground
        source={require("../assets/trianglesGray.png")}
        style={styles.ImageBg}
      >
        {!props.fontsLoaded ? (
          <Text style={styles.modalTitle}>Select an Empty Space</Text>
        ) : (
          <Text
            style={{
              ...styles.modalTitle,
              fontFamily: "Quicksand_600SemiBold",
            }}
          >
            Select an Empty Space
          </Text>
        )}

        <View style={styles.Board}>
          {props.spaces && (
            <ImageBackground
              source={require("../assets/triColor.png")}
              style={{
                aspectRatio: 1,
                resizeMode: "contain",
                width: width / 1.1,
                paddingTop: width / 6.5,
              }}
            >
              {renderSpaces(props.spaces)}
            </ImageBackground>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            props.hide();
          }}
        >
          <View style={styles.ButtonContentContainer}>
            {!props.fontsLoaded ? (
              <Text style={styles.ButtonContent}>OK</Text>
            ) : (
              <Text
                style={{
                  ...styles.ButtonContent,
                  fontFamily: "Quicksand_600SemiBold",
                }}
              >
                Ok
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Board: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 0,
  },

  Row: {
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 0,
  },

  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
  },
  ButtonContentContainer: {
    backgroundColor: "red",
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 50,
  },
  ButtonContent: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    backgroundColor: "red",
    color: "white",
    fontSize: 18,
    paddingHorizontal: 10,
  },

  ImageBg: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
});
