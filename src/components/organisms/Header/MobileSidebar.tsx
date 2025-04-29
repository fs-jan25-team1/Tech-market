import { NavLink, Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { User } from 'firebase/auth';
import { motion } from 'framer-motion';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favoritesCount?: number;
  cartCount?: number;
  user: User | null;
  loading: boolean;
  onLogout: () => void;
  onSignIn: () => void;
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
  user,
  loading,
  onLogout,
  onSignIn,
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

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-6 text-center mb-6">
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

        {/* Sign In / Log Out Button with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {user ? (
            <button
              onClick={onLogout}
              disabled={loading}
              className="w-full py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-md text-sm font-semibold transition"
            >
              {loading ? 'Loading...' : 'Log Out'}
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onSignIn();
              }}
              className="w-full py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-md text-sm font-semibold transition"
            >
              Sign In
            </button>
          )}
        </motion.div>
      </div>

      {/* Bottom Section (Favorites and Cart) */}
      <div className="flex items-center justify-center h-20 border-t border-[#3B3E4A]">
        {/* Favorites */}
        <Link
          to="/favorites"
          onClick={onClose}
          aria-label="Go to favorites"
          className={`flex flex-col items-center justify-center w-1/2 h-full relative border-r border-[#3B3E4A] transition-all duration-300 ${
            isFavorites
              ? 'border-b-2 border-b-[#F1F2F9]'
              : 'border-b-2 border-b-transparent hover:border-b-[#F1F2F9]'
          }`}
        >
          <div className="relative flex items-center justify-center h-full">
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
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          onClick={onClose}
          aria-label="Go to cart"
          className={`flex flex-col items-center justify-center w-1/2 h-full relative transition-all duration-300 ${
            isCart
              ? 'border-b-2 border-b-[#F1F2F9]'
              : 'border-b-2 border-b-transparent hover:border-b-[#F1F2F9]'
          }`}
        >
          <div className="relative flex items-center justify-center h-full">
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
        </Link>
      </div>
    </aside>
  );
};
