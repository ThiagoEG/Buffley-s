// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH1CLXPDXaBgyZBqAOqlmEdrS4--wCOqE",
  authDomain: "buffley-s.firebaseapp.com",
  projectId: "buffley-s",
  storageBucket: "buffley-s.appspot.com",
  messagingSenderId: "478894471846",
  appId: "1:478894471846:web:9f5d56812ec46e07185267"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Obtenha a instância do Firebase Authentication

const db = getFirestore(app);

export { auth, db, app };

/*
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });*/