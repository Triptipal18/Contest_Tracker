



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyDuRdnBeuQQ-Gq_jJKLt8uCZlQm-SXxQeU",
  authDomain: "contest-tracker-58322.firebaseapp.com",
  projectId: "contest-tracker-58322",
  storageBucket: "contest-tracker-58322.firebasestorage.app",
  messagingSenderId: "85537154064",
  appId: "1:85537154064:web:888235787d25b737c75695",
  measurementId: "G-9SNW0GM33V"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
  export {auth}
 