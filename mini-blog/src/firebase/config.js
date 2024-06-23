// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7SePqgw69Qm-YKtZT-p3Z0UEFKCrzx9I",
  authDomain: "miniblog-76150.firebaseapp.com",
  projectId: "miniblog-76150",
  storageBucket: "miniblog-76150.appspot.com",
  messagingSenderId: "313855080666",
  appId: "1:313855080666:web:d34a1e14eb0e6403c64de3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };