import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import { useRoute } from '@react-navigation/native';
import { useUser } from '../../services/UserContext/index';
import Navbar from '../Componentes/Navbar';
import { ScrollView } from 'react-native-gesture-handler';
import LinearButton from '../Componentes/LinearButton';


const DetalhesCardapioDB = () => {
    const [cardapioData, setCardapioData] = useState(null);
    const route = useRoute();
    const cardapioId = route.params?.cardapioId;
    const { state } = useUser();
    const userID = state.uid;
    const [mostrarReceitas, setMostrarReceitas] = useState(true);
    const [ingredientes, setIngredientes] = useState([]);



    const consolidateRecipes = (recipes) => {
        const consolidatedRecipes = {};

        recipes.forEach((recipe) => {
            const { nome, ingredientes } = recipe;

            if (!consolidatedRecipes[nome]) {
                consolidatedRecipes[nome] = {
                    nome,
                    ingredientes: [],
                };
            }

            ingredientes.forEach((ingrediente) => {
                const existingIngredient = consolidatedRecipes[nome].ingredientes.find(
                    (existingIngrediente) =>
                        existingIngrediente.nome === ingrediente.nome
                );

                if (existingIngredient) {
                    // Ingrediente já existe, somar quantidades e valores
                    existingIngredient.quantidade.valor +=
                        ingrediente.quantidade.valor;
                    existingIngredient.valor += ingrediente.valor;
                } else {
                    // Ingrediente não existe, adicionar à lista
                    consolidatedRecipes[nome].ingredientes.push({ ...ingrediente });
                }
            });
        });

        return Object.values(consolidatedRecipes);
    };


    const loadCardapioById = async (cardapioId) => {
        try {
            const cardapioRef = ref(db, `cardapios/${cardapioId}`);
            const cardapioSnapshot = await get(cardapioRef);

            if (cardapioSnapshot.exists()) {
                const cardapioData = cardapioSnapshot.val();

                // Multiply the quantity and value by the number of guests for each ingredient in each recipe
                const updatedReceitas = cardapioData.receitas.map((recipe) => {
                    return {
                        ...recipe,
                        ingredientes: recipe.ingredientes.map((ingrediente) => {
                            return {
                                ...ingrediente,
                                quantidade: {
                                    ...ingrediente.quantidade,
                                    valor: ingrediente.quantidade.valor * cardapioData.numeroConvidados,
                                },
                                valor: ingrediente.valor * cardapioData.numeroConvidados,
                            };
                        }),
                    };
                });

                // Update the cardapioData with the modified recipes
                setCardapioData({
                    ...cardapioData,
                    receitas: updatedReceitas,
                });
            } else {
                console.error('No cardápio found with the specified cardapioId.');
                setCardapioData(null);
            }
        } catch (error) {
            console.error('Error loading cardapio by cardapioId:', error);
        }
    };


    useEffect(() => {
        const cardapioId = route.params?.cardapioId;

        if (cardapioId) {
            // Ensure to replace the second parameter with the actual userID
            loadCardapioById(cardapioId, userID);
        } else {
            console.error('cardapioId não fornecido na rota.');
        }
    }, [route.params?.cardapioId, userID]);




    const mergeIngredients = (recipes, shouldMerge) => {
        if (!recipes) {
            return [];
        }

        if (shouldMerge) {
            const merged = {};

            recipes.forEach((recipe) => {
                recipe.ingredientes.forEach((ingrediente) => {
                    const nome = ingrediente.nome;

                    if (!merged[nome]) {
                        // Se não existe, adiciona o ingrediente à lista
                        merged[nome] = { ...ingrediente, quantidade: { ...ingrediente.quantidade } };
                    } else {
                        // Se já existe, soma a quantidade e valor ao ingrediente existente
                        merged[nome].quantidade.valor += ingrediente.quantidade.valor;
                        merged[nome].valor += ingrediente.valor;
                    }
                });
            });

            // Convertendo o objeto novamente para uma lista
            const mergedList = Object.values(merged);
            return mergedList;
        } else {
            // Se shouldMerge for false, retorne a lista não mesclada
            const unmergedList = recipes.flatMap((recipe) =>
                recipe.ingredientes.map((ingrediente) => ({
                    ...ingrediente,
                    quantidade: { ...ingrediente.quantidade },
                }))
            );
            return unmergedList;
        }
    };



    const [mergedIngredients, setMergedIngredients] = useState([]);

    useEffect(() => {
        if (cardapioData && cardapioData.receitas) {
            const mergedIngredients = mergeIngredients(cardapioData.receitas, true);
            setMergedIngredients(mergedIngredients);
        }
    }, [cardapioData]);

    const renderIngredients = (item) => (
        <Text style={styles.ingredienteItems}>
            {item.nome
                ? item.nome + " - "
                : ""}
            {(item.quantidade ? item.quantidade.valor : "") +
                " " +
                (item.quantidade ? item.quantidade.unidade : "") +
                " - R$ " +
                (item.valor ? item.valor.toFixed(2) : "")}
        </Text>
    );

    const toggleMostrarReceitas = () => {
        setMostrarReceitas(true);
    };

    const toggleMostrarIngredientes = () => {
        setMostrarReceitas(false);
    };
    // ...

    return (
        <View style={styles.container}>
            <Navbar />
            {cardapioData ? (
                <>
                    <View style={{ padding: 16, marginTop: -40 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.nome}>Valor Total:</Text>
                            <Text style={styles.cardapioValor}>{cardapioData.totalCost.toFixed(2)}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.nome}>Nome do Cardapio:</Text>
                            <Text style={styles.cardapioNome}>{cardapioData.nomeCardapio}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.nome}>Data:</Text>
                            <Text style={styles.cardapioNome}>{cardapioData.data}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.nome}>Numero de convidados:</Text>
                            <Text style={styles.cardapioNome}>{cardapioData.numeroConvidados}</Text>
                        </View>
                        <View style={{ width: '100%', borderWidth: 2, borderColor: 'rgba(0, 0, 0, 0.5)', marginTop: 12, marginBottom: 12, borderRadius: 2, }} />
                        <View style={styles.contBtn}>
                            <LinearButton title="Mostrar Receitas" onPress={toggleMostrarReceitas} />
                            <LinearButton title="Mostrar Ingredientes" onPress={toggleMostrarIngredientes} />
                        </View>
                        {mostrarReceitas ? (
                            <ScrollView>

                                <FlatList
                                    data={cardapioData.receitas}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View>

                                            <Text style={styles.nome}>Receita:</Text>
                                            <View>
                                                <Text style={styles.receitaNome}>{item.nome}</Text>
                                                <View style={{ marginLeft: 20 }}>
                                                    <Text style={styles.ingredientesTitulo}>Ingredientes:</Text>
                                                    {item.ingredientes.map((ingrediente, index) => (
                                                        <Text key={index} style={styles.ingredienteItem}>
                                                            {ingrediente.nome +
                                                                " - " +
                                                                (ingrediente.quantidade ? ingrediente.quantidade.valor : "") +
                                                                " " +
                                                                (ingrediente.quantidade ? ingrediente.quantidade.unidade : "") +
                                                                " - R$ " +
                                                                ingrediente.valor.toFixed(2)}
                                                        </Text>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                            </ScrollView>
                        ) : (
                            <ScrollView>
                                <View style={styles.ingredienteContainer}>
                                    <Text style={styles.nome}>Ingredientes:</Text>
                                    <FlatList
                                        style={styles.flatcont}
                                        data={mergedIngredients}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <View style={styles.ingredienteContainer}>
                                                <Text style={styles.ingredienteItem}>
                                                    {`${item.nome} - ${item.quantidade.valor} ${item.quantidade.unidade} - R$ ${item.valor.toFixed(2)}`}
                                                </Text>
                                            </View>
                                        )}
                                    />
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </>
            ) : (
                <Text>Carregando dados...</Text>
            )}

            <View style={{ padding: 10 }}>
                <LinearButton title="Ok" />
            </View>
        </View>

    );
};

export default DetalhesCardapioDB;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nome: {
        fontSize: 22,
        marginTop: 12,
        fontWeight: 'bold',
    },
    cardapioNome: {
        fontSize: 24,
        fontWeight: '400',
        marginLeft: 16,
        marginTop: 12,
    },

    cardapioValor: {
        fontSize: 24,
        fontWeight: '400',
        marginLeft: 16,
        marginTop: 10,
        color: 'green',
    },

    receitaNome: {
        fontSize: 22,
        marginVertical: 5,
        marginLeft: 22,
    },

    ingredientesTitulo: {
        fontSize: 18,
        fontWeight: '200',
        marginBottom: 6,
        marginLeft: 16,
        color: '#ff5e006c'
    },

    ingredienteContainer: {
        marginTop: 12,
    },
    ingredienteItem: {
        fontSize: 18,
        marginBottom: 5,
        color: '#000',
        marginLeft: 18,
    },

    ingredienteItems: {
        fontSize: 18,
        marginBottom: 5,
        color: '#000',
        marginLeft: 34,
    },

    contBtn: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
    },
});