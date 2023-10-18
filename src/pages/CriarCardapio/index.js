/*
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Dropdown from "../Componentes/DropDown";
import DropCard from "../Componentes/DropCard";

export default function Cardapio() {
  return (
    <View style={styles.container}>

      <View style={styles.inputName}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Convidados</Text>
        <TextInput
          placeholder="Digite o nome do Cardápio"
          style={styles.Input}
        />
      </View>

      <View style={styles.inputs}>
      <View style={styles.inputData}>
  <Text style={{ fontSize: 24, fontWeight: "bold" }}>Convidados</Text>
  <Dropdown />
</View>


        <View style={styles.inputDrop}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Convidados</Text>
          <Dropdown />
        </View>
      </View>

      <DropCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16, // Adiciona margem horizontal de 16
  },

  Input: {
    width: 350,
    height: 50,
    elevation: 8,
    backgroundColor: "white",
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 5,
  },

  inputs: {
    justifyContent: "space-between", // Distribui os elementos igualmente na linha
    width: 350,
    marginTop: 10,
  },

  inputData: {
    marginRight: 8, // Adiciona margem entre os elementos
  },

  inputDrop: {
    marginLeft: 40,
  },
});
*/

import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import Dropdown2 from "../componentes2/DropDown2";
import DropCard from "../Componentes/DropCard";
import Navbar from "../Componentes/Navbar";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function Cardapio() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('HomeScreen');
  };

  return (

<View style={styles.container}>
<Navbar></Navbar>

<ScrollView
  style={styles.containerGeneral}
  contentContainerStyle={{
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  }}
>
        

      <View style={styles.inputName}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Nome</Text>
        <TextInput
          placeholder="Digite o nome do Cardápio"
          style={styles.Input}
        />
      </View>

      <View style={styles.inputs}>
        <View style={styles.inputData}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Convidados</Text>
          <Dropdown2 />
        </View>

        <View style={styles.inputDrop}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Data</Text>
          <Dropdown2 />
        </View>
      </View>

      <DropCard/>


    </ScrollView>
    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require("../../../assets/Frame4.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
</View>



    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  containerGeneral:
  {
    flex: 1,
    paddingHorizontal: 16,

  },

  Input: {
    width: 350,
    height: 50,
    elevation: 8,
    backgroundColor: "white",
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 5,
  },

  inputs: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribui os elementos igualmente na linha
    width: 350,
    marginTop: 10,
  },

  inputData: {
    flex: 1,
    marginRight: 8, // Adiciona margem entre os elementos
  },

  inputDrop: {
    flex: 1,
    marginLeft: 40,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  buttonContainer: {
    bottom: 0,
    margin: 16,
  },
});
