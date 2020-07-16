import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCu6R_UIUQfDAj0smiku8JAXRUb-wcQJ88",
  authDomain: "crwn-clothing-2020.firebaseapp.com",
  databaseURL: "https://crwn-clothing-2020.firebaseio.com",
  projectId: "crwn-clothing-2020",
  storageBucket: "crwn-clothing-2020.appspot.com",
  messagingSenderId: "351291666301",
  appId: "1:351291666301:web:8b6fe6d7105cf30d64a614",
  measurementId: "G-HP1N0G22KP",
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
    } catch (err) {
      console.log("error creating data");
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
