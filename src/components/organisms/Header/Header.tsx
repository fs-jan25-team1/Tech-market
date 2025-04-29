import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from './MobileSidebar';
import { Modal } from '@/components/molecules/Modal/Modal';
import { AuthForm } from '@/components/molecules/SingInForm/SingUpForm/SingUpForm';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/shared/firebase';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useAppSelector } from '@/store/store';

interface HeaderProps {
  favoritesCount?: number;
  cartCount?: number;
}

const Header = ({ favoritesCount = 0, cartCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  cartCount = useAppSelector((store) => Object.keys(store.cart.items).length);
  favoritesCount = useAppSelector((store) => store.favourites.items.length);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/phones', label: 'Phones' },
    { path: '/tablets', label: 'Tablets' },
    { path: '/accessories', label: 'Accessories' },
  ];

  const isFavorites = location.pathname === '/favorites';
  const isCart = location.pathname === '/cart';

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

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-[#3B3E4A] font-[montBold]">
      <div className="w-full pl-6 pr-0 lg:pl-12 flex items-center justify-between">
        {/* Left: Logo + Navigation */}
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

        {/* Right: Icons + Burger */}
        <div className="flex items-center">
          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center h-12 border-l border-[#3B3E4A]">
            {/* Favorites */}
            <NavLink
              to="/favorites"
              className="relative flex items-center justify-center h-full border-l border-[#3B3E4A]"
            >
              <Button
                variant="ghost"
                size="icon"
                className={`flex justify-center items-center px-6 hover:scale-110 transition-transform cursor-pointer ${
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

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative flex items-center justify-center h-full border-l border-[#3B3E4A]"
            >
              <Button
                variant="ghost"
                size="icon"
                className={`flex justify-center items-center px-6 hover:scale-110 transition-transform cursor-pointer ${
                  isCart ? 'text-[#F1F2F9]' : 'text-[#75767F]'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-[10px] leading-[11px] font-bold text-white bg-[#EB5757] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[2px]">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Sign In or Log Out */}
            <div className="relative flex items-center justify-center h-full border-l border-[#3B3E4A]">
              {user ? (
                <Button
                  variant="ghost"
                  className="w-12 h-12 text-white bg-violet-600 hover:bg-violet-700 hover:scale-110 transition-transform cursor-pointer rounded-none text-xs flex items-center justify-center"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? <Loader /> : 'Log Out'}
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="w-12 h-12 text-white bg-violet-600 hover:bg-violet-700 hover:scale-110 transition-transform cursor-pointer rounded-none text-xs flex items-center justify-center"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>

          {/* Burger Button for Mobile */}
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

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        favoritesCount={favoritesCount}
        cartCount={cartCount}
        user={user}
        loading={loading}
        onLogout={handleLogout}
        onSignIn={() => setIsAuthModalOpen(true)}
      />

      {/* Sign In Modal */}
      {isAuthModalOpen && (
        <Modal onClose={() => setIsAuthModalOpen(false)}>
          <AuthForm onClose={() => setIsAuthModalOpen(false)} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
