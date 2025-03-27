import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'filmoteka-6fa0c.firebaseapp.com',
  databaseURL:
    'https://filmoteka-6fa0c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-6fa0c',
  storageBucket: 'filmoteka-6fa0c.firebasestorage.app',
  messagingSenderId: '953286650398',
  appId: '1:953286650398:web:8beb2ec47627e38f929c0f',
  measurementId: 'G-843J8GB9XT',
};

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const db = getDatabase(app);

export { Auth, db };
