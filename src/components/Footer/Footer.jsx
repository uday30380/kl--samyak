import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '../SocialIcons';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { isLight } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative border-t overflow-hidden transition-colors ${
      isLight ? 'bg-white border-neutral-200 text-neutral-600' : 'bg-black border-red-950/40 text-slate-400'
    }`}>
      {/* Background Cyber Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        
        {/* Main Footer Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b ${
          isLight ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          
          {/* Brand Col (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className={`w-10 h-10 rounded-xl p-1 flex items-center justify-center transition-all ${
                isLight ? 'bg-white border border-red-500/30 shadow-[0_2px_8px_rgba(139,21,27,0.12)]' : 'bg-neutral-900 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              }`}>
                <img
                  src={isLight ? "/samyak-emblem-black.png" : "/samyak-emblem.png"}
                  alt="Samyak Emblem"
                  className="w-full h-full object-contain filter"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-black tracking-widest font-heading ${
                  isLight ? '!text-slate-900' : '!text-white'
                }`}>
                  SAMYAK <span className="text-red-600 dark:text-red-500 text-glow-red">2026</span>
                </span>
                <span className={`text-[10px] uppercase tracking-[0.3em] font-cyber font-semibold -mt-1 ${
                  isLight ? 'text-red-700' : 'text-red-400'
                }`}>
                  KL UNIVERSITY
                </span>
              </div>
            </Link>

            <p className={`text-xs sm:text-sm font-cyber leading-relaxed max-w-sm ${
              isLight ? 'text-neutral-600' : 'text-slate-400'
            }`}>
              India&apos;s premier National Level Techno-Management Fest organized by KL Deemed to be University. Bringing together 25,000+ engineers, innovators, and creators across the nation.
            </p>

            <div className={`text-[11px] font-mono tracking-wider font-bold ${
              isLight ? 'text-red-700' : 'text-red-400/80'
            }`}>
              WHERE INNOVATION MEETS CELEBRATION
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs font-cyber">
            <h4 className={`font-heading font-bold uppercase tracking-wider text-sm ${
              isLight ? '!text-slate-900 font-extrabold' : '!text-white'
            }`}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Home Arena', path: '/' },
                { name: 'About SAMYAK', path: '/about' },
                { name: 'Flagship Events', path: '/events' },
                { name: 'Festival Schedule', path: '/schedule' },
                { name: 'Gallery & Highlights', path: '/gallery' },
                { name: 'Delegate Profile', path: '/profile' },
                { name: 'Pay Event Fee', path: '/payment' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`transition-colors flex items-center gap-1.5 ${
                      isLight ? 'text-neutral-600 hover:text-red-700 font-medium' : 'text-slate-400 hover:text-red-300'
                    }`}
                  >
                    <span className={isLight ? "text-red-600" : "text-neutral-600"}>›</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Arenas */}
          <div className="space-y-3 text-xs font-cyber">
            <h4 className={`font-heading font-bold uppercase tracking-wider text-sm ${
              isLight ? '!text-slate-900 font-extrabold' : '!text-white'
            }`}>
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                'Code Storm Hackathon',
                'RoboWars Cyber Arena',
                'Step Up Dance Battle',
                'Autonomous Drone Nexus',
                'Generative AI Masterclass',
                'Valorant Esports Clash',
                'ProNite Celebrity Concert',
              ].map((c) => (
                <li key={c} className={`transition-colors cursor-pointer ${
                  isLight ? 'text-neutral-600 hover:text-red-700 font-medium' : 'text-neutral-400 hover:text-white'
                }`}>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Location & Help */}
          <div className="space-y-3 text-xs font-cyber">
            <h4 className={`font-heading font-bold uppercase tracking-wider text-sm ${
              isLight ? '!text-slate-900 font-extrabold' : '!text-white'
            }`}>
              KL Campus
            </h4>
            <div className={`space-y-2.5 ${isLight ? 'text-neutral-600 font-medium' : 'text-slate-400'}`}>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Green Fields, Vaddeswaram, Andhra Pradesh, 522502</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="truncate">samyak2026@kluniversity.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>+91 863 2399999</span>
              </div>
            </div>

            {/* Back to top button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  isLight
                    ? 'bg-neutral-100 border border-neutral-300 text-red-800 hover:bg-neutral-200 hover:border-red-500 font-bold shadow-sm'
                    : 'bg-neutral-900 border border-neutral-800 text-red-300 hover:text-white hover:border-red-500/50 hover:bg-red-600/20'
                }`}
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* ── BOTTOM CREDIT STRIP ─────────────────────────────────── */}
        <div className={`mt-10 pt-6 border-t ${isLight ? 'border-neutral-200' : 'border-neutral-900/60'}`}>

          {/* Glassmorphic credit card */}
          <div className={`relative flex flex-col md:flex-row items-center justify-between gap-5 px-5 py-4 rounded-2xl backdrop-blur-md overflow-hidden ${
            isLight
              ? 'bg-neutral-50/90 border border-neutral-200/90 shadow-sm'
              : 'bg-neutral-950/80 border border-neutral-800/70'
          }`}>

            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            {/* Left: Copyright */}
            <p className={`text-[11px] font-mono text-center md:text-left tracking-wide ${
              isLight ? 'text-neutral-600' : 'text-neutral-500'
            }`}>
              © 2026 <span className={`${isLight ? 'text-slate-900' : 'text-neutral-300'} font-semibold`}>SAMYAK</span> · KL Deemed to be University · All Rights Reserved.
            </p>

            {/* Centre: Developer Credits */}
            <div
              id="samyak-lead-architect-credit"
              className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-neutral-400"
            >
              {/* Lead Platform Architect: Balaram */}
              <span className={`uppercase tracking-widest text-[9px] ${isLight ? 'text-neutral-500' : 'text-neutral-600'}`}>Lead Platform Architect</span>
              <a
                id="samyak-author-link"
                href="https://github.com/balaram753"
                target="_blank"
                rel="noreferrer"
                className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 ${
                  isLight
                    ? 'bg-red-50 border-red-200 hover:border-red-400 hover:bg-red-100 shadow-sm'
                    : 'bg-red-950/40 border border-red-500/25 hover:border-red-500/60 hover:bg-red-950/70'
                }`}
              >
                {/* Avatar badge */}
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-[9px] font-black text-white flex-shrink-0">
                  B
                </span>
                <span className={`font-bold transition-colors ${isLight ? 'text-red-800 group-hover:text-red-950' : 'text-red-400 group-hover:text-red-300'}`}>Balaram</span>
                <span className={`text-[9px] transition-colors ${isLight ? 'text-red-600/80 group-hover:text-red-800' : 'text-red-500/60 group-hover:text-red-400/80'}`}>@balaram753</span>
              </a>

              {/* Divider */}
              <span className={`${isLight ? 'text-neutral-300' : 'text-neutral-700'} text-base leading-none`}>·</span>

              {/* UI by Uday Kiran Vempati */}
              <span className={`uppercase tracking-widest text-[9px] ${isLight ? 'text-neutral-500' : 'text-neutral-600'}`}>UI Experience</span>
              <a
                href="https://udaykiranportfolio.web.app/"
                target="_blank"
                rel="noreferrer"
                className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 ${
                  isLight
                    ? 'bg-sky-50 border-sky-200 hover:border-sky-400 hover:bg-sky-100 shadow-sm'
                    : 'bg-neutral-900/80 border border-neutral-700/40 hover:border-sky-500/50 hover:bg-sky-950/40'
                }`}
              >
                {/* Avatar badge */}
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-[9px] font-black text-white flex-shrink-0">
                  U
                </span>
                <span className={`font-bold transition-colors ${isLight ? 'text-sky-900 group-hover:text-sky-950' : 'text-neutral-200 group-hover:text-sky-300'}`}>Uday Kiran Vempati</span>
                <svg className={`w-2.5 h-2.5 transition-colors flex-shrink-0 ${isLight ? 'text-sky-600 group-hover:text-sky-800' : 'text-neutral-600 group-hover:text-sky-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Right: Social Icons */}
            <div className="flex items-center gap-2">
              {[
                { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                { icon: LinkedinIcon,  href: 'https://linkedin.com',  label: 'LinkedIn'  },
                { icon: TwitterIcon,   href: 'https://x.com',         label: 'X'         },
                { icon: YoutubeIcon,   href: 'https://youtube.com',   label: 'YouTube'   },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className={`p-2 rounded-xl border transition-all duration-300 ${
                      isLight
                        ? 'bg-white border-neutral-300 text-neutral-600 hover:text-red-600 hover:border-red-400 hover:bg-neutral-50 shadow-sm'
                        : 'bg-neutral-900/80 border border-neutral-800/70 text-neutral-500 hover:text-red-400 hover:border-red-500/40 hover:bg-red-950/30'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>

          </div>{/* end glassmorphic card */}
        </div>{/* end bottom credit strip */}

      </div>
    </footer>
  );
}
