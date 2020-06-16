import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC4Q1q0pJxRmMpRj3RDywTglSzt-06O3mE",
  authDomain: "crwn-db1207.firebaseapp.com",
  databaseURL: "https://crwn-db1207.firebaseio.com",
  projectId: "crwn-db1207",
  storageBucket: "crwn-db1207.appspot.com",
  messagingSenderId: "18265708739",
  appId: "1:18265708739:web:0b00a86f25ab7eb256aa76",
  measurementId: "G-P4DTWRNVXF",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
