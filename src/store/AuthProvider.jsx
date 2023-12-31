import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

const AuthContext = createContext({
  userEmail: '',
  isLoggedIn: false,
});

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState(auth.currentUser);
  // pasiimti is localstorage
  const accToken = localStorage.getItem('fbToken');
  const userEmail = fireUser?.email;
  let isLoggedIn = accToken ? true : false;
  isLoggedIn = Boolean(accToken);
  isLoggedIn = !!accToken;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        // console.log('Prisijungta');

        setFireUser(user);
        localStorage.setItem('fbToken', user.accessToken);
      } else {
        // User is signed out
        // ...
        // console.log('Atsijungta');
        setFireUser({});
        localStorage.removeItem('fbToken');
      }
    });
  }, []);

  const ctx = {
    userEmail: userEmail,
    isLoggedIn: isLoggedIn,
  };

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

// custom hook

export function useAuth() {
  return useContext(AuthContext);
}
