import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Heart, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from './MobileSidebar';

interface HeaderProps {
  favoritesCount?: number;
  cartCount?: number;
}

const Header = ({ favoritesCount = 0, cartCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/phones', label: 'Phones' },
    { path: '/tablets', label: 'Tablets' },
    { path: '/accessories', label: 'Accessories' },
  ];

  const isFavorites = location.pathname === '/favorites';
  const isCart = location.pathname === '/cart';

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-[#3B3E4A] font-[montBold]">
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img
              src="/src/assets/logo/Logo.svg"
              alt="Nice Gadgets"
              className="h-6 w-auto"
            />
          </Link>

          <nav className="hidden sm:flex gap-6 relative h-12">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative flex items-center h-full text-sm font-semibold uppercase transition-colors ${
                    isActive
                      ? 'text-[#F1F2F9]'
                      : 'text-[#75767F] hover:text-[#F1F2F9]'
                  }`
                }
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] w-full transition-all duration-300 ${
                    location.pathname === path
                      ? 'bg-[#F1F2F9]'
                      : 'bg-transparent'
                  }`}
                />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right: Icons (desktop) */}
        <div className="hidden sm:flex items-center gap-6 h-12">
          <div className="h-full w-px bg-[#3B3E4A]" />

          <div className="flex items-center h-full">
            <NavLink
              to="/favorites"
              className="relative flex items-center justify-center h-full"
            >
              <Button
                variant="ghost"
                size="icon"
                className={`hover:scale-110 transition-transform ${
                  isFavorites ? 'text-[#F1F2F9]' : 'text-[#75767F]'
                }`}
              >
                <Heart className="h-5 w-5" />
              </Button>
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-[10px] leading-[11px] font-bold text-white bg-[#EB5757] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[2px]">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          </div>

          <div className="h-full w-px bg-[#3B3E4A]" />

          <div className="flex items-center h-full">
            <NavLink
              to="/cart"
              className="relative flex items-center justify-center h-full"
            >
              <Button
                variant="ghost"
                size="icon"
                className={`hover:scale-110 transition-transform ${
                  isCart ? 'text-[#F1F2F9]' : 'text-[#75767F]'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        {/* Burger menu (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(true)}
          className="sm:hidden text-[#F1F2F9]"
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
