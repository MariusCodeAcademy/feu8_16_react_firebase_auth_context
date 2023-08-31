import { useState } from 'react';

export default function ProfilePage() {
  const [dispName, setDispName] = useState('');
  const [phUrl, setPhUrl] = useState('');

  function enterDispName(event) {
    setDispName(event.target.value);
  }
  function enterPhotoUrl(event) {
    setPhUrl(event.target.value);
  }

  // 1. updateProfile funkcijos pagalba atnaujinti reiksmes
  // https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
  // pateikiant forma paimti reiksmes is displayName ir protoUrl

  // pasiimti displayName protoUrl info is konteksto

  // TODO: pasidaryti kad atsinaujintu info be refresh

  return (
    <div className='container'>
      <h1>ProfilePage</h1>
      <h2>User display name</h2>
      <img src='#' alt='Profile image' />
      <p>Welcome to Your own space</p>

      <p>
        entered values: {dispName} {phUrl}
      </p>
      <form>
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
