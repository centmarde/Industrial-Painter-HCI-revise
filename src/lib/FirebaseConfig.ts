// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY0z8YIMX-W8L4dJSnAHXoI23V_bhmkJ4",
  authDomain: "industrial-painter.firebaseapp.com",
  projectId: "industrial-painter",
  storageBucket: "industrial-painter.firebasestorage.app",
  messagingSenderId: "969922141340",
  appId: "1:969922141340:web:b0af7f2b384cbe29f5e159"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);