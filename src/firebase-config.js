import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBo1aE8xEGyMk8KskGksR3WSvQM-i-2Jtw",
  authDomain: "landmark-remark-app-v2.firebaseapp.com",
  projectId: "landmark-remark-app-v2",
  storageBucket: "landmark-remark-app-v2.appspot.com",
  messagingSenderId: "368172446130",
  appId: "1:368172446130:web:94b4c8a1726b70dd4c34ab"
};

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);