// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore, getDoc, getDocs, doc, collection} from "@firebase/firestore";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
// import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
// import { geStorage } from "/node_modules//firebase/storage";
// TODO: Add connection to storage when making projects page

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


const proEnBTextRef = doc(db, 'projects_en', 'button');
const proEnBTextSnapshot = await getDoc(proEnBTextRef);
const proEnLTextRef = doc(db, 'projects_en', 'label');
const proEnLTextSnapshot = await getDoc(proEnLTextRef);

const proFiBTextRef = doc(db, 'projects_fi', 'button');
const proFiBTextSnapshot = await getDoc(proFiBTextRef);
const proFiLTextRef = doc(db, 'projects_fi', 'label');
const proFiLTextSnapshot = await getDoc(proFiLTextRef);


const backFiLTextRef = doc(db, 'background_fi', 'label');
const backFiLTextSnapshot = await getDoc(backFiLTextRef);
const backFiEdTextRef = collection(db, '/background_fi/label/education');
const backFiEdTextSnapshot = await getDocs(backFiEdTextRef);
const backFiExTextRef = collection(db, '/background_fi/label/experience');
const backFiExTextSnapshot = await getDocs(backFiExTextRef);


const backEnLTextRef = doc(db, 'background_en', 'label');
const backEnLTextSnapshot = await getDoc(backEnLTextRef);
const backEnEdTextRef = collection(db, '/background_en/label/education');
const backEnEdTextSnapshot = await getDocs(backEnEdTextRef);
const backEnExTextRef = collection(db, '/background_en/label/experience');
const backEnExTextSnapshot = await getDocs(backEnExTextRef);


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

function getGeneralEnTexts(){
  return {
    label: getGenEnLabelTexts(),
    button: getGenEnButtonTexts()
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

function getGeneralFiTexts(){
  return {
    label: getGenFiLabelTexts(),
    button: getGenFiButtonTexts()
  }
}


function getFrontpageTexts() {
  if(frontpageLTextSnapshot.exists){
    return {
      label: frontpageLTextSnapshot.data() 
    };
  }
}


function getProEnButtonTexts() {
  if(proEnBTextSnapshot.exists){
    return proEnBTextSnapshot.data();
  }
}

function getProEnLabelTexts() {
  if(proEnLTextSnapshot.exists){
    return proEnLTextSnapshot.data();
  }
}


function getProjectsEnTexts(){
  return {
    label: getProEnLabelTexts(),
    button: getProEnButtonTexts()
  }
}


function getProFiButtonTexts() {
  if(proFiBTextSnapshot.exists){
    return proFiBTextSnapshot.data();
  }
}

function getProFiLabelTexts() {
  if(proFiLTextSnapshot.exists){
    return proFiLTextSnapshot.data();
  }
}

function getProjectsFiTexts(){
  return {
    label: getProFiLabelTexts(),
    button: getProFiButtonTexts()
  }
}


function getBackFiLabelTexts() {
  if(backFiLTextSnapshot.exists){
    return backFiLTextSnapshot.data();
  }
}

function getBackFiEducationTexts() {
  const docs = [];
  for(let i = 0; i<backFiEdTextSnapshot.docs.length; i++){
    docs[i] = backFiEdTextSnapshot.docs[i].data();
  }
  // So the newest one is first
  docs.reverse();
  return docs;
}

function getBackFiExperienceTexts() {
  const docs = [];
  for(let i = 0; i<backFiExTextSnapshot.docs.length; i++){
    docs[i] = backFiExTextSnapshot.docs[i].data();
  }
  docs.reverse();
  return docs;
}

function getBackgroundFiTexts(){
  return {
    label: getBackFiLabelTexts(),
    education: getBackFiEducationTexts(),
    experience: getBackFiExperienceTexts()
  }
}


function getBackEnLabelTexts() {
  if(backEnLTextSnapshot.exists){
    return backEnLTextSnapshot.data();
  }
}

function getBackEnEducationTexts() {
  const docs = [];
  for(let i = 0; i<backEnEdTextSnapshot.docs.length; i++){
    docs[i] = backEnEdTextSnapshot.docs[i].data();
  }
  docs.reverse();
  return docs;
}

function getBackEnExperienceTexts() {
  const docs = [];
  for(let i = 0; i<backEnExTextSnapshot.docs.length; i++){
    docs[i] = backEnExTextSnapshot.docs[i].data();
  }
  docs.reverse();
  return docs;
}

function getBackgroundEnTexts(){
  return {
    label: getBackEnLabelTexts(),
    education: getBackEnEducationTexts(),
    experience: getBackEnExperienceTexts()
  }
}


export { getGeneralEnTexts, getGeneralFiTexts, getFrontpageTexts, 
        getProjectsEnTexts, getProjectsFiTexts, getBackgroundFiTexts, 
        getBackgroundEnTexts };