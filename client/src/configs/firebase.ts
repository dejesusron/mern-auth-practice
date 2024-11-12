// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'auth-practice-db72c.firebaseapp.com',
  projectId: 'auth-practice-db72c',
  storageBucket: 'auth-practice-db72c.firebasestorage.app',
  messagingSenderId: '636163201660',
  appId: '1:636163201660:web:04f058e8a412d0cc1507f9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
