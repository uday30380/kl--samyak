import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Calendar, Clock,
  MapPin, Trophy, ArrowUpRight, Play, Pause,
  Sparkles, Shield, Radio, Zap
} from 'lucide-react';

const CATEGORY_COLORS = {
  technical:    { pill: 'bg-blue-500/20 border-blue-500/40 text-blue-300',    glow: 'rgba(59,130,246,0.25)' },
  cultural:     { pill: 'bg-violet-500/20 border-violet-500/40 text-violet-300', glow: 'rgba(139,92,246,0.25)' },
  gaming:       { pill: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300', glow: 'rgba(16,185,129,0.25)' },
  entertainment:{ pill: 'bg-amber-500/20 border-amber-500/40 text-amber-300', glow: 'rgba(245,158,11,0.25)' },
  workshops:    { pill: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',    glow: 'rgba(6,182,212,0.25)' },
  competitions: { pill: 'bg-rose-500/20 border-rose-500/40 text-rose-300',    glow: 'rgba(244,63,94,0.25)' },
};

function getCat(category) {
  return CATEGORY_COLORS[(category || '').toLowerCase()] || CATEGORY_COLORS.technical;
}

const SLIDE_DURATION = 6000;

export default function EventShowcase({ events, onSelectEvent }) {
  const [current, setCurrent]           = useState(0);
  const [prev, setPrev]                 = useState(null);
  const [direction, setDirection]       = useState(1); // 1 = next, -1 = prev
  const [autoPlay, setAutoPlay]         = useState(true);
  const [progress, setProgress]         = useState(0);
  const progressStartRef                = useRef(null);

  const total = events?.length || 0;

  const goTo = useCallback((idx, dir) => {
    const next = ((idx % total) + total) % total;
    setDirection(dir);
    setPrev(current);
    setCurrent(next);
    setProgress(0);
  }, [current, total]);

  const goNext = useCallback(() => goTo(current + 1, 1),  [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Progress bar animation (RAF-based)
  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    let animId;
    progressStartRef.current = performance.now() - (progress * SLIDE_DURATION);

    const tick = (now) => {
      const elapsed = now - progressStartRef.current;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(pct);
      if (pct < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        goNext();
      }
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, current, total]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input,textarea')) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  if (total === 0) return null;

  const ev     = events[current];
  const cat    = getCat(ev.category);
  const isOpen = (ev.registrationStatus || '').toLowerCase() === 'open';

  // Cinematic slide variants
  const bgVariants = {
    enter: (dir) => ({ opacity: 0, scale: 1.06, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
    exit:  (dir) => ({ opacity: 0, scale: 0.96, x: dir > 0 ? -40 : 40, transition: { duration: 0.45, ease: 'easeIn' } }),
  };

  const panelVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
    exit:  { opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl"
      style={{ minHeight: '560px', height: 'clamp(520px, 68vh, 720px)' }}
    >

      {/* ── CINEMATIC BACKGROUND ── */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={`bg-${current}`}
          custom={direction}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={ev.image || '/hero-bg.png'}
            alt={ev.title}
            className="w-full h-full object-cover scale-[1.03]"
            style={{ filter: 'brightness(0.32) saturate(1.4)' }}
          />
          {/* Dual-sided vignette for cinematic look */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/40" />

          {/* Category tinted atmospheric glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 70% 60% at 35% 55%, ${cat.glow} 0%, transparent 70%)` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── THUMBNAIL FILMSTRIP (left edge) ── */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 hidden md:flex">
        {events.slice(0, Math.min(6, total)).map((ev2, idx) => (
          <button
            key={ev2.id}
            type="button"
            onClick={() => goTo(idx, idx > current ? 1 : -1)}
            className={`relative w-14 h-10 rounded-xl overflow-hidden transition-all duration-300 border-2 cursor-pointer flex-shrink-0 ${
              idx === current
                ? 'border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.6)] scale-110'
                : 'border-neutral-700/60 opacity-50 hover:opacity-80 hover:border-neutral-500'
            }`}
          >
            <img src={ev2.image || '/hero-bg.png'} alt={ev2.title} className="w-full h-full object-cover" />
            {idx === current && (
              <div className="absolute inset-0 bg-red-500/20" />
            )}
          </button>
        ))}
      </div>

      {/* ── MAIN CONTENT PANEL ── */}
      <div className="relative z-20 h-full flex flex-col justify-end px-6 sm:px-10 md:px-16 lg:pl-28 pb-8 sm:pb-12">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={`panel-${current}`}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-w-2xl"
          >

            {/* Meta badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {/* Live status */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${
                isOpen
                  ? 'bg-red-500/20 border-red-500/50 text-red-300'
                  : 'bg-neutral-700/50 border-neutral-600 text-neutral-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-red-400 animate-pulse' : 'bg-neutral-500'}`} />
                {ev.registrationStatus || 'Registration Closed'}
              </span>

              {/* Category */}
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${cat.pill}`}>
                <Sparkles className="w-3 h-3" />
                {ev.category}
              </span>

              {/* Department */}
              {ev.department && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-white/10 border border-white/20 text-white/80">
                  {ev.department}
                </span>
              )}

              {/* Club */}
              {ev.club && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-neutral-800/80 border border-neutral-700/60 text-neutral-300">
                  <Shield className="w-2.5 h-2.5 text-red-400" />
                  {ev.club}
                </span>
              )}
            </div>

            {/* Event Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight uppercase leading-none mb-3"
              style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}
            >
              {ev.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-300 font-cyber leading-relaxed line-clamp-2 mb-5 max-w-xl">
              {ev.shortDescription}
            </p>

            {/* Meta row: date / time / venue */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-sm font-mono text-neutral-300">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-400 flex-shrink-0" />
                {ev.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
                {ev.time}
              </span>
              <span className="flex items-center gap-2 truncate max-w-[280px]">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="truncate">{ev.venue}</span>
              </span>
            </div>

            {/* Prize + Fee + CTA row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Prize Chip */}
              {ev.prize && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/60 border border-amber-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-black font-heading text-amber-300 tracking-wider">{ev.prize}</span>
                </div>
              )}

              {/* Entry Fee */}
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Entry Fee</span>
                <span className="text-base font-black font-heading text-white tracking-wide">{ev.fee || 'Free'}</span>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => onSelectEvent(ev)}
                className="ml-auto sm:ml-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-heading font-black text-sm tracking-widest uppercase text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-500 border border-red-400/50 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Arena</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── NAVIGATOR ARROWS ── */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous event"
        className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 border border-white/10 hover:bg-red-600/80 hover:border-red-400 text-white backdrop-blur-md transition-all duration-300 cursor-pointer group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next event"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 border border-white/10 hover:bg-red-600/80 hover:border-red-400 text-white backdrop-blur-md transition-all duration-300 cursor-pointer group"
      >
        <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* ── TOP-RIGHT: Event Counter + Auto-play ── */}
      <div className="absolute top-5 right-5 z-30 flex items-center gap-3">
        {/* Counter */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-white/70 backdrop-blur-md">
          <Radio className="w-3 h-3 text-red-400 animate-pulse" />
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="font-bold text-red-300"
            >
              {String(current + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <span className="text-neutral-500">/ {String(total).padStart(2, '0')}</span>
        </div>

        {/* Auto-play toggle */}
        <button
          type="button"
          onClick={() => setAutoPlay((p) => !p)}
          className={`p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
            autoPlay
              ? 'bg-red-500/25 border-red-500/50 text-red-300'
              : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white'
          }`}
          aria-label="Toggle autoplay"
        >
          {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ── PROGRESS BAR (top) ── */}
      {autoPlay && total > 1 && (
        <div className="absolute top-0 left-0 right-0 z-40 h-[3px] bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* ── DOT SCRUBBER (bottom center) ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {events.slice(0, Math.min(10, total)).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goTo(idx, idx > current ? 1 : -1)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              idx === current
                ? 'w-8 h-2 bg-red-500 shadow-[0_0_10px_#ef4444]'
                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* ── FEATURED BADGE (top-left) ── */}
      {ev.featured && (
        <div className="absolute top-5 left-4 md:left-24 z-30">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            <Zap className="w-3 h-3" />
            Featured Arena
          </div>
        </div>
      )}

    </div>
  );
}
