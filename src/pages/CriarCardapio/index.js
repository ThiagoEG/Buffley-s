import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Modal, Alert } from 'react-native';
import Dropdown from '../Componentes/DropDown';
import DropCard from '../Componentes/DropCard'; // Importe o DropCard
import Navbar from '../Componentes/Navbar';
import Acompanhamentos from '../ReceitasBanco/Acompanhamentos';
import Bebidas from '../ReceitasBanco/Bebidas';
import Entradas from '../ReceitasBanco/Entradas';
import Guarnicoes from '../ReceitasBanco/Guarnicoes';
import PratosPrincipais from '../ReceitasBanco/PratosPrincipais';
import Saladas from '../ReceitasBanco/Saladas';
import Sobremesas from '../ReceitasBanco/Sobremesas';
import LinearButton from '../Componentes/LinearButton';



export default function Cardapio() {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipes([...selectedRecipes, recipe]);
  };
  function SelecionarReceita(selectedRecipe) {
    // Esta função lida com a receita selecionada
    console.log("Receita selecionada:", selectedRecipe);
    // Outras ações que você deseja executar, como adicionar a receita a uma lista, etc.
  }
  

  return (
    <View style={styles.container}>
      <Navbar />
      <StatusBar hidden={true}/>
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.contentContainer}>

      <View style={styles.inputName}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginHorizontal: 16 }}>Nome</Text>
          <TextInput placeholder="Digite o nome do Cardápio" style={styles.Input} />
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputData}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Convidados</Text>
            <Dropdown />
          </View>
          <View style={styles.inputDrop}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Data</Text>
            <Dropdown />
          </View>
        </View>
        {/* Use o DropCard em seu componente Cardapio, passando as receitas e a função handleSelectRecipe */}
        <DropCard title="Entradas" onSelectRecipe={SelecionarReceita} recipes={Entradas}/>
        <DropCard title="Pratos principais" onSelectRecipe={SelecionarReceita} recipes={PratosPrincipais}/>
        <DropCard title="Acompanhamentos" onSelectRecipe={SelecionarReceita} recipes={Acompanhamentos} />
        <DropCard title="Guarnições" onSelectRecipe={SelecionarReceita} recipes={Guarnicoes}/>
        <DropCard title="Saladas" onSelectRecipe={SelecionarReceita} recipes={Saladas}/>
        <DropCard title="Sobremesas" onSelectRecipe={SelecionarReceita} recipes={Sobremesas}/>
        <DropCard title="Bebidas" onSelectRecipe={SelecionarReceita} recipes={Bebidas}/>

      </View>
        

      </ScrollView>
      <LinearButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  contentContainer:
  {
    alignItems: 'center',
    width: '100%'
  },
  Input: {
    width: 350,
    height: 50,
    elevation: 8,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 5,
    marginHorizontal: 16,
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  inputData: {
    flex: 1,
    marginRight: 26,
  },
  inputDrop: {
    flex: 1,
    marginLeft: 40,
  },
});
