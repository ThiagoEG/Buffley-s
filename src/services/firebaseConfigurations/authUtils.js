import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfigurations/firebaseConfig'; // Certifique-se de que o caminho está correto
import { getDatabase, ref, set } from 'firebase/database';

// ...

const nome = "Nome do Usuário"; // Defina o nome do usuário
// Resto do código

const registerUser = async (email, senha, nome, telefone, userType) => {
  if (!nome) {
    throw new Error('Nome do usuário não definido.');
  }

  const auth = getAuth(); // Inicializa o Firebase Authentication
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
    };

    const db = getDatabase(); // Obtenha a instância do Firebase Realtime Database

    // Crie uma referência ao local onde você deseja armazenar os dados do usuário no Realtime Database
    const userRef = ref(db, 'users/' + user.uid);

    // Armazene os dados do usuário no Firebase Realtime Database usando set
    await set(userRef, userData);

    return user;
  } catch (error) {
    throw error;
  }
};





export { registerUser };
