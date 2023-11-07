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

    // Dados do usuário a serem armazenados no Firebase Realtime Database
    const userData = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      userType: userType, // Adicione o tipo de usuário ao objeto de dados
      imagem: imagem
    };

    const db = getDatabase();

    // Crie uma referência ao local onde você deseja armazenar os dados do usuário no Realtime Database
    const userRef = ref(db, 'users/' + user.uid);

    // Armazene os dados do usuário no Firebase Realtime Database usando set
    await set(userRef, userData);

    // Verifique o tipo de usuário e crie uma "subtabela" com base no tipo
    if (userType === 'Buffet') {
      const buffetRef = ref(db, 'buffets/' + user.uid);
      await set(buffetRef, userData);
    } else if (userType === 'Cliente') {
      const clienteRef = ref(db, 'clientes/' + user.uid);
      await set(clienteRef, userData);
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