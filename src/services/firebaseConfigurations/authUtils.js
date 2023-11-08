import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const registerUser = async (email, senha, nome, telefone, userType, imagem, endereco, cnpj) => {
  if (!nome) {
    throw new Error('Nome do usuário não definido.');
  }

  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Dados do usuário a serem armazenados no Firebase Realtime Database
    const userData = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      userType: userType,
      imagem: imagem
    };

    if (userType === 'Buffet') {
      // Inclua as informações exclusivas do buffet (CNPJ e Endereço) no objeto de dados
      userData.cnpj = cnpj;
      userData.endereco = endereco;

      const db = getDatabase();

      // Crie uma referência ao local onde você deseja armazenar os dados do buffet no Realtime Database
      const buffetRef = ref(db, 'buffets/' + user.uid);

      // Armazene os dados do buffet no Firebase Realtime Database usando set
      await set(buffetRef, userData);
      // Crie uma referência à localização onde você deseja armazenar os dados do usuário no Realtime Database
const userRef = ref(getDatabase(), 'users/' + user.uid);

// Armazene os dados gerais do usuário no Firebase Realtime Database usando set
await set(userRef, userData);
    } else if (userType === 'Cliente') {
      const db = getDatabase();

      // Crie uma referência ao local onde você deseja armazenar os dados do cliente no Realtime Database
      const clienteRef = ref(db, 'clientes/' + user.uid);

      // Armazene os dados do cliente no Firebase Realtime Database usando set
      await set(clienteRef, userData);
      // Crie uma referência à localização onde você deseja armazenar os dados do usuário no Realtime Database
const userRef = ref(getDatabase(), 'users/' + user.uid);

// Armazene os dados gerais do usuário no Firebase Realtime Database usando set
await set(userRef, userData);
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export { registerUser };


/*
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfigurations/firebaseConfig'; // Certifique-se de que o caminho está correto
import { getDatabase, ref, set } from 'firebase/database';

// ...

const nome = "Nome do Usuário"; // Defina o nome do usuário
// Resto do código
const registerUser = async (email, senha, nome, telefone, userType, imagem) => {
  if (!nome) {
    throw new Error('Nome do usuário não definido.');
  }

  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    const db = getDatabase();

    // Dados do usuário a serem armazenados no Firebase Realtime Database
    const userData = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      userType: userType, // Adicione o tipo de usuário ao objeto de dados
      imagem: imagem
    };

    // Verifique o tipo de usuário e crie uma "subtabela" com base no tipo
    if (userType === 'Buffet') {
      const buffetRef = ref(db, 'buffets/' + user.uid);
      await set(buffetRef, userData);
    } else if (userType === 'Cliente') {
      const clienteRef = ref(db, 'clientes/' + user.uid);
      await set(clienteRef, userData);
    }

    // Agora, você pode excluir o usuário da tabela principal "users"
    const userRef = ref(db, 'users/' + user.uid);
    await set(userRef, null);

    return user;
  } catch (error) {
    throw error;
  }
};

export { registerUser };
*/