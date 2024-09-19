// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore, getDoc, doc } from "@firebase/firestore";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
// import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
// import { geStorage } from "/node_modules//firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC47f5xaVvOrHypTsNUZSuv3i8ie-bnYG8",
  authDomain: "portfolio-app-6ce3c.firebaseapp.com",
  projectId: "portfolio-app-6ce3c",
  storageBucket: "portfolio-app-6ce3c.appspot.com",
  messagingSenderId: "752556248857",
  appId: "1:752556248857:web:1a67e307abc6012bdd3f88",
  measurementId: "G-FDR0MPYE24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const genEnBTextRef = doc(db, 'general_en', 'button');
const genEnBTextSnapshot = await getDoc(genEnBTextRef);
const genEnLTextRef = doc(db, 'general_en', 'label');
const genEnLTextSnapshot = await getDoc(genEnLTextRef);
const genFiBTextRef = doc(db, 'general_fi', 'button');
const genFiBTextSnapshot = await getDoc(genFiBTextRef);
const genFiLTextRef = doc(db, 'general_fi', 'label');
const genFiLTextSnapshot = await getDoc(genFiLTextRef);
const frontpageLTextRef = doc(db, 'frontpage', 'label');
const frontpageLTextSnapshot = await getDoc(frontpageLTextRef);

function getGenEnButtonTexts() {
  if(genEnBTextSnapshot.exists){
    return genEnBTextSnapshot.data();
  }
}

function getGenEnLabelTexts() {
  if(genEnLTextSnapshot.exists){
    return genEnLTextSnapshot.data();
  }
}

function getGenFiButtonTexts() {
  if(genFiBTextSnapshot.exists){
    return genFiBTextSnapshot.data();
  }
}

function getGenFiLabelTexts() {
  if(genFiLTextSnapshot.exists){
    return genFiLTextSnapshot.data();
  }
}

function getFrontpageLabelTexts() {
  if(frontpageLTextSnapshot.exists){
    return frontpageLTextSnapshot.data();
  }
}

export { getGenEnButtonTexts, getGenEnLabelTexts, getGenFiButtonTexts, 
        getGenFiLabelTexts, getFrontpageLabelTexts };