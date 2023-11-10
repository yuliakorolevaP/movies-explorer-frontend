import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Auth from '../Auth/Auth';
import Navigation from '../Navigation/Navigation';

const Header = ({ isLoggedIn }) => {
  const { pathname } = useLocation();
  // const [menu, setMenu] = useState(false);

  return (
    <header className={`header ${pathname !== '/' ? '' : 'header_type_auth'}`}>
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип Movies Explorer"></img>
      </Link>
      {isLoggedIn ? <Navigation /> : <Auth />}
    </header>
  );
};

export default Header;