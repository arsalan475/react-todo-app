
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCPoRtXaek2IP_l0YYVLrls83IIlg7fEdY",
  authDomain: "react-todo-app-408ad.firebaseapp.com",
  projectId: "react-todo-app-408ad",
  storageBucket: "react-todo-app-408ad.appspot.com",
  messagingSenderId: "91553366592",
  appId: "1:91553366592:web:9fc5a3bf33e8b09dc3d5a5"
};














export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
