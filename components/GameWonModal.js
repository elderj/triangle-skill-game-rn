import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameWonModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.rulesModalVisible}
    >
      <View style={styles.ModalBackground}>
        <View style={styles.modalView}>
          {!props.fontsLoaded ? (
            <Text style={styles.modalTitle}>You Won!</Text>
          ) : (
            <Text
              style={{
                ...styles.modalTitle,
                fontFamily: "Quicksand_600SemiBold",
              }}
            >
              You Won!
            </Text>
          )}
          <Text style={styles.party}>🎉</Text>

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
                  OK
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
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 35,
  },
  party: {
    fontSize: 30,
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
