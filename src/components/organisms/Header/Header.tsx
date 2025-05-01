import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/shared/firebase';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/store';
import { Heart, ShoppingCart, Menu } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MobileSidebar } from './MobileSidebar';
import { Modal } from '@/components/molecules/Modal/Modal';
import { AuthForm } from '@/components/molecules/SingInForm/SingUpForm/SingUpForm';
import { UserDropdown } from '@/components/molecules/UserMenu/UserMenu';
import { Loader } from '@/components/atoms/Loader/Loader';
import { SettingsDropdown } from '@/components/molecules/SettingsDropdown/SettingsDropdown';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { useTheme } from '@/hooks/useTheme';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { toogleTheme } = useTheme();

  const cartCount = useAppSelector(
    (store) => Object.keys(store.cart.items).length,
  );
  const favoritesCount = useAppSelector(
    (store) => store.favourites.items.length,
  );

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { path: '/', label: t('header.navItem.home') },
    { path: '/phones', label: t('header.navItem.phones') },
    { path: '/tablets', label: t('header.navItem.tablets') },
    { path: '/accessories', label: t('header.navItem.accessories') },
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'uk' ? 'en' : 'uk';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-[#3B3E4A] font-[montBold]">
      <div className="w-full pl-6 pr-0 lg:pl-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img
              src="/logo/Logo.svg"
              alt="Nice Gadgets"
              className="h-6 w-auto"
            />
          </Link>

          <nav className="hidden sm:flex relative h-12 flex-1 gap-8">
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

        <div className="flex items-center">
          <div className="hidden sm:flex items-center h-12 border-l border-[#3B3E4A]">
            <SettingsDropdown
              onToggleTheme={toogleTheme}
              onToggleLanguage={toggleLanguage}
            />
            <NavLink
              to="/favorites"
              className="flex items-center justify-center h-full w-[48px] border-l border-[#3B3E4A]"
            >
              <div className="relative flex items-center justify-center w-full h-full group">
                <Heart className="w-5 h-5 text-[#75767F] group-hover:text-[#F1F2F9] transition-colors" />
                {favoritesCount > 0 && (
                  <span className="absolute top-[6px] right-[6px] bg-[#EB5757] text-white text-[8px] leading-[10px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-[2px]">
                    {favoritesCount}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className="relative flex items-center justify-center h-full w-[48px] border-l border-[#3B3E4A]"
            >
              <div className="relative flex items-center justify-center w-full h-full group">
                <ShoppingCart
                  className={`h-5 w-5 ${
                    location.pathname === '/cart'
                      ? 'text-[#F1F2F9]'
                      : 'text-[#75767F]'
                  } group-hover:text-[#F1F2F9] transition-colors`}
                />
                {cartCount > 0 && (
                  <span className="absolute top-[6px] right-[6px] bg-[#EB5757] text-white text-[10px] leading-[11px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[2px]">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>

            <div className="relative flex items-center justify-center h-full border-l border-[#3B3E4A]">
              {loading ? (
                <div className="w-12 h-12 flex items-center justify-center">
                  <Loader />
                </div>
              ) : user ? (
                <UserDropdown user={user} onLogout={handleLogout} />
              ) : (
                <Button
                  variant="ghost"
                  className="w-12 h-12 text-white bg-violet-600 hover:bg-violet-700 transition-transform cursor-pointer rounded-none text-xs flex items-center justify-center"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  {t('header.button.signIn')}
                </Button>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            className="sm:hidden text-[rgb(241,242,249)] ml-2"
          >
            <Menu />
          </Button>
        </div>
      </div>

      <MobileSidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        favoritesCount={favoritesCount}
        cartCount={cartCount}
        user={user}
        loading={loading}
        onLogout={handleLogout}
        onSignIn={() => setIsAuthModalOpen(true)}
        onToggleTheme={toogleTheme}
        onToggleLanguage={toggleLanguage}
      />

      {isAuthModalOpen && (
        <Modal onClose={() => setIsAuthModalOpen(false)}>
          <AuthForm onClose={() => setIsAuthModalOpen(false)} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
