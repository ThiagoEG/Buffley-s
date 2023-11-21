import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View, RefreshControl } from 'react-native';
import Dropdown from '../Componentes/DropDown';
import DatePickerComponent from '../Componentes/DataPicker'; // Certifique-se de que o componente de DatePicker esteja importado corretamente
import DropCard from '../Componentes/DropCard';
import Navbar from '../Componentes/Navbar';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, set, push, get } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig'; // Importe a instância do banco de dados do seu arquivo de configuração Firebase
import { globalData, setCurrentCardapioId } from '../../services/Globals/globalId';
import { useUser } from '../../services/UserContext/index';


const calcularCustoTotal = (receita) => {
  let custoTotal = 0;

  if (receita && receita.ingredientes && Array.isArray(receita.ingredientes)) {
    receita.ingredientes.forEach((ingrediente) => {
      custoTotal += ingrediente.valor;
    });
  }

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
  const { state } = useUser();
  const [uidDoBuffetConectado, setUidDoBuffetConectado] = useState(null);
  const cardapio = route.params?.cardapio;
  const { setRefreshing } = route.params || {};
  const [refreshing, setRefreshingState] = React.useState(false);
  const [recipesByCategory, setRecipesByCategory] = useState({});
  const [data, setData] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const categoriasDesejadas = [
    "Entradas",
    "Acompanhamentos",
    'Prato Principal',
    'Sobremesas',
    'Bebidas',
    'Saladas',
  ];  
  const [novoCardapio, setNovoCardapio] = useState({
    nomeCardapio: '',
    quantidadeItens: 0,
    totalCost: 0,
    numeroConvidados: 0,
    categoriaMaisBarata: '',
    categoriaMaisCara: '',
  });
  
  const onRefresh = () => {
    setRefreshingState(true);

   fetchRecipesByCategory();

    setRefreshingState(false);
  };
  
  useEffect(() => {
    // Automaticamente chama onRefresh quando a tela é inicializada
    onRefresh();
  }, []);

  const userID = state.uid;

  
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
      userID: userID, 
      data: dataSelecionada,
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
  
  
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);

  const handleSelectRecipe = (recipe) => {
    // Verificar se o ID da receita já está na lista de receitas selecionadas
    const isRecipeSelected = selectedRecipeIds.includes(recipe.id);
  
    if (!isRecipeSelected) {
      // Adicionar o ID da receita ao conjunto de IDs selecionados
      setSelectedRecipeIds([...selectedRecipeIds, recipe.id]);

      // Adicionar a receita à lista de receitas selecionadas
      setSelectedRecipes([...selectedRecipes, recipe]);
  
      // Calcular o custo e adicioná-lo ao totalCost
      const custoReceita = calcularCustoTotal(recipe);
      //setTotalCost((prevTotalCost) => prevTotalCost + custoReceita);
    }
  };
  

  
  
  

  useEffect(() => {
    const maisBarato = calcularCategoriaMaisBarata(selectedRecipes);
    const maisCaro = calcularCategoriaMaisCara(selectedRecipes);
    setCustoMaisBarato(maisBarato.custo);
    setCustoMaisCaro(maisCaro.custo);
  }, [totalCost, nomeCardapio, selectedRecipes]);


  const fetchRecipesByCategory = async (categoria) => {
    const recipesRef = ref(db, 'receitas');
    const snapshot = await get(recipesRef);
    const recipes = [];
  
    if (snapshot.exists()) {
      const recipesData = snapshot.val();
      for (const id in recipesData) {
        const recipe = recipesData[id];
        if (recipe.categoria === categoria) {
          recipes.push({ id, ...recipe });
        }
      }
    }
  
    return recipes;
  };
  

  useEffect(() => {
    const fetchDataForCategories = async () => {
      const categoriesData = {};

      for (const categoria of categoriasDesejadas) {
        const recipes = await fetchRecipesByCategory(categoria);
        categoriesData[categoria] = recipes;
      }

      setRecipesByCategory(categoriesData);
    };

    fetchDataForCategories();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
              <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Data</Text>
              <DatePickerComponent
                onSelectDate={(data) => setDataSelecionada(data)} // Corrija esta linha
                style={styles.DatePicker}
              />
            </View>
          </View>

          {categoriasDesejadas.map((categoria) => (
              <DropCard
              title={categoria}
              recipes={recipesByCategory[categoria] || []}
              selectedRecipes={selectedRecipes}
              onSelectRecipe={handleSelectRecipe}
              setSelectedRecipes={setSelectedRecipes}
              cardInfoTitle={categoria}
              setTotalCost={setTotalCost}
            />
            
          ))}

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
    width: '100%',
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  inputData: {
    flex: 1,
  },
  inputDrop: {
    flex: 1,
    alignItems: 'flex-start',
    textAlign: 'left',
    marginRight: 8,
  },
  totalCostContainer: {
    marginBottom: 16,
    marginLeft: 16,
  },
  containerCardapio: {
    alignSelf: 'center',
    marginHorizontal: 10,
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
