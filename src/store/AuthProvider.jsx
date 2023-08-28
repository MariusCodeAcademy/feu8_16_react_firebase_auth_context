import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  userEmail: null,
  login: () => {},
});

export default function AuthProvider(props) {
  const [userEmail, setUserEmail] = useState('');

  function login(gotEmail) {
    setUserEmail(gotEmail);
  }

  const ctx = {
    email: userEmail,
    login: login,
  };

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

// custom hook

export function useAuth() {
  return useContext(AuthContext);
}
