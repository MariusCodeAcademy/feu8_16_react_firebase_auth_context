import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

export default function Header() {
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
          <NavLink className={'navLink'} to={'/login'}>
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
