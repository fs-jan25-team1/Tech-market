import { NavLink, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, X } from 'lucide-react';
import '@/components/organisms/Header/Header.scss';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  if (!isOpen) return null;

  return (
    <aside className="header__sidebar">
      <div className="header__sidebar-top">
        <Link to="/" className="header__logo" onClick={onClose}>
          <img src="/src/assets/logo/Logo.svg" alt="Nice Gadgets" />
        </Link>

        <button
          className="header__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="header__sidebar-nav">
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onClose}
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="header__sidebar-bottom">
        <Link to="/favorites" onClick={onClose} aria-label="Go to favorites">
          <Button variant="ghost" size="icon">
            <Heart className="w-6 h-6" />
          </Button>
        </Link>

        <Link to="/cart" onClick={onClose} aria-label="Go to cart">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </aside>
  );
};
