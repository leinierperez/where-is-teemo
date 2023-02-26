import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBBD6O986abUcLoPJUAqoSCRmclq-yZMxw',
  authDomain: 'where-is-teemo.firebaseapp.com',
  projectId: 'where-is-teemo',
  storageBucket: 'where-is-teemo.appspot.com',
  messagingSenderId: '54781639540',
  appId: '1:54781639540:web:6614628523a0a4ee580a21',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
