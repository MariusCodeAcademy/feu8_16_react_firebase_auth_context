import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { app } from './firebase/firebase';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/layout/Header';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './store/AuthProvider';

export default function App() {
  const ctx = useAuth();
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        {ctx.isLoggedIn && <Route path='/profile' element={<ProfilePage />} />}
        <Route
          path='/login'
          element={
            ctx.isLoggedIn ? <Navigate to={'/profile'} /> : <LoginPage />
          }
        />
      </Routes>
    </div>
  );
}
