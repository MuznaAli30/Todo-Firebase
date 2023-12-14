// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4f3y8hflUgfSr5cT8hNpiW_xE6k7ad5A",
  authDomain: "to-do-app-5aec5.firebaseapp.com",
  projectId: "to-do-app-5aec5",
  storageBucket: "to-do-app-5aec5.appspot.com",
  messagingSenderId: "505430898044",
  appId: "1:505430898044:web:a42eed9e5682f9d7a0a0f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Export firestore database
// It will be imported into your react app whenever it is needed
export {db};