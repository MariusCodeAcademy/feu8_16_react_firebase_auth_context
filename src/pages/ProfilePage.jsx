export default function ProfilePage() {
  // 1. updateProfile funkcijos pagalba atnaujinti reiksmes
  // https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

  // pasiimti displayName protoUrl info is konteksto

  // pateikiant forma paimti reiksmes is displayName ir protoUrl

  return (
    <div className='container'>
      <h1>ProfilePage</h1>
      <h2>User display name</h2>
      <img src='#' alt='Profile image' />
      <p>Welcome to Your own space</p>

      <p>Turi buti forma, 2 inputai</p>
      <p>displayName</p>
      <p>protoUrl</p>

      <p>jei pavyksta pridet email atnaujinima</p>
    </div>
  );
}
