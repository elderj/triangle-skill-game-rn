import React, { useState } from "react";
import { ImageBackground, Modal, StyleSheet, Text, View } from 'react-native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { 
  Quicksand_400Regular,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import GameBoard from './components/GameBoard';
import SplashModalContent from './components/SplashModalContent';

 
export default function App() {

  const [modalVisible, setModalVisible] = useState(true);
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Pacifico_400Regular,
  });

  console.log("---------> " + fontsLoaded);

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible}>
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

const styles = StyleSheet.create({

  SplashModal:{
    flex: 1,
    backgroundColor: "green",
    alignContent: "center",
    justifyContent: "center",
  },
  SplashModalTitle: {
    textAlign: 'center'
  },

  title: {
    marginTop: 40,
    color: 'white',
    alignItems: 'center',
    fontSize: 35,
  },
});
