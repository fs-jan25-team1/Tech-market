import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Heart, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from './MobileSidebar';
import '@/components/organisms/Header/Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/phones', label: 'Phones' },
    { path: '/tablets', label: 'Tablets' },
    { path: '/accessories', label: 'Accessories' },
  ];

  return (
    <header className="header">
      <div className="header__container">
        {/* Left side: logo and nav */}
        <div className="header__left">
          <Link to="/" className="header__logo">
            <img src="/src/assets/logo/Logo.svg" alt="Nice Gadgets" />
          </Link>

          <nav className="header__nav">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `header__link ${isActive ? 'header__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right side: icons and burger */}
        <div className="header__right">
          <div className="header__icons">
            <Link to="/favorites" aria-label="Favorites">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>

            <Link to="/cart" aria-label="Cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="header__mobile-toggle"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <MobileSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
