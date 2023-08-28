import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import { useAuth } from '../../store/AuthProvider';

export default function Header() {
  const ctx = useAuth();
  console.log('ctx ===', ctx);

  const isLoggedIn = false;

  return (
    <header className='header'>
      <div className='container'>
        <Link to='/' className='logo'>
          Logo
        </Link>
        <nav>
          <NavLink className={'navLink'} to={'/'}>
            Home
          </NavLink>
          <NavLink className={'navLink'} to={'/profile'}>
            My Profile
          </NavLink>
          <NavLink className={'navLink'} to={'/login'}>
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
