import React, { useEffect, useState } from "react";
import { ImageBackground, Modal, StyleSheet, Text, View } from "react-native";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import {
  Quicksand_400Regular,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import GameBoard from "./components/GameBoard";
import SplashModalContent from "./components/SplashModalContent";
import "expo-dev-client";

import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";

const startupInterstitialAdId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-9896015466295501/7286673475";

export default function App() {
  const [hso, setHso] = useState(false);

  const { isLoaded, load, show } = useInterstitialAd(startupInterstitialAdId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setHso(true);
    }, 5000);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  //Load the Ad
  useEffect(() => {
    if (!hso) {
      load();
    }
  }, [load]);

  useEffect(() => {
    if (isLoaded && hso === false) {
      show();
      setHso(true);
    }
  }, [isLoaded]);

  const [rulesModalVisible, setModalVisible] = useState(true);
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Pacifico_400Regular,
  });

  if (!hso) {
    return (
      <View>
        <ImageBackground
          source={require("./assets/splash2.png")}
          style={{ width: "100%", height: "100%", alignItems: "center" }}
        ></ImageBackground>
      </View>
    );
  } else {
    return (
      <View>
        <Modal animationType="slide" visible={rulesModalVisible}>
          <SplashModalContent
            fontsLoaded={fontsLoaded}
            setModalVisible={setModalVisible}
          />
        </Modal>
        <ImageBackground
          source={require("./assets/triangles.png")}
          style={{ width: "100%", height: "100%", alignItems: "center" }}
        >
          {!fontsLoaded ? (
            <Text style={styles.title}>Triangle Skill Game</Text>
          ) : (
            <Text style={{ ...styles.title, fontFamily: "Quicksand_700Bold" }}>
              Triangle Skill Game
            </Text>
          )}
          <GameBoard fontsLoaded={fontsLoaded} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SplashModal: {
    flex: 1,
    backgroundColor: "green",
    alignContent: "center",
    justifyContent: "center",
  },
  SplashModalTitle: {
    textAlign: "center",
  },

  title: {
    marginTop: 40,
    color: "white",
    alignItems: "center",
    fontSize: 35,
  },
});
