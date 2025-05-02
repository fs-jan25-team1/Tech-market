import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center h-full w-[48px] hover:bg-[#1F1F1F] transition-colors cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="text-yellow-400 w-5 h-5" />
      ) : (
        <Moon className="text-blue-400 w-5 h-5" />
      )}
    </button>
  );
};
