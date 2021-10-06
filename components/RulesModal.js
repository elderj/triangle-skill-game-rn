import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const height = Dimensions.get('window').height

const modalText =
  "The triangle skill game is a classic puzzle." +
  "\n\nIt is played by jumping 1 peg over another into an empty space on the board." +
  '\n\nThe peg which just got "jumped" is then removed.' +
  "\n\nThe objective of the game is to continue jumping over pegs until only 1 peg remains, when this happens you win!" +
  "\n\nHowever, that doesnt always happen and sometimes you are left with more pegs on the board with no available moves." +
  "\n\nThe game is over when there are no more available moves.";

export default function RulesModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
    >
      <View style={styles.ModalBackground}>
        <View style={styles.modalView}>
          {!props.fontsLoaded ? (
            <Text style={styles.modalTitle}>How to play</Text>
          ) : (
            <Text
              style={{
                ...styles.modalTitle,
                fontFamily: "Quicksand_600SemiBold",
              }}
            >
              How to play
            </Text>
          )}
          {!props.fontsLoaded ? (
            <Text style={styles.modalText}>{modalText}</Text>
          ) : (
            <Text
              style={{
                ...styles.modalText,
                fontFamily: "Quicksand_400Regular",
              }}
            >
              {modalText}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              props.hide();
            }}
          >
            <View style={styles.ButtonContentContainer}>
              {!props.fontsLoaded ? (
                <Text style={styles.ButtonContent}>Let's Go!</Text>
              ) : (
                <Text
                  style={{
                    ...styles.ButtonContent,
                    fontFamily: "Quicksand_600SemiBold",
                  }}
                >
                  Let's Go!
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 0.021*height
  },

  ButtonContentContainer: {
    backgroundColor: "red",
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 10,

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
});
