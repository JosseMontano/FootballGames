import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCETOk04LZEU2mBFU6ZuNsYVlzUSo3Gz08",

  authDomain: "cidtec-praxis.firebaseapp.com",

  projectId: "cidtec-praxis",

  storageBucket: "cidtec-praxis.appspot.com",

  messagingSenderId: "532697662029",

  appId: "1:532697662029:web:bb76f015a6fa06c3719204",

  measurementId: "G-81L13ZZTY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
const auth = getAuth(app);

export { app, auth };
