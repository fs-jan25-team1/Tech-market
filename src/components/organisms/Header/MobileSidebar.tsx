import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Loader } from '@/components/atoms/Loader/Loader';
import { User } from 'firebase/auth';
import { motion } from 'framer-motion';
import { UserAvatar } from '@/components/molecules/UserAvatar/UserAvatar';

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

        {/* Auth Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {user ? (
            <div className="relative flex justify-center">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className=" h-12 rounded-full overflow-hidden "
              >
                <UserAvatar user={user} />
              </button>

              {userMenuOpen && (
                <div className="absolute top-14 right-0 bg-white text-black rounded-md shadow-lg w-40 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold truncate">{user.displayName}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                      onClose();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    {loading ? <Loader /> : 'Logout'}
                  </button>
                </div>
              )}
            </div>
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
          <div className="relative flex items-center justify-center h-full group">
            <Heart
              className={`w-6 h-6 ${
                isFavorites ? 'text-[#F1F2F9]' : 'text-[#75767F]'
              } group-hover:text-[#F1F2F9] transition-colors`}
            />
            {favoritesCount > 0 && (
              <span className="top-[6px] right-[6px] bg-[#EB5757] text-white text-[8px] leading-[10px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-[2px]">
                {favoritesCount}
              </span>
            )}
          </div>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          onClick={onClose}
          className={`flex flex-col items-center justify-center w-1/2 h-full relative border-r border-[#3B3E4A] transition-all duration-300 ${
            isFavorites
              ? 'border-b-2 border-b-[#F1F2F9]'
              : 'border-b-2 border-b-transparent hover:border-b-[#F1F2F9]'
          }`}
        >
          <div className="relative flex items-center justify-center h-full group">
            <ShoppingCart
              className={`w-6 h-6 ${
                isCart ? 'text-[#F1F2F9]' : 'text-[#75767F]'
              } group-hover:text-[#F1F2F9] transition-colors`}
            />
            {cartCount > 0 && (
              <span className="top-[6px] right-[6px] bg-[#EB5757] text-white text-[10px] leading-[11px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[2px]">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
};
