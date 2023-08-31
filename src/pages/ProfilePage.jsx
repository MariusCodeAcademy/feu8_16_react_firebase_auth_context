import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuth } from '../store/AuthProvider';

export default function ProfilePage() {
  const ctx = useAuth();

  const [dispName, setDispName] = useState(ctx.displayName);
  const [phUrl, setPhUrl] = useState(ctx.photoURL);

  function enterDispName(event) {
    setDispName(event.target.value);
  }
  function enterPhotoUrl(event) {
    setPhUrl(event.target.value);
  }

  // pasiimti displayName protoUrl info is konteksto

  // TODO: pasidaryti kad atsinaujintu info be refresh

  /**@param {SubmitEvent} event */
  function handleSubmit(event) {
    event.preventDefault();
    // kas ?
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: dispName,
      photoURL: phUrl,
    })
      .then(() => {
        // Profile updated!
        console.log('update pavyko');
        console.log('auth.currentUser ===', auth.currentUser);
        // iskviesti getUserInfo() funkcija esancia kontekste
      })
      .catch((error) => {
        // An error occurred
        console.warn('update nepavyko');
      });
  }

  return (
    <div className='container'>
      <h1>ProfilePage</h1>
      <h2>{ctx.displayName}</h2>
      <img src={ctx.photoURL} alt='Profile image' />
      <p>Welcome to Your own space</p>
      <p>
        entered values: {dispName} {phUrl}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          value={dispName}
          onChange={enterDispName}
          type='text'
          placeholder='displayName'
        />
        <input
          value={phUrl}
          onChange={enterPhotoUrl}
          type='text'
          placeholder='protoUrl'
        />
        <button>update</button>
      </form>

      <p>jei pavyksta pridet email atnaujinima</p>
    </div>
  );
}
