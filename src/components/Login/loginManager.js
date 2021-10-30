import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // else {
  //   firebase.app(); // if already initialized, use that one
  // }
};

export const handleGoogleSignIn = () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };

      return signedInUser;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
      return err.message;
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((err) => {});
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var userInfo = userCredential.user;
      // ...
      const newUserInfo = { ...userInfo };
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      var errorMessage = error.message;
      // ..
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      console.log(newUserInfo);
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let userInfo = userCredential.user;
      const newUserInfo = { ...userInfo };
      newUserInfo.error = "";
      newUserInfo.success = true;
      newUserInfo.isSignedIn = true;
      console.log(userInfo);
      return newUserInfo;
      // ...
    })
    .catch((error) => {
      let errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      console.log(newUserInfo);
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful
      console.log("user name updated successfully");
      // ...
    })
    .catch((error) => {
      // An error occurred
      console.log(error);
      // ...
    });
};
