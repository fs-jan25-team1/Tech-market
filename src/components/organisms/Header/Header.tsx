// src/components/organisms/Header/Header.tsx
import { Link, NavLink } from 'react-router-dom';
import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';
import '@/components/organisms/Header/Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img src="/src/assets/logo/Logo.svg" alt="Tech Market" />
        </Link>

        {/* Navigation */}
        <nav className="header__nav">
          {['/', '/phones', '/tablets', '/accessories'].map((path, i) => {
            const labels = ['Home', 'Phones', 'Tablets', 'Accessories'];

            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `header__link ${isActive ? 'header__link--active' : ''}`
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </nav>

        {/* Action buttons */}
        <div className="header__actions">
          <Button variant={ButtonTypes.favourite} />
          <div className="header__cart-placeholder">🛒</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
