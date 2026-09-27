import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, Sparkles, ChevronDown, ArrowRight, Play, Ticket } from 'lucide-react';
import Countdown from '../Countdown/Countdown';

const PRIMARY_HERO_VIDEO = '/videos/samyakherosection.mp4';
const FALLBACK_HERO_VIDEO = '/videos/samyak hero section.mp4';
const POSTER_IMAGE = '/hero-bg.png';

export default function Hero() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Autoplay immediately on mount across desktop and mobile devices
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          // Fallback: start on first user interaction if browser policy requires it
          const startPlayback = () => {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener('touchstart', startPlayback);
            window.removeEventListener('click', startPlayback);
          };
          window.addEventListener('touchstart', startPlayback, { once: true });
          window.addEventListener('click', startPlayback, { once: true });
        });
    }
  }, []);

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleManualPlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  return (
    <section 
      id="hero" 
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden flex items-center justify-center select-none bg-black"
    >
      {/* ── CINEMATIC FULLSCREEN VIDEO BACKGROUND ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        poster={POSTER_IMAGE}
        className="absolute inset-0 w-full h-full object-cover object-center z-0 filter brightness-[0.88] contrast-[1.05]"
      >
        <source src={PRIMARY_HERO_VIDEO} type="video/mp4" />
        <source src={FALLBACK_HERO_VIDEO} type="video/mp4" />
        Your browser does not support HTML5 video playback.
      </video>

      {/* ── CINEMATIC VIGNETTE OVERLAYS FOR MAXIMUM READABILITY ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/75 pointer-events-none z-10" />

      {/* Cyber Ambient Volumetric Red Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/[0.12] rounded-full blur-[160px] pointer-events-none z-10" />

      {/* ── FLOATING AUDIO CONTROL BUTTON ── */}
      <button
        type="button"
        onClick={handleMuteToggle}
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2 rounded-full bg-black/80 hover:bg-red-950/90 border border-neutral-700/80 hover:border-red-500/80 text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.85)] transition-all cursor-pointer group"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-neutral-300 group-hover:text-red-400" />
            <span className="text-[11px] font-mono tracking-wider !text-neutral-300 uppercase hidden sm:inline">Sound Off</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider !text-red-300 font-bold uppercase hidden sm:inline">Sound On</span>
          </>
        )}
      </button>

      {/* Play trigger if browser initially blocked autoplay */}
      {!isPlaying && (
        <button
          type="button"
          onClick={handleManualPlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 cursor-pointer"
          title="Play Hero Video"
        >
          <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_35px_rgba(239,68,68,0.8)] hover:scale-110 transition-transform">
            <Play className="w-7 h-7 fill-white translate-x-0.5" />
          </div>
        </button>
      )}

      {/* ── FOREGROUND CONTENT CONTAINER ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pt-20 sm:pt-24 pb-8 sm:pb-12">
        
        {/* Fest Identification Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 border border-red-500/40 text-[11px] sm:text-xs font-mono !text-red-300 uppercase tracking-widest mb-3 sm:mb-4 shadow-[0_0_20px_rgba(239,68,68,0.3)] backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span className="!text-red-300 font-bold">// KL UNIVERSITY • SAMYAK 2026</span>
        </motion.div>

        {/* Monumental Hero Headline — Always Bright White & Glowing Red */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] select-none leading-none"
        >
          <span className="!text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.35)]">SAMYAK</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-400 text-glow-red">2026</span>
        </motion.h1>

        {/* Tagline — Crisp High-Contrast White */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2.5 sm:mt-3 text-[11px] min-[360px]:text-xs sm:text-sm md:text-base !text-slate-100 font-cyber max-w-2xl uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] px-3"
        >
          Where Innovation Meets Celebration • National Techno-Management Fest
        </motion.p>

        {/* ── LIVE FEST COUNTDOWN HUD ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-[340px] min-[400px]:max-w-md sm:max-w-lg mt-4 sm:mt-6 mb-4 sm:mb-6"
        >
          <Countdown className="py-0 px-0" />
        </motion.div>

        {/* ── INTERACTIVE CALL TO ACTIONS — Mobile Optimized ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0 max-w-xs sm:max-w-none"
        >
          <Link
            to="/events"
            className="w-full sm:w-auto justify-center px-7 sm:px-9 py-3 sm:py-3.5 rounded-full font-heading text-xs sm:text-sm font-black tracking-wider uppercase !text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:shadow-[0_0_40px_rgba(239,68,68,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span className="!text-white">Explore 45+ Arenas</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 !text-white" />
          </Link>

          <Link
            to="/profile"
            className="w-full sm:w-auto justify-center px-7 sm:px-9 py-3 sm:py-3.5 rounded-full font-heading text-xs sm:text-sm font-black tracking-wider uppercase !text-white bg-black/60 hover:bg-black/80 cyber-glass border border-red-500/50 hover:border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-red-400" />
            <span className="!text-white">Register Fest Pass</span>
          </Link>
        </motion.div>

        {/* ── SCROLL DOWN INDICATOR ── */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none">
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-300 font-semibold drop-shadow">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 text-red-400 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
