// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDB6D6QGeG4CyL9cTAtaTpLnOiCBODDQjA",
  authDomain: "stackoverflow-clone-43209.firebaseapp.com",
  projectId: "stackoverflow-clone-43209",
  storageBucket: "stackoverflow-clone-43209.appspot.com",
  messagingSenderId: "814671930594",
  appId: "1:814671930594:web:b7986cbf5e9ed47e27aabb",
  measurementId: "G-822XYRGEQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};
