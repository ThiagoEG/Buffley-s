import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Dropdown from '../Componentes/DropDown';
import DatePickerComponent from '../Componentes/DataPicker'; // Certifique-se de que o componente de DatePicker esteja importado corretamente
import DropCard from '../Componentes/DropCard';
import Navbar from '../Componentes/Navbar';
import Entradas from '../ReceitasBanco/Entradas';
import Acompanhamentos from '../ReceitasBanco/Acompanhamentos';
import Saladas from '../ReceitasBanco/Saladas';
import Bebidas from '../ReceitasBanco/Bebidas';
import Sobremesas from '../ReceitasBanco/Sobremesas';
import Guarnicoes from '../ReceitasBanco/Guarnicoes';
import PratosPrincipais from '../ReceitasBanco/PratosPrincipais';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, set, push } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig'; // Importe a instância do banco de dados do seu arquivo de configuração Firebase
import { globalData, setCurrentCardapioId } from '../../services/Globals/globalId';

const calcularCustoTotal = (receita) => {
  let custoTotal = 0;

  receita.ingredientes.forEach((ingrediente) => {
    custoTotal += ingrediente.valor;
  });

  return custoTotal;
};

const calcularCategoriaMaisBarata = (selectedRecipes) => {
  let categorias = {};

  selectedRecipes.forEach((recipe) => {
    const categoria = recipe.categoria;
    const custo = calcularCustoTotal(recipe);

    if (!categorias[categoria]) {
      categorias[categoria] = custo;
    } else {
      categorias[categoria] += custo;
    }
  });

  let categoriaMaisBarata = null;
  let custoMaisBarato = Number.MAX_VALUE;

  for (const categoria in categorias) {
    if (categorias[categoria] < custoMaisBarato) {
      custoMaisBarato = categorias[categoria];
      categoriaMaisBarata = categoria;
    }
  }

  return { categoria: categoriaMaisBarata, custo: custoMaisBarato };
};

const calcularCategoriaMaisCara = (selectedRecipes) => {
  let categorias = {};

  selectedRecipes.forEach((recipe) => {
    const categoria = recipe.categoria;
    const custo = calcularCustoTotal(recipe);

    if (!categorias[categoria]) {
      categorias[categoria] = custo;
    } else {
      categorias[categoria] += custo;
    }
  });

  let categoriaMaisCara = null;
  let custoMaisCaro = 0;

  for (const categoria in categorias) {
    if (categorias[categoria] > custoMaisCaro) {
      custoMaisCaro = categorias[categoria];
      categoriaMaisCara = categoria;
    }
  }

  return { categoria: categoriaMaisCara, custo: custoMaisCaro };
};

export default function Cardapio() {
  const navigation = useNavigation();
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [numeroConvidados, setNumeroConvidados] = useState(0);
  const [nomeCardapio, setNomeCardapio] = useState('');
  const [custoMaisBarato, setCustoMaisBarato] = useState(0);
  const [custoMaisCaro, setCustoMaisCaro] = useState(0);
  const route = useRoute();
  const [errorMessage, setErrorMessage] = useState('');
  const cardapio = route.params?.cardapio;
  const [novoCardapio, setNovoCardapio] = useState({
    nomeCardapio: '',
    quantidadeItens: 0,
    totalCost: 0,
    numeroConvidados: 0,
    categoriaMaisBarata: '',
    categoriaMaisCara: '',
  });
  


  const handleSubmit = async () => {
    if (!nomeCardapio || !numeroConvidados || totalCost <= 0) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }
  
    const novoCardapioData = {
      nomeCardapio,
      quantidadeItens: selectedRecipes.length,
      totalCost,
      numeroConvidados,
      categoriaMaisBarata: selectedRecipes.length > 0 ? calcularCategoriaMaisBarata(selectedRecipes).categoria : '',
      categoriaMaisCara: selectedRecipes.length > 0 ? calcularCategoriaMaisCara(selectedRecipes).categoria : '',
    };
  
    try {
      const cardapioRef = push(ref(db, 'cardapios'), novoCardapioData);
      const cardapioId = cardapioRef.key;
  
      // Aguarde o sucesso da operação push
      await cardapioRef;
  
      console.log('Cardápio adicionado com sucesso!');
      setErrorMessage('');
      setCurrentCardapioId(cardapioId);
      // Navegue para a tela "DetalhesCardapio" e passe o 'cardapioId' como parâmetro
      navigation.navigate('DetalhesCardapio', {
        novoCardapio: novoCardapioData,
        selectedRecipes,
        cardapioId,
      });
    } catch (error) {
      console.error('Erro ao adicionar o cardápio:', error);
      setErrorMessage('Erro ao adicionar o cardápio');
    }
  };
  
  

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipes([...selectedRecipes, recipe]);
    const custoReceita = calcularCustoTotal(recipe);
    setTotalCost(totalCost + custoReceita);
  };

  useEffect(() => {
    const maisBarato = calcularCategoriaMaisBarata(selectedRecipes);
    const maisCaro = calcularCategoriaMaisCara(selectedRecipes);
    setCustoMaisBarato(maisBarato.custo);
    setCustoMaisCaro(maisCaro.custo);
  }, [totalCost, nomeCardapio, selectedRecipes]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView>
        <Navbar />

        <View style={styles.containerCardapio}>
          <View style={styles.totalCostContainer}>
            <Text style={{ fontSize: 20, fontWeight: '400', color: '#318051' }}>
              Custo Total: R$ {totalCost.toFixed(2)}
            </Text>
          </View>
          <View style={styles.inputName}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginHorizontal: 16 }}>
              Nome
            </Text>
            <TextInput
              placeholder="Digite o nome do Cardápio"
              style={styles.Input}
              value={nomeCardapio}
              onChangeText={(text) => setNomeCardapio(text)}
            />
          </View>
          <View style={styles.inputs}>
            <View style={styles.inputData}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Convidados</Text>
              <Picker
                style={{
                  borderRadius: 5,
                  height: 40,
                  width: 150,
                  elevation: 5,
                  backgroundColor: 'white',
                }}
                selectedValue={numeroConvidados}
                onValueChange={(itemValue) => setNumeroConvidados(itemValue)}
              >
                <Picker.Item label="Selecione o número de convidados" value={0} />
                <Picker.Item label="50" value={200} />
                <Picker.Item label="100" value={200} />
                <Picker.Item label="150" value={150} />
                <Picker.Item label="200" value={200} />
              </Picker>
            </View>
            <View style={styles.inputDrop}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Data</Text>
              <DatePickerComponent />
            </View>
          </View>
          <DropCard
          title="Entradas"
          recipes={Entradas}
          selectedRecipes={selectedRecipes}
          onSelectRecipe={handleSelectRecipe}
          cardInfoTitle="Entradas"
        />
        <DropCard
          title="Pratos principais"
          recipes={PratosPrincipais}
          selectedRecipes={selectedRecipes}
          onSelectRecipe={handleSelectRecipe}
          cardInfoTitle="Entradas"
        />

        <DropCard
          title="Acompanhamentos"
          recipes={Acompanhamentos}
          selectedRecipes={selectedRecipes}
          onSelectRecipe={handleSelectRecipe}
          cardInfoTitle="Entradas"
        />
        <DropCard
          title="Guarnições"
          recipes={Guarnicoes}
          selectedRecipes={selectedRecipes}
          onSelectRecipe={handleSelectRecipe}
          cardInfoTitle="Entradas"
        />
        <DropCard
          title="Saladas"
          recipes={Saladas}
          selectedRecipes={selectedRecipes}
          onSelectRecipe={handleSelectRecipe}
          cardInfoTitle="Entradas"
        />
        <DropCard
          title="Sobremesas"
          recipes={Sobremesas}
          selectedRecipes={selectedRecipes}
          onSelectRecipe={handleSelectRecipe}
          cardInfoTitle="Entradas"
        />
        <DropCard
          title="Bebidas"
          recipes={Bebidas}
          selectedRecipes={selectedRecipes}
          onSelectRecipe={handleSelectRecipe}
          cardInfoTitle="Entradas"
        />
          {/* ... Outros DropCard ... */}
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
            <LinearGradient
              colors={['#be3455', '#ffffff']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 2 }}
            >
              <Text style={styles.buttonText}>Criar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
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
    width: 350,
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
  totalCostContainer: {
    marginBottom: 16,
    marginLeft: 16,
  },
  containerCardapio: {
    flex: 1,
    alignSelf: 'center',
  },
  button: {
    marginTop: 10,
    width: '95%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
