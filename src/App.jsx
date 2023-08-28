import './App.css';
import Login from './components/Login';
import { app } from './firebase/firebase';

export default function App() {
  console.log('app', app);
  return (
    <div className='container'>
      <h1>Firebase</h1>
      <Login />
    </div>
  );
}
