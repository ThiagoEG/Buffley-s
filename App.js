import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import { UserProvider } from './src/services/UserContext/index';
import BottomNavigator from './src/routes/BottomNavigator';

export default function App() {
  return (
    <UserProvider>
      <Routes/>
      </UserProvider>
  );
}

/*

    <NavigationContainer independent={true}>
      <StatusBar backgroundColor="#38A69D" barStyle="light-content"/>
      <Routes/>
      </NavigationContainer>




import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}> 
    <View style={styles.containerLogo}>
        <Image
        source={require('../../assets/logo.png')}
        style={{width: '100%', height:'70%'}}
        resizeMode="contain"
        />
    </View>

    <View style={styles.containerForm}>
        <Text style={styles.title}>Faça login</Text>

    </View>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#BB2649'
    },
    containerLogo:{
        flex:2,
        backgroundColor: '#BB2649'

    },
    containerForm:{
        flex:2,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd:'5%'
    },
    title:{
        fontSize: 24,
        fontWeight:'bold',
        marginTop:28,
        marginBottom:12,
    },
    button:{
        position:'absolute',
        backgroundColor:'#BB2649',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        allignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize: 18,
        color:'#FFF',
        fontWeight:'bold',
        alignSelf:'center'
    }
})*/

/*    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: '100%', height: '70%' }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Faça login</Text>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TouchableOpacity style={styles.button} onPress={cadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={loginGoogle}>
          <Text style={styles.buttonText}>Login com Google</Text>
        </TouchableOpacity>
      </View>
    </View>*/ 
