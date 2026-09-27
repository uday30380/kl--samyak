import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ showLabel = false, className = '' }) {
  const { theme, toggleTheme, isLight } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isLight ? 'Switch to Dark Mode (Black)' : 'Switch to Light Mode (White)'}
      aria-label="Toggle application theme"
      className={`relative inline-flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md select-none ${
        isLight
          ? 'bg-neutral-100 hover:bg-neutral-200 border-red-900/20 text-neutral-800 shadow-[0_2px_10px_rgba(139,21,27,0.1)]'
          : 'bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:border-red-500/50 shadow-[0_0_15px_rgba(0,0,0,0.6)]'
      } ${className}`}
    >
      {/* Animated Icon Pill */}
      <div className="relative flex items-center justify-center">
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          {isLight ? (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
          ) : (
            <Moon className="w-4 h-4 text-red-400 fill-red-400/40 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
          )}
        </motion.div>
      </div>

      {/* Optional or Responsive Label */}
      <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${showLabel ? 'inline' : 'hidden sm:inline'}`}>
        {isLight ? (
          <span className="text-red-900 font-extrabold">WHITE</span>
        ) : (
          <span className="text-neutral-400">DARK</span>
        )}
      </span>
    </button>
  );
}
