import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

import GameWonModal from "./GameWonModal";
import Circle from "./Circle";
import RulesModal from "./RulesModal";

import { getDefaultSpaces, getSpecificEmpty } from "../data/boardValueUtils";
const height = Dimensions.get("window").height;

const adUnitID = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-9896015466295501/4766046254";

const interstitial = InterstitialAd.createForAdRequest(adUnitID, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

export default function GameBoard(props) {
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [gameWonModalVisible, setGameWonModalVisible] = useState(false);
  const [spaces, setSpaces] = useState(getDefaultSpaces());
  const [firstSelection, setFirstSelection] = useState();
  const [pegsRemaining, setPegsRemaining] = useState(14);
  const [resetCount, setResetCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const emptySpace = { col: 0, row: 0 };

  const showInterstitial = async () => {
    interstitial.show();
    try {
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (pegsRemaining === 1) {
      setGameWonModalVisible(true);
    }
  }, [pegsRemaining]);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    interstitial.load(); // Start loading the interstitial straight away
    return unsubscribe; // Unsubscribe from events on unmount
  }, []);

  if (!loaded) {
    return null; // No advert ready to show yet
  }

  const reset = () => {
    setPegsRemaining(14);
    setFirstSelection([]);
    setSpaces(getSpecificEmpty(emptySpace.col, emptySpace.row));
  };

  const handleReset = () => {
    if (pegsRemaining < 14) {
      resetCount % 2 == 0 && showInterstitial();
      setResetCount(resetCount + 1);
    }
    reset();
  };

  const clickSpace = (col, row) => {
    if (firstSelection === undefined || firstSelection.length === 0) {
      // First Selection
      if (spaces[row][col] === "filled") {
        setFirstSelection([row, col]);
        const newSpaces = spaces.slice();
        newSpaces[row][col] = "selected";
        setSpaces(newSpaces);
      }
    } else {
      // Second Selection
      let previouslySelectedRow = firstSelection[0];
      let previouslySelectedCol = firstSelection[1];
      const newSpaces = spaces.slice();
      newSpaces[previouslySelectedRow][previouslySelectedCol] = "filled";

      if (spaces[row][col] === "open") {
        //Check 1: horizontal moves
        if (
          row === previouslySelectedRow &&
          Math.abs(col - previouslySelectedCol) === 2
        ) {
          let middleCol = col > previouslySelectedCol ? col - 1 : col + 1;
          if (spaces[row][middleCol] === "filled") {
            newSpaces[row][col] = "filled";
            newSpaces[row][previouslySelectedCol] = "open";
            newSpaces[row][middleCol] = "open";
            setPegsRemaining(pegsRemaining - 1);
          }
        }

        // Check 2: Diagonal (Normal) Moves
        if (
          col === previouslySelectedCol &&
          Math.abs(row - previouslySelectedRow) === 2
        ) {
          let middleRow = row > previouslySelectedRow ? row - 1 : row + 1;
          if (spaces[middleRow][col] === "filled") {
            newSpaces[previouslySelectedRow][previouslySelectedCol] = "open";
            newSpaces[middleRow][col] = "open";
            newSpaces[row][col] = "filled";
            setPegsRemaining(pegsRemaining - 1);
          }
        }
        // // Check 3: Diagonal (Inverse) Moves
        if (
          Math.abs(row - previouslySelectedRow) === 2 &&
          Math.abs(col - previouslySelectedCol) === 2
        ) {
          let middleRow = row > previouslySelectedRow ? row - 1 : row + 1;
          let middleCol = col > previouslySelectedCol ? col - 1 : col + 1;
          if (spaces[middleRow][middleCol] === "filled") {
            newSpaces[previouslySelectedRow][previouslySelectedCol] = "open";
            newSpaces[middleRow][middleCol] = "open";
            newSpaces[row][col] = "filled";
            setPegsRemaining(pegsRemaining - 1);
          }
        }
      }
      setSpaces(newSpaces);
      setFirstSelection([]);
    }
  };

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
            <Circle condition={spacesToRender[rIdx][cIdx]} />
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

  return (
    <View style={styles.GameLogicContainer}>
      <RulesModal
        rulesModalVisible={rulesModalVisible}
        hide={() => setRulesModalVisible(false)}
        fontsLoaded={props.fontsLoaded}
      />
      <ImageBackground
        source={require("../assets/tri.png")}
        style={{
          aspectRatio: 1,
          resizeMode: "contain",
        }}
      >
        <View style={styles.Board}>
          {spaces && renderSpaces(spaces, false)}
        </View>
        <View style={styles.PegsRemainingContainer}>
          {!props.fontsLoaded ? (
            <Text style={styles.PegsRemaining}>
              Pegs Remaining: {pegsRemaining}
            </Text>
          ) : (
            <Text
              style={{
                ...styles.PegsRemaining,
                fontFamily: "Quicksand_600SemiBold",
              }}
            >
              Pegs Remaining: {pegsRemaining}
            </Text>
          )}
        </View>
      </ImageBackground>
      <GameWonModal
        rulesModalVisible={gameWonModalVisible}
        hide={() => {
          setGameWonModalVisible(false);
          reset();
        }}
        fontsLoaded={props.fontsLoaded}
      />
      <ImageBackground
        source={require("../assets/trianglesGray.png")}
        style={styles.ImageBg}
      >
        <View style={styles.FooterLine}>
          <TouchableOpacity
            onPress={() => {
              setRulesModalVisible(true);
            }}
          >
            <View style={styles.ButtonContentContainer}>
              {!props.fontsLoaded ? (
                <Text style={styles.ButtonContent}>Rules</Text>
              ) : (
                <Text
                  style={{
                    ...styles.ButtonContent,
                    fontFamily: "Quicksand_600SemiBold",
                  }}
                >
                  Rules
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleReset();
            }}
          >
            <View style={styles.ButtonContentContainer}>
              {!props.fontsLoaded ? (
                <Text style={styles.ButtonContent}>Reset</Text>
              ) : (
                <Text
                  style={{
                    ...styles.ButtonContent,
                    fontFamily: "Quicksand_600SemiBold",
                  }}
                >
                  Reset
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.FooterLine}>
          <View style={styles.FooterLine}>
            <Text
              onPress={() =>
                Linking.openURL(
                  "https://elderdesignconcepts.com/#/portfolio/triangle-skill-game/terms"
                )
              }
              style={{ ...styles.informationalLinkText, textAlign: "right" }}
            >
              Terms of Service
            </Text>
            <Text style={styles.separator}>|</Text>
            <Text
              onPress={() =>
                Linking.openURL(
                  "https://elderdesignconcepts.com/#/portfolio/triangle-skill-game/privacy"
                )
              }
              style={{ ...styles.informationalLinkText, textAlign: "left" }}
            >
              Privacy Policy
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  GameLogicContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
  },

  Board: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: height / 12,
  },

  Row: {
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  PegsRemainingContainer: {
    justifyContent: "center",
  },
  PegsRemaining: {
    textAlign: "center",
    fontSize: 0.03 * height,
    color: "white",
    marginTop: 20,
  },
  ImageBg: {
    backgroundColor: "gray",
    borderTopColor: "black",
    borderTopWidth: 2,
    paddingVertical: 3,
  },
  FooterLine: {
    justifyContent: "center",
    flexDirection: "row",
  },
  ButtonContentContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    margin: 10,
  },
  ButtonContent: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  informationalLinkText: {
    color: "orange",
    fontWeight: "bold",
    width: 200,
    paddingHorizontal: 5,
    fontSize: 0.016 * height,
    textAlign: "center",
    textAlignVertical: "center",
  },
  separator: {
    fontSize: 24,
    fontWeight: "bold",
    color: "teal",
    textAlignVertical: "center",
  },
});
