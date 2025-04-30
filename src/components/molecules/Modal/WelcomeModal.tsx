import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from '@/components/organisms/AuthModal/AuthModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/shared/firebase';

export const WelcomeDiscountModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wasLoggedIn, setWasLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        setWasLoggedIn(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
    if (!isAuthenticated && !wasLoggedIn && !hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('hasSeenWelcomeModal', 'true');
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [isAuthenticated, wasLoggedIn]);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <AnimatePresence>
        {!isAuthenticated && isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm "
            onClick={handleClose}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1f1f1f] p-6 rounded-2xl shadow-xl max-w-md w-[90%] text-[#F1F2F9]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-3">Welcome!</h2>
              <p className="text-[#4A4D58] mb-6">
                Register now and get{' '}
                <span className="text-[#905BFF] font-semibold">5% off</span>{' '}
                your first order!
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg bg-[#3B3E4A] hover:bg-[#4A4D58] text-white"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#905BFF] hover:bg-[#7c4aff] text-white"
                >
                  Register Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};
