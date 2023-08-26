// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCTSYTtVNZyHyrqPkmle7X4xmTwFc6NRro",
  authDomain: "busybuy-81521.firebaseapp.com",
  databaseURL: "https://busybuy-81521-default-rtdb.firebaseio.com/",
  projectId: "busybuy-81521",
  storageBucket: "busybuy-81521.appspot.com",
  messagingSenderId: "110576615170",
  appId: "1:110576615170:web:21a58295359a8c90b74c1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);