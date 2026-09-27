import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Trophy, Users, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../../context/SiteContentContext';
import { useTheme } from '../../context/ThemeContext';

const DEFAULT_STAT_ICONS = [Users, Trophy, Globe, Zap];
const DEFAULT_PILLAR_ICONS = [Cpu, Zap, ShieldCheck];

function parseStatValue(valStr) {
  if (typeof valStr !== 'string') {
    return { prefix: '', target: Number(valStr) || 0, suffix: '', hasComma: false, isIndian: false };
  }
  
  const prefixMatch = valStr.match(/^[^0-9]*/);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  
  const suffixMatch = valStr.match(/[^0-9,.]*$/);
  const suffix = suffixMatch ? suffixMatch[0] : '';
  
  const numPart = valStr.slice(prefix.length, valStr.length - suffix.length);
  const cleanNum = parseFloat(numPart.replace(/,/g, '')) || 0;
  
  const isIndian = prefix.includes('₹') || (numPart.includes(',') && numPart.split(',')[1]?.length === 2);
  const hasComma = numPart.includes(',');
  
  return {
    prefix,
    target: cleanNum,
    suffix,
    hasComma,
    isIndian
  };
}

function CounterValue({ value, duration = 2.2, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(() => {
    const parsed = parseStatValue(value);
    if (!parsed.target) return value;
    return `${parsed.prefix}0${parsed.suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    const parsed = parseStatValue(value);
    if (!parsed.target) {
      setDisplayValue(value);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // easeOutExpo easing curve for a smooth deceleration towards final count
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentNum = Math.floor(easeProgress * parsed.target);

        let formattedNum = currentNum.toString();
        if (parsed.isIndian) {
          formattedNum = currentNum.toLocaleString('en-IN');
        } else if (parsed.hasComma) {
          formattedNum = currentNum.toLocaleString('en-US');
        }

        setDisplayValue(`${parsed.prefix}${formattedNum}${parsed.suffix}`);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, duration, delay]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function AboutSection({ showLink = true }) {
  const { aboutContent } = useSiteContent();
  const { isLight } = useTheme();

  const badge = aboutContent?.badge || 'The National Phenomenon';
  const rawLogo = aboutContent?.logoUrl;
  const logoUrl = isLight
    ? (!rawLogo || rawLogo === '/samyak-logo-white.png' || rawLogo.includes('samyak-logo-white') ? '/samyak-logo-black.png' : rawLogo)
    : (rawLogo || '/samyak-logo-white.png');
  const title = aboutContent?.title || 'ABOUT SAMYAK 2026';
  const subtitle = aboutContent?.subtitle || 'SAMYAK is the premier annual National Level Techno-Management Fest of Koneru Lakshmaiah Education Foundation (KL University). Born as a beacon of student-driven ambition, it unites visionary engineers, artists, strategists, and gamers in a 3-day immersive odyssey.';
  const stats = aboutContent?.stats || [];
  const pillars = aboutContent?.pillars || [];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      {/* Background Cyber Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full cyber-glass border border-red-500/30 text-xs font-mono text-red-400 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            {badge}
          </div>

          {/* Official Full SAMYAK Brand Identity Logo */}
          <div className="mb-6">
            <img
              src={logoUrl}
              alt="Official SAMYAK 2026 Brand Logo"
              className={`w-72 sm:w-96 md:w-[440px] h-auto object-contain filter ${
                isLight ? 'drop-shadow-[0_4px_16px_rgba(139,21,27,0.15)]' : 'drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]'
              }`}
            />
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight leading-tight uppercase">
            {title.includes('SAMYAK') ? (
              <>
                {title.split('SAMYAK')[0]} <span className="text-red-500 text-glow-red">SAMYAK {title.split('SAMYAK')[1] || '2026'}</span>
              </>
            ) : (
              title
            )}
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-cyber leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {stats.map((stat, idx) => {
            const Icon = DEFAULT_STAT_ICONS[idx % DEFAULT_STAT_ICONS.length];
            return (
              <motion.div
                key={stat.label || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="cyber-card p-6 rounded-2xl relative overflow-hidden group hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-red-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    METRIC #0{idx + 1}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-red-400 mb-1 tracking-tight">
                  <CounterValue value={stat.value} duration={2.2} delay={idx * 0.15} />
                </div>
                <div className="text-xs sm:text-sm font-cyber text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Asymmetrical 3-Column Pillar Feature */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = DEFAULT_PILLAR_ICONS[idx % DEFAULT_PILLAR_ICONS.length];
            return (
              <motion.div
                key={pillar.title || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="cyber-card p-8 rounded-2xl border border-red-500/30 hover:border-red-500/60 relative flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center text-red-400 mb-6 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-cyber leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs font-mono text-red-400">
                  <span>SYSTEM PILLAR 0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-red-500/50" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Learn More Action */}
        {showLink && (
          <div className="text-center pt-6">
            <Link
              to="/about"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                if (window.__lenis) {
                  window.__lenis.scrollTo(0, { immediate: true });
                }
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-sm font-heading font-black tracking-widest uppercase text-red-400 hover:text-white border border-red-500/40 hover:border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300 group cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>DISCOVER THE FULL SAMYAK LEGACY &amp; LEADERSHIP</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-red-500 group-hover:text-white" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
