import firebase from "@firebase/app-compat";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/storage";
 



const firebaseConfig = {
  apiKey: "AIzaSyDNNlY3yIh5AJH3C51aF0ESSM8J3CYFWsM",
  authDomain: "projetoprogramacao-a242b.firebaseapp.com",
  projectId: "projetoprogramacao-a242b",
  storageBucket: "projetoprogramacao-a242b.appspot.com",
  messagingSenderId: "830665180797",
  appId: "1:830665180797:web:dfea2a536a9529b11fd314"
};


const app = firebase.initializeApp(firebaseConfig);

export default firebase;  
export const db = getFirestore(app);
export const storage = firebase.storage(); 