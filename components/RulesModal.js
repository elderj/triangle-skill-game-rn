import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const height = Dimensions.get("window").height;

const modalText =
  "Welcome to the Triangle Peg Jumping Game! " +
  "This classic puzzle challenges your skills and strategic thinking.\n\n" +
  "How to Play:\n" +
  "- Jump one peg over another into an empty space on the board.\n" +
  "- The peg that was jumped over is then removed.\n" +
  "- Continue jumping over pegs until only one peg remains to win!\n\n" +
  "Game Over:\n" +
  "- If no more available moves are left, the game ends.\n\n" +
  "Extra Challenge:\n" +
  "- Try changing the location of the empty space with the Set Empty option.\n" +
  "- Note: This option is available only when 14 pegs remain.";

export default function RulesModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.rulesModalVisible}
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
    fontSize: 0.021 * height,
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
