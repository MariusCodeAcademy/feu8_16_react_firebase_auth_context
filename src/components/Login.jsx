import { useState } from 'react';

export default function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('ar veikia?');
    // atspausdinti email ir passwor cia

    // nutraukti funkcijo vykdyma jei tuscias email arba password

    console.log('forma ok');
  }

  return (
    <div>
      <h2>Login here</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setEmailValue(event.target.value)}
          value={emailValue}
          type='text'
          placeholder='your email'
        />
        <input
          onChange={(event) => setPasswordValue(event.target.value)}
          value={passwordValue}
          type='password'
          placeholder='your password'
        />
        <button type='submit'>Login</button>
      </form>
      <div>
        <p>Entered email: {emailValue}</p>
        <p>Entered password: {passwordValue}</p>
      </div>
    </div>
  );
}
