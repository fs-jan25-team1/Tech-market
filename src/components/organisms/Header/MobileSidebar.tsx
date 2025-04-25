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
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" onClick={onClose}>
            <img
              src="/src/assets/logo/Logo.svg"
              alt="Nice Gadgets"
              className="h-5"
            />
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
      <div className="relative grid grid-cols-3 items-center h-20 border-t border-[#3B3E4A]">
        {/* Favorites */}
        <div className="flex items-center justify-center relative cursor-pointer">
          <Link to="/favorites" onClick={onClose} aria-label="Go to favorites">
            <Heart
              className={`w-6 h-6 transition-transform hover:scale-110 ${
                isFavorites
                  ? 'text-[#F1F2F9]'
                  : 'text-[#75767F] hover:text-[#F1F2F9]'
              }`}
            />
          </Link>
          {favoritesCount > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] font-bold leading-none w-4 h-4 flex items-center justify-center rounded-full">
              {favoritesCount}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-full bg-[#3B3E4A] mx-auto" />

        {/* Cart */}
        <div className="flex items-center justify-center relative cursor-pointer">
          <Link to="/cart" onClick={onClose} aria-label="Go to cart">
            <ShoppingCart
              className={`w-6 h-6 transition-transform hover:scale-110 ${
                isCart
                  ? 'text-[#F1F2F9]'
                  : 'text-[#75767F] hover:text-[#F1F2F9]'
              }`}
            />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold leading-none w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
