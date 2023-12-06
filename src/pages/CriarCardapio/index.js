import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View, RefreshControl, Alert } from 'react-native';
import Dropdown from '../Componentes/DropDown';
import DatePickerComponent from '../Componentes/DataPicker'; // Certifique-se de que o componente de DatePicker esteja importado corretamente
import DropCard from '../Componentes/DropCard';
import Navbar from '../Componentes/Navbar';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, set, push, get, remove } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig'; // Importe a instância do banco de dados do seu arquivo de configuração Firebase
import { globalData, setCurrentCardapioId } from '../../services/Globals/globalId';
import { useUser } from '../../services/UserContext/index';
import { MaterialIcons } from '@expo/vector-icons';


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
  const { preferenciasData, preferenciasId } = route.params || {}
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [selectedRecipesByCategory, setSelectedRecipesByCategory] = useState({});
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

  const onRefresh = async () => {
    setRefreshingState(true);

    try {
      // Adicione aqui a lógica para recarregar as receitas
      const receitasRef = ref(db, 'receitas');
      const receitasSnapshot = await get(receitasRef);

      if (receitasSnapshot.exists()) {
        const receitasData = receitasSnapshot.val();
        const receitasArray = Object.keys(receitasData).map((receitaId) => ({
          id: receitaId,
          ...receitasData[receitaId],
        }));

        setRecipesByCategory(receitasArray.reduce((acc, receita) => {
          const categoria = receita.categoria;
          acc[categoria] = acc[categoria] || [];
          acc[categoria].push(receita);
          return acc;
        }, {}));
      } else {
        console.error('No receitas found in the database.');
        // Lide com o caso em que não há receitas no banco de dados
      }
    } catch (error) {
      console.error('Error refreshing receitas:', error);
    }

    setRefreshingState(false);
  };

  useEffect(() => {
    const intervalId = setInterval(onRefresh, 30000);
    onRefresh();
    // Limpe o intervalo quando o componente for desmontado para evitar vazamentos de memória
    return () => clearInterval(intervalId);
  }, []);


  const userID = state.uid;

  const handleSubmit = async () => {

    let errorMessage = '';

    if (!nomeCardapio) {
      errorMessage += 'Nome do Cardápio é obrigatório.\n';
    }
    if (!numeroConvidados) {
      errorMessage += 'Número de Convidados é obrigatório.\n';
    }
    if (!dataSelecionada) {
      errorMessage += 'Selecione uma data.\n';
    } else {
      const dataAtual = new Date();
      const dataSelecionadaObj = new Date(dataSelecionada);

      // Verifique se a data selecionada é a mesma que o dia atual
      if (
        dataSelecionadaObj.getDate() === dataAtual.getDate() &&
        dataSelecionadaObj.getMonth() === dataAtual.getMonth() &&
        dataSelecionadaObj.getFullYear() === dataAtual.getFullYear()
      ) {
        errorMessage += 'A data selecionada não pode ser o mesmo dia atual.\n';
      }
    }

    if (totalCost <= 0 || selectedRecipes.length === 0) {
      errorMessage += 'Selecione pelo menos uma receita.\n';
    }

    if (errorMessage !== '') {
      setErrorMessage(errorMessage.trim());
      Alert.alert('Preencha todos os campos obrigatórios', errorMessage);
      return;
    }

    const cardapiosRef = ref(db, 'cardapios');
    const cardapiosSnapshot = await get(cardapiosRef);
    const cardapiosData = cardapiosSnapshot.val();

    const existingCardapioWithSameName = Object.values(cardapiosData || {}).find(
      (cardapio) =>
        cardapio.userID === userID &&
        cardapio.nomeCardapio.toLowerCase() === nomeCardapio.toLowerCase()
    );
    
    const existingCardapioWithSameDate = Object.values(cardapiosData || {}).find(
      (cardapio) =>
        cardapio.userID === userID &&
        cardapio.data.toLowerCase() === dataSelecionada.toLowerCase()
    );
    
    if (existingCardapioWithSameName && existingCardapioWithSameDate) {
      // Caso exista um cardápio com mesmo nome e mesma data
      Alert.alert('Cardápio já existente', 'Já existe um cardápio com o mesmo nome e data.');
    } else if (existingCardapioWithSameName) {
      // Caso exista um cardápio com mesmo nome, mas data diferente
      Alert.alert('Nome de Cardápio já utilizado', 'Escolha um nome diferente para o cardápio.');
    } else if (existingCardapioWithSameDate) {
      // Caso exista um cardápio com mesma data, mas nome diferente
      Alert.alert('Data de Cardápio já utilizada', 'Escolha uma data diferente para o cardápio.');
    } else {
    

    // Move the calculation of maisBarato and maisCaro inside the handleSubmit function
    const maisBarato = calcularCategoriaMaisBarata(selectedRecipes);
    const maisCaro = calcularCategoriaMaisCara(selectedRecipes);

    const novoCardapioData = {
      nomeCardapio,
      quantidadeItens: selectedRecipes.length,
      totalCost,
      numeroConvidados,
      categoriaMaisBarata: maisBarato.categoria,
      categoriaMaisCara: maisCaro.categoria,
      userID: userID,
      data: dataSelecionada,
      receitas: selectedRecipes,  // Inclua a lista de receitas com detalhes
    };

    if (preferenciasData && preferenciasData.userId) {
      novoCardapioData.userCardapioId = preferenciasData.userId;
    }

    if (preferenciasId) {
      novoCardapioData.preferenciasCardId = preferenciasId;
      const preferencesRef = ref(db, `preferencias/${preferenciasId}`);
      await remove(preferencesRef);
      console.log('Preferência excluída com sucesso!');
    }



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
  }
  };



  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);


  const handleSelectRecipe = (recipe) => {
    // Verifica se o número de convidados foi escolhido
    if (numeroConvidados === 0) {
      Alert.alert('Selecione o número de convidados antes de escolher uma receita.');
      return;

    }

    const isRecipeSelected = selectedRecipeIds.includes(recipe.id);

    if (isRecipeSelected) {
      // Deselecione a receita
      setSelectedRecipeIds((prevIds) => prevIds.filter((id) => id !== recipe.id));

      // Atualize o custo total subtraindo o custo da receita desselecionada
      const custoReceita = calcularCustoTotal(recipe);
      setTotalCost((prevTotalCost) => prevTotalCost - custoReceita * numeroConvidados);

      // Remova a receita do DropCard
      const updatedSelectedRecipes = selectedRecipes.filter((selectedRecipe) => selectedRecipe.id !== recipe.id);
      setSelectedRecipes(updatedSelectedRecipes);
    } else {
      // Se o número de convidados estiver definido, selecione a receita
      const fullRecipe = {
        id: recipe.id,
        nome: recipe.nome,
        ingredientes: recipe.ingredientes,
        categoria: recipe.categoria,
        // ... Adicione outros campos da receita, se necessário
      };

      // Atualize o custo total adicionando o custo da receita selecionada
      const custoReceita = calcularCustoTotal(recipe);
      setTotalCost((prevTotalCost) => prevTotalCost + custoReceita * numeroConvidados - custoReceita);

      // Se o número de convidados estiver definido, adicione a receita ao DropCard
      setSelectedRecipeIds([...selectedRecipeIds, recipe.id]);
      setSelectedRecipes([...selectedRecipes, fullRecipe]);

      const categoria = recipe.categoria;
      setSelectedRecipesByCategory((prevSelectedRecipesByCategory) => ({
        ...prevSelectedRecipesByCategory,
        [categoria]: [...(prevSelectedRecipesByCategory[categoria] || []), fullRecipe],
      }));
    }
  };




  useEffect(() => {
    const maisBarato = calcularCategoriaMaisBarata(selectedRecipes);
    const maisCaro = calcularCategoriaMaisCara(selectedRecipes);
    setCustoMaisBarato(maisBarato.custo);
    setCustoMaisCaro(maisCaro.custo);
  }, [totalCost, nomeCardapio, selectedRecipes]);



  const fetchRecipesByCategory = async (categoria) => {
    try {
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

      console.log(`Recipes for ${categoria}:`, recipes);
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
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

  const handleRemoveRecipeFromSelected = (recipe) => {
    // Remova a receita de selectedRecipes
    const updatedSelectedRecipes = selectedRecipes.filter((selectedRecipe) => selectedRecipe.id !== recipe.id);
    setSelectedRecipes(updatedSelectedRecipes);

    const custoReceita = calcularCustoTotal(recipe);
    setTotalCost((prevTotalCost) => prevTotalCost - custoReceita * numeroConvidados);
  };

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
            <Text style={{ fontSize: 26, fontWeight: '400', color: '#318051' }}>
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
                <Picker.Item label="50" value={50} />
                <Picker.Item label="100" value={100} />
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
              key={categoria}
              title={categoria}
              recipes={recipesByCategory[categoria] || []}
              selectedRecipes={selectedRecipesByCategory[categoria] || []}
              onSelectRecipe={handleSelectRecipe}
              setSelectedRecipes={setSelectedRecipes}
              cardInfoTitle={categoria}
              setTotalCost={setTotalCost}
              numeroConvidados={numeroConvidados}
              onRemoveRecipe={handleRemoveRecipeFromSelected}  // Passe a função onRemoveRecipe
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
    marginTop: 12,
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
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
