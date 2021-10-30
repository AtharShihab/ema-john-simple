import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

// if (!firebase.app.length) {
firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        setUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        setUser({
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        });
      })
      .catch((err) => {});
  };

  const handleSubmit = (e) => {
    console.log(user.name, user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          var userInfo = userCredential.user;
          // ...
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          console.log(userInfo);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(errorCode, errorMessage);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          var userInfo = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          newUserInfo.isSignedIn = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log(userInfo);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const handleBlur = ({ target }) => {
    let isFieldValid = true;
    if (target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(target.value);
    }
    if (target.name === "password") {
      const isPasswordValid = target.value.length > 6;
      const passwordHadNumber = /\d{1}/.test(target.value);
      isFieldValid = isPasswordValid && passwordHadNumber;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[target.name] = target.value;
      setUser(newUserInfo);
    }
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

  return (
    <div className="App" style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our own Authenticatoin</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Your Name"
            required
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
