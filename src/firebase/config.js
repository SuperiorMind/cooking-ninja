import firebase from "firebase/app";
import  'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDtCaHX_xP1yaWi7N9ZZ64zcEnsJaVJ4a0",
    authDomain: "cooking-ninja-site-18c51.firebaseapp.com",
    projectId: "cooking-ninja-site-18c51",
    storageBucket: "cooking-ninja-site-18c51.appspot.com",
    messagingSenderId: "917230130670",
    appId: "1:917230130670:web:d5c592b65625679a3aeaff"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)
  //init services
  const projectFirestore = firebase.firestore()

  export {projectFirestore}