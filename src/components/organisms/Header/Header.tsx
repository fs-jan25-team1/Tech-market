import { Link, NavLink } from 'react-router-dom';
import Button from '../../atoms/button/Button';
import { ButtonTypes } from '../../../types/ButtonTypes';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img src="/src/assets/logo/Logo.svg" alt="Nice Gadgets" />
        </Link>

        {/* Navigation */}
        <nav className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
          >
            Accessories
          </NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="header__actions">
          <Button variant={ButtonTypes.favourite} />

          {/* Temporary cart placeholder */}
          <div className="header__cart-placeholder">
            🛒
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
