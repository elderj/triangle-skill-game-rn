import React, { useEffect, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = TestIds.INTERSTITIAL;

// For local testing:
const testID = "ca-app-pub-3940256099942544/1033173712";
const adUnitID = testID;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

export default function GameBoard() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.GameLogicContainer}>
      <Text>Its just text</Text>
      <Button
        title="Show Interstitial"
        onPress={() => {
          interstitial.show();
        }}
      />
      <Text>{TestIds.INTERSTITIAL}</Text>
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
});
