import GoogleLogin from '../components/GoogleLogin';
import Login from '../components/Login';

export default function LoginPage() {
  return (
    <div className='container'>
      <h1>LoginPage</h1>
      <Login />
      <hr />
      <GoogleLogin />
    </div>
  );
}
