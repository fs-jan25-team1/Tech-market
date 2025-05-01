import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Loader } from '@/components/atoms/Loader/Loader';
import { User } from 'firebase/auth';
import { motion } from 'framer-motion';
import { UserAvatar } from '@/components/molecules/UserAvatar/UserAvatar';
import { useTranslation } from 'react-i18next';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('header.navItem.home') },
    { path: '/phones', label: t('header.navItem.phones') },
    { path: '/tablets', label: t('header.navItem.tablets') },
    { path: '/accessories', label: t('header.navItem.accessories') },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            aria-label={t('header.mobileSidebar.closeMenu')}
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
            <div className="relative flex justify-center" ref={dropdownRef}>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
              >
                <UserAvatar user={user} />
              </button>

              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 right-0 bg-[#905BFF] text-white rounded-xl shadow-lg w-44 z-50 cursor-pointer"
                >
                  <div className="px-4 py-3 border-b border-[#a885ff]">
                    <p className="font-semibold truncate">{user.displayName}</p>
                    <p className="text-sm text-[#E3DFFF] truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                      onClose();
                    }}
                    className="w-full text-left px-4 py-2 text-white rounded-b-xl text-sm cursor-pointer"
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      t('header.mobileSidebar.button.signOut')
                    )}
                  </button>
                </motion.div>
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
              {t('header.mobileSidebar.button.signIn')}
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
          aria-label={t('header.mobileSidebar.goToFavorites')}
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
            isCart
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
