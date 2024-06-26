import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  PhoneAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        console.log("signOut successfully");
      })
      .catch(() => console.log('error'));
  };
  //login with google
  const googleProvider = new GoogleAuthProvider();

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //LOGIN WITH FB
  const fbProvider = new FacebookAuthProvider();
  const signInFB = () => {
    setLoading(true);
    return signInWithPopup(auth, fbProvider);
  };

  const profileUpdate = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);


      if (currentUser) {
        axios
          .post("https://ai-server-sooty.vercel.app/jwt", {
            email: currentUser.email,
          })
          .then((data) => {

            localStorage.setItem("access-token", data?.data?.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);
  const phoneAuthProvider = new PhoneAuthProvider(auth); 

  const authInfo = {
    user,
    auth,
    createUser,
    signIn,
    logOut,
    signInGoogle,
    loading,
    setLoading,
    profileUpdate,
    signInFB,
    sendPasswordResetEmail,
    phoneAuthProvider,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
