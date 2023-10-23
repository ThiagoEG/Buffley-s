import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfigurations/firebaseConfig'; // Certifique-se de que o caminho está correto

const registerUser = async (email, senha) => {
  const auth = getAuth(); // Inicializa o Firebase Authentication
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    
    // Resto do código para adicionar os dados do usuário ao Firestore
    // ...

    return user;
  } catch (error) {
    throw error;
  }
};

export { registerUser };
