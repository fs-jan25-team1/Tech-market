import { NavLink, Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favoritesCount?: number;
  cartCount?: number;
}

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

export const MobileSidebar = ({
  isOpen,
  onClose,
  favoritesCount = 0,
  cartCount = 0,
}: MobileSidebarProps) => {
  const location = useLocation();
  const isFavorites = location.pathname === '/favorites';
  const isCart = location.pathname === '/cart';

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-0 z-50 flex flex-col justify-between bg-black sm:hidden">
      {/* Top */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" onClick={onClose}>
            <img src="/logo/Logo.svg" alt="Nice Gadgets" className="h-5" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-secondary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-6 text-center">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-wide transition-colors pb-1 border-b-2 ${
                  isActive
                    ? 'text-[#F1F2F9] border-[#F1F2F9]'
                    : 'text-[#75767F] border-transparent hover:text-[#F1F2F9]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="relative flex items-center justify-center h-20 border-t border-[#3B3E4A]">
        {/* Favorites */}
        <div className="flex flex-col items-center justify-center w-1/2 relative">
          <Link
            to="/favorites"
            onClick={onClose}
            aria-label="Go to favorites"
            className="flex flex-col items-center justify-center relative"
          >
            <div className="relative flex items-center justify-center">
              <Heart
                className={`w-6 h-6 transition-transform hover:scale-110 ${
                  isFavorites
                    ? 'text-[#F1F2F9]'
                    : 'text-[#75767F] hover:text-[#F1F2F9]'
                }`}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-3 text-[10px] leading-[11px] font-bold text-white bg-[#EB5757] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[2px]">
                  {favoritesCount}
                </span>
              )}
            </div>
            {/* Подчеркивание */}
            {isFavorites && (
              <div className="mt-1 w-6 h-[2px] bg-[#F1F2F9] rounded-full" />
            )}
          </Link>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-[#3B3E4A]" />

        {/* Cart */}
        <div className="flex flex-col items-center justify-center w-1/2 relative">
          <Link
            to="/cart"
            onClick={onClose}
            aria-label="Go to cart"
            className="flex flex-col items-center justify-center relative"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingCart
                className={`w-6 h-6 transition-transform hover:scale-110 ${
                  isCart
                    ? 'text-[#F1F2F9]'
                    : 'text-[#75767F] hover:text-[#F1F2F9]'
                }`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-3 text-[10px] leading-[11px] font-bold text-white bg-[#EB5757] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[2px]">
                  {cartCount}
                </span>
              )}
            </div>
            {isCart && (
              <div className="mt-1 w-6 h-[2px] bg-[#F1F2F9] rounded-full" />
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};
