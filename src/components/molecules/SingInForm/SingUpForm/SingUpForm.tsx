import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/shared/firebase';
import { Loader } from '@/components/atoms/Loader/Loader';

interface AuthFormProps {
  onClose: () => void;
}

export const AuthForm = ({ onClose }: AuthFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isSignInMode) {
      if (firstName.length < 3) {
        setError('First name must be at least 3 characters long.');
        setLoading(false);
        return;
      }
      if (lastName.length < 2) {
        setError('Last name must be at least 2 characters long.');
        setLoading(false);
        return;
      }
    }

    try {
      if (isSignInMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setError(null);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignInMode(!isSignInMode);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-6 bg-[#1f1f1f] rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-white text-center">
        {isSignInMode ? 'Sign In' : 'Sign Up'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isSignInMode && (
          <>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="p-3 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="p-3 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="p-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all"
          disabled={loading}
        >
          {loading ? <Loader /> : isSignInMode ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <p className="text-sm text-gray-400 text-center">
        {isSignInMode ? (
          <>
            Don't have an account?{' '}
            <button
              onClick={toggleMode}
              className="text-violet-400 hover:underline ml-1"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={toggleMode}
              className="text-violet-400 hover:underline ml-1"
            >
              Sign In
            </button>
          </>
        )}
      </p>
    </div>
  );
};
