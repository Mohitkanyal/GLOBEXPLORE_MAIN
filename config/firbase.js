// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD4Bpi5J3volu5TqApUeInYKNIn0FtCxU",
  authDomain: "travel-app-c0d13.firebaseapp.com",
  projectId: "travel-app-c0d13",
  storageBucket: "travel-app-c0d13.appspot.com",
  messagingSenderId: "1021569587767",
  appId: "1:1021569587767:web:751b058730a185a0a63db2",
  measurementId: "G-V4C94CDDX8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// Initialize Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
