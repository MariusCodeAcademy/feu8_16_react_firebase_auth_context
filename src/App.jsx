import { Route, Routes } from 'react-router-dom';
import './App.css';
import { app } from './firebase/firebase';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/layout/Header';

export default function App() {
  console.log('app', app);
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}
