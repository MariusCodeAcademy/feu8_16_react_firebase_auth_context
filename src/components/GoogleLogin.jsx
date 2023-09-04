import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { googleProvider } from '../firebase/firebase';

export default function GoogleLogin() {
  function authWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log('token ===', token);
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log('user ===', user);
        // ...
      })
      .catch((error) => {
        console.warn('error ===', error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('credential ===', credential);
        // ...
      });
  }

  return (
    <div>
      <h2>Login with google</h2>
      <button onClick={authWithGoogle}>
        <FcGoogle size={35} />
      </button>
    </div>
  );
}
