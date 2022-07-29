import React, { useState } from "react";
import {
  Dimensions,
  Linking,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Checkbox from "expo-checkbox";

const height = Dimensions.get("window").height;

export default function SplashModalContent(props) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/triangles.png")}
      style={{ width: "100%", height: "100%", alignItems: "center" }}
    >
      <View style={styles.SplashModalContent}>
        {!props.fontsLoaded ? (
          <Text style={styles.SplashTitle}>Triangle Skill Game</Text>
        ) : (
          <Text
            style={{ ...styles.SplashTitle, fontFamily: "Quicksand_700Bold" }}
          >
            Triangle Skill Game
          </Text>
        )}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 35, height: 35 }}
            resizeMode="stretch"
            source={require("../assets/diamondLogo.png")}
          />
          {!props.fontsLoaded ? (
            <Text style={styles.logoFont}>Elder Design Concepts</Text>
          ) : (
            <Text
              style={{ ...styles.logoFont, fontFamily: "Pacifico_400Regular" }}
            >
              Elder Design Concepts
            </Text>
          )}
        </View>

        <View style={styles.checkboxView}>
          <Checkbox
            style={styles.checkbox}
            value={termsAccepted}
            onValueChange={setTermsAccepted}
          />
          <Text style={styles.checkboxText}>I read and accept the </Text>

          <Text
            style={styles.informationalLinkText}
            onPress={() =>
              Linking.openURL(
                "https://elderdesignconcepts.com/#/portfolio/triangle-skill-game/terms"
              )
            }
          >
            Terms of Service
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => props.setModalVisible(false)}
          disabled={!termsAccepted}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SplashTitle: {
    marginTop: 100,
    color: "white",
    fontSize: 0.05 * height,
    textAlign: "center",
  },

  logoFont: {
    color: "white",
    textAlign: "center",
    fontSize: 0.03 * height,
  },

  StartButton: {
    marginBottom: 30,
  },
  ButtonContentContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 50,
    marginHorizontal: 100,
    marginBottom: 48,
  },
  ButtonContent: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
    fontSize: 18,
  },

  checkboxView: {
    flexDirection: "row",
    justifyContent: "center",
  },

  checkbox: {
    backgroundColor: "gray",
  },

  checkboxText: {
    color: "white",
    fontSize: 18,
    fontSize: 0.021 * height,
    textAlignVertical: "center",
    marginRight: 5,
    paddingLeft: 8,
  },

  informationalLinkText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 0.021 * height,
    textAlignVertical: "center",
  },
});
