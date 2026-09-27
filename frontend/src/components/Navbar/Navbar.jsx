import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronRight, User, Shield } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useUser } from '../../data/useUser';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Media', path: '/media' },
  { name: 'Profile', path: '/profile' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { isAdmin, isSuperAdmin } = useAdminAuth();
  const { isRegistered, userData } = useUser();
  const { isLight } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  const [currentPath, setCurrentPath] = useState(location.pathname);
  if (currentPath !== location.pathname) {
    setCurrentPath(location.pathname);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isLight
            ? isScrolled
              ? 'py-3 sm:py-3.5 bg-white/95 backdrop-blur-2xl border-b border-red-900/15 shadow-[0_4px_25px_rgba(139,21,27,0.08)]'
              : 'py-3.5 sm:py-4 bg-white/92 backdrop-blur-xl border-b border-neutral-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.04)]'
            : isScrolled
              ? 'py-3.5 sm:py-4 bg-black/90 backdrop-blur-2xl border-b border-red-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
              : 'py-4 sm:py-5 bg-gradient-to-b from-black/95 via-black/80 to-transparent border-b border-white/5'
        }`}
      >
        <div className="w-full px-3 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo - Anchored on the Far Left */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group relative focus:outline-none flex-shrink-0"
            aria-label="SAMYAK 2026 Home"
          >
            <div className={`relative w-10 h-10 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-2xl overflow-hidden p-1.5 flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
              isLight
                ? 'bg-white border border-red-500/30 shadow-[0_2px_12px_rgba(139,21,27,0.12)] group-hover:border-red-600'
                : 'border border-red-500/40 bg-neutral-950/90 shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:border-red-400 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]'
            }`}>
              <img
                src={isLight ? "/samyak-emblem-black.png" : "/samyak-emblem.png"}
                alt="Samyak Emblem"
                className={`w-full h-full object-contain filter ${
                  isLight
                    ? 'drop-shadow-[0_2px_8px_rgba(139,21,27,0.15)]'
                    : 'drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                }`}
              />
              <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <span className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-wider font-heading leading-tight flex items-center gap-1 ${
                isLight ? '!text-slate-900' : '!text-white'
              }`}>
                SAMYAK <span className="text-red-600 dark:text-red-500 text-glow-red">2026</span>
              </span>
              <span className={`text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-mono font-semibold -mt-0.5 ${
                isLight ? '!text-neutral-700' : '!text-neutral-400'
              }`}>
                KL UNIVERSITY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Centered & Spacious */}
          <nav className={`hidden lg:flex items-center gap-1 xl:gap-2 px-2.5 py-1 rounded-full backdrop-blur-xl transition-all ${
            isLight
              ? 'bg-neutral-100/95 border border-neutral-200/90 shadow-sm'
              : 'bg-neutral-950/75 border border-neutral-800/90 shadow-[0_0_25px_rgba(0,0,0,0.8)]'
          }`}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link relative px-3.5 xl:px-4.5 py-1.5 xl:py-2 tracking-wider uppercase transition-all duration-300 rounded-full text-xs xl:text-sm ${
                    isActive
                      ? '!text-white font-bold'
                      : isLight
                        ? 'text-neutral-800 hover:text-red-700 hover:bg-neutral-200/70 font-semibold'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`relative z-10 transition-colors ${isActive ? '!text-white font-bold drop-shadow' : ''}`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-red-600 rounded-full shadow-[0_0_18px_rgba(239,68,68,0.55)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons - Anchored on the Far Right */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            {/* Theme Toggle: White (Default) / Black */}
            <ThemeToggle showLabel={true} />

            {isAdmin && (
              <Link
                to="/samyakadmin/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs xl:text-sm font-mono font-bold transition-all shadow-md cursor-pointer ${
                  isSuperAdmin
                    ? isLight
                      ? 'border-amber-400/60 bg-amber-50 text-amber-950 hover:bg-amber-100 shadow-sm'
                      : 'border-amber-500/50 bg-amber-950/50 text-amber-300 hover:text-white hover:bg-amber-600/30 shadow-[0_0_18px_rgba(245,158,11,0.35)]'
                    : isLight
                      ? 'border-red-400/40 bg-red-50 text-red-950 hover:bg-red-100 shadow-sm'
                      : 'border-red-500/50 bg-red-950/50 text-red-400 hover:text-white hover:bg-red-600/30 shadow-[0_0_18px_rgba(239,68,68,0.4)]'
                }`}
                title={isSuperAdmin ? "Superadmin Access Suite" : "Admin Command Console"}
              >
                {isSuperAdmin ? <span className="text-sm">👑</span> : <Shield className="w-4 h-4 text-red-500 animate-pulse" />}
                <span>{isSuperAdmin ? 'Superadmin Suite' : 'Admin Console'}</span>
              </Link>
            )}

            {isRegistered ? (
              /* When registered / logged in: Remove register button & show prominent profile pill */
              <Link
                to="/profile"
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-all group ${
                  isLight
                    ? 'bg-neutral-100 hover:bg-neutral-200/90 border border-neutral-300 text-neutral-900 shadow-sm'
                    : 'bg-neutral-900/90 border border-red-500/40 hover:border-red-400 hover:bg-neutral-800 text-white shadow-[0_0_18px_rgba(239,68,68,0.25)]'
                }`}
                title="View SAMYAK Profile"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 overflow-hidden flex items-center justify-center text-[11px] font-mono font-bold text-white border border-red-400/60 shadow-sm flex-shrink-0">
                  {userData?.avatarUrl ? (
                    <img src={userData.avatarUrl} alt={userData.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}</span>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-xs font-mono font-bold max-w-[130px] truncate leading-tight ${
                    isLight ? 'text-neutral-800 group-hover:text-red-700' : 'text-slate-200 group-hover:text-red-400'
                  }`}>
                    {userData?.name || 'My Profile'}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 leading-none mt-0.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Fest Pass
                  </span>
                </div>
              </Link>
            ) : (
              /* When NOT registered: Show login profile icon and Register Now CTA */
              <>
                <Link
                  to="/profile"
                  className={`p-2.5 xl:p-3 rounded-full transition-all shadow-md ${
                    isLight
                      ? 'bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 hover:text-red-700'
                      : 'bg-neutral-900/90 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                  title="SAMYAK Profile"
                  aria-label="Profile"
                >
                  <User className="w-5 h-5" />
                </Link>

                <Link
                  to="/profile"
                  className="relative group overflow-hidden px-4.5 xl:px-6 py-2 xl:py-2.5 rounded-full font-heading text-xs xl:text-sm font-black tracking-wider uppercase !text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] hover:scale-105 active:scale-95 flex-shrink-0"
                >
                  <span className="relative z-10 flex items-center gap-1.5 !text-white whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-current !text-white" />
                    <span className="!text-white whitespace-nowrap">Register Now</span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle showLabel={false} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl border focus:outline-none cursor-pointer transition-colors ${
                isLight
                  ? 'bg-neutral-100 border-neutral-300 text-neutral-800 hover:text-red-700 hover:bg-neutral-200'
                  : 'bg-neutral-900 border-neutral-800 text-slate-300 hover:text-red-400'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed inset-x-0 top-[76px] sm:top-[86px] z-30 px-6 py-6 lg:hidden shadow-2xl backdrop-blur-2xl border-b ${
              isLight
                ? 'bg-white/98 border-red-900/15 text-neutral-900'
                : 'bg-black/95 border-red-500/20 text-white'
            }`}
          >
            <div className="flex flex-col space-y-2">
              <div className={`pb-4 mb-2 border-b flex items-center justify-center ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
                <img
                  src={isLight ? "/samyak-emblem.png" : "/samyak-logo-white.png"}
                  alt="SAMYAK 2026"
                  className="h-10 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                />
              </div>
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-link flex items-center justify-between px-4 py-3 rounded-xl uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-red-600 text-white font-medium shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                        : isLight
                          ? 'text-neutral-800 hover:text-red-700 hover:bg-neutral-100 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-neutral-900'
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isLight ? 'text-neutral-400' : 'text-slate-500'}`} />
                </NavLink>
              ))}

              {/* Theme Toggle row in Mobile Drawer */}
              <div className={`pt-2 pb-1 px-3 flex items-center justify-between border-t ${isLight ? 'border-neutral-200' : 'border-neutral-800/80'}`}>
                <span className={`text-xs font-mono uppercase font-semibold tracking-wider ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  Theme Mode:
                </span>
                <ThemeToggle showLabel={true} />
              </div>

              <div className={`pt-2 border-t flex flex-col gap-3 ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
                {isAdmin && (
                  <Link
                    to="/samyakadmin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full text-center py-2.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isSuperAdmin
                        ? isLight
                          ? 'text-amber-950 border border-amber-400/60 bg-amber-50 shadow-sm'
                          : 'text-amber-300 border border-amber-500/50 bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : isLight
                          ? 'text-red-950 border border-red-400/40 bg-red-50 shadow-sm'
                          : 'text-red-300 border border-red-500/50 bg-red-950/40 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                    }`}
                  >
                    {isSuperAdmin ? <span>👑</span> : <Shield className="w-3.5 h-3.5 text-red-500 animate-pulse" />}
                    <span>{isSuperAdmin ? 'Superadmin Suite' : 'Admin Console'}</span>
                  </Link>
                )}
                {isRegistered ? (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between shadow-md ${
                      isLight
                        ? 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        : 'bg-neutral-900 border border-red-500/40 text-white shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 overflow-hidden flex items-center justify-center font-bold text-xs text-white border border-red-400">
                        {userData?.avatarUrl ? (
                          <img src={userData.avatarUrl} alt={userData.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}</span>
                        )}
                      </div>
                      <div className="text-left">
                        <div className={`text-xs font-bold font-heading ${isLight ? 'text-neutral-900' : 'text-white'}`}>{userData?.name || 'SAMYAK Attendee'}</div>
                        <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Fest Pass Active
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-red-600 dark:text-red-400 font-bold">Profile →</span>
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider !text-white bg-gradient-to-r from-red-600 via-rose-500 to-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                  >
                    Sign In / Profile
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
