import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

import { firebaseAuth } from "./config";
import { FirebaseError } from "firebase/app";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account"});

export const signInWithGoogle = async () => {

  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    //const credentials = GoogleAuthProvider.credentialFromResult(result);
    //console.log({ credentials });
    
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      //user info
      displayName,
      email,
      photoURL,
      uid,
    };

  } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWhitEmailPassword = async ({ email, password, displayName }) => {
  try {

    console.log({email, password, displayName});

    const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile( firebaseAuth.currentUser, { displayName } );

    return {
      ok: true,
      //user info
      displayName,
      email,
      photoURL,
      uid,
    }
    
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
}

export const loginWithEmailPassword = async ({email, password}) => {
  
  try {
    const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      //user info
      displayName,
      email,
      photoURL,
      uid,
    }
    
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }

}