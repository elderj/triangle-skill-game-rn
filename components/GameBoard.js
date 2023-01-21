import React from "react";
import {
  Dimensions,
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import GameWonModal from "./GameWonModal";
import Circle from "./Circle";
import RulesModal from "./RulesModal";

import {
  getDefaultSpaces,
  getAllEmptySpaces,
  getSpecificEmpty,
} from "../data/boardValueUtils";
import EmptySpaceSelectionModal from "./EmptySpaceSelectionModal";
const height = Dimensions.get("window").height;

// For local testing:
const testID = "ca-app-pub-3940256099942544/1033173712";
const adUnitID = testID;

// For prod build/release:
// const productionID = "ca-app-pub-9896015466295501/4766046254";
// const adUnitID = productionID;

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.pegsRemaining = 14;
    this.resetCount = 0;
    this.state = {
      spaces: getDefaultSpaces(),
      rulesModalVisible: false,
      gameWonModalVisible: false,
      setEmptySpaceModalVisible: false,
      emptySpace: { col: 0, row: 0 },
    };
  }

  showRulesModal() {
    this.setState({ rulesModalVisible: true });
  }
  hideRulesModal() {
    this.setState({ rulesModalVisible: false });
  }

  showSetEmptyModal() {
    this.setState({ setEmptySpaceModalVisible: true });
  }
  hideSetEmptyModal() {
    this.setState({ setEmptySpaceModalVisible: false });
  }

  showInterstitial = async () => {
    //Show the ad

    console.log("Hello friend buy this");
    try {
    } catch (e) {
      console.log(e);
    }
  };

  reset() {
    this.pegsRemaining = 14;
    this.setState({
      spaces: getSpecificEmpty(
        this.state.emptySpace.col,
        this.state.emptySpace.row
      ),
      firstSelection: [],
    });
  }

  handleReset() {
    if (this.pegsRemaining < 14) {
      this.resetCount % 2 == 0 && this.showInterstitial();
      this.resetCount++;
    }

    this.reset();
  }

  clickSpace(col, row) {
    if (
      this.state.firstSelection === undefined ||
      this.state.firstSelection.length === 0
    ) {
      // First Selection
      if (this.state.spaces[row][col] === "filled") {
        this.setState({ firstSelection: [row, col] });
        const newSpaces = this.state.spaces.slice();
        newSpaces[row][col] = "selected";
        this.setState({ spaces: newSpaces });
      }
    } else {
      // Second Selection
      let previouslySelectedRow = this.state.firstSelection[0];
      let previouslySelectedCol = this.state.firstSelection[1];
      const newSpaces = this.state.spaces.slice();
      newSpaces[previouslySelectedRow][previouslySelectedCol] = "filled";

      if (this.state.spaces[row][col] === "open") {
        //Check 1: horizontal moves
        if (
          row === previouslySelectedRow &&
          Math.abs(col - previouslySelectedCol) === 2
        ) {
          let middleCol = col > previouslySelectedCol ? col - 1 : col + 1;
          if (this.state.spaces[row][middleCol] === "filled") {
            newSpaces[row][col] = "filled";
            newSpaces[row][previouslySelectedCol] = "open";
            newSpaces[row][middleCol] = "open";
            this.pegsRemaining--;
          }
        }

        // Check 2: Diagonal (Normal) Moves
        if (
          col === previouslySelectedCol &&
          Math.abs(row - previouslySelectedRow) === 2
        ) {
          let middleRow = row > previouslySelectedRow ? row - 1 : row + 1;
          if (this.state.spaces[middleRow][col] === "filled") {
            newSpaces[previouslySelectedRow][previouslySelectedCol] = "open";
            newSpaces[middleRow][col] = "open";
            newSpaces[row][col] = "filled";
            this.pegsRemaining--;
          }
        }
        // // Check 3: Diagonal (Inverse) Moves
        if (
          Math.abs(row - previouslySelectedRow) === 2 &&
          Math.abs(col - previouslySelectedCol) === 2
        ) {
          let middleRow = row > previouslySelectedRow ? row - 1 : row + 1;
          let middleCol = col > previouslySelectedCol ? col - 1 : col + 1;
          if (this.state.spaces[middleRow][middleCol] === "filled") {
            newSpaces[previouslySelectedRow][previouslySelectedCol] = "open";
            newSpaces[middleRow][middleCol] = "open";
            newSpaces[row][col] = "filled";
            this.pegsRemaining--;
          }
        }
      }
      this.setState({ spaces: newSpaces, firstSelection: [] });
      if (this.pegsRemaining === 1) {
        this.setState({ gameWonModalVisible: true });
      }
    }
  }

  setEmpty(col, row) {
    this.setState({
      spaces: getSpecificEmpty(col, row),
      emptySpace: { col, row },
      firstSelection: [],
    });
    this.pegsRemaining = 14;
    this.hideSetEmptyModal();
  }

  renderSpaces(spacesToRender, gameSetupMode) {
    const rows = [];
    spacesToRender.forEach((row, rIdx) => {
      const cols = [];
      row.forEach((col, cIdx) => {
        cols.push(
          <TouchableOpacity
            key={cIdx}
            onPress={() => {
              gameSetupMode
                ? this.setEmpty(cIdx, rIdx)
                : this.clickSpace(cIdx, rIdx);
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
  }

  render() {
    return (
      <View style={styles.GameLogicContainer}>
        <RulesModal
          rulesModalVisible={this.state.rulesModalVisible}
          hide={() => this.hideRulesModal()}
          fontsLoaded={this.props.fontsLoaded}
        />
        <ImageBackground
          source={require("../assets/tri.png")}
          style={{
            aspectRatio: 1,
            resizeMode: "contain",
          }}
        >
          <View style={styles.Board}>
            {this.state.spaces && this.renderSpaces(this.state.spaces, false)}
          </View>
          <View style={styles.PegsRemainingContainer}>
            {!this.props.fontsLoaded ? (
              <Text style={styles.PegsRemaining}>
                Pegs Remaining: {this.pegsRemaining}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.PegsRemaining,
                  fontFamily: "Quicksand_600SemiBold",
                }}
              >
                Pegs Remaining: {this.pegsRemaining}
              </Text>
            )}
          </View>
        </ImageBackground>
        <GameWonModal
          rulesModalVisible={this.state.gameWonModalVisible}
          hide={() => {
            this.setState({ gameWonModalVisible: false });
            this.reset();
          }}
          fontsLoaded={this.props.fontsLoaded}
        />
        <EmptySpaceSelectionModal
          rulesModalVisible={this.state.setEmptySpaceModalVisible}
          hide={() => {
            this.setState({ setEmptySpaceModalVisible: false });
          }}
          fontsLoaded={this.props.fontsLoaded}
          renderSpaces={() => this.renderSpaces(getAllEmptySpaces(), true)}
        />
        <ImageBackground
          source={require("../assets/trianglesGray.png")}
          style={styles.ImageBg}
        >
          <View style={styles.FooterLine}>
            <TouchableOpacity
              onPress={() => {
                this.showRulesModal();
              }}
            >
              <View style={styles.ButtonContentContainer}>
                {!this.props.fontsLoaded ? (
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
                this.showSetEmptyModal();
              }}
            >
              <View style={styles.ButtonContentContainer}>
                {!this.props.fontsLoaded ? (
                  <Text style={styles.ButtonContent}>Set Empty</Text>
                ) : (
                  <Text
                    style={{
                      ...styles.ButtonContent,
                      fontFamily: "Quicksand_600SemiBold",
                    }}
                  >
                    Set Empty
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.handleReset();
              }}
            >
              <View style={styles.ButtonContentContainer}>
                {!this.props.fontsLoaded ? (
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
