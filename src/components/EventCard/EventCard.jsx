import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Trophy, ArrowUpRight, 
  RotateCw, Sparkles, Shield 
} from 'lucide-react';

export default function EventCard({ 
  event, 
  onSelect, 
  is3D = false, 
  isFront = true,
  onRotate 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (is3D && !isFront) {
      e.stopPropagation();
      if (onRotate) onRotate();
      return;
    }
    if (onSelect) onSelect(event);
    navigate(`/events/${event.id}`);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (is3D && !isFront) {
      if (onRotate) onRotate();
      return;
    }
    if (onSelect) onSelect(event);
    navigate(`/events/${event.id}`);
  };

  const isOpen = (event.registrationStatus || '').toLowerCase() === 'open';

  return (
    <motion.div
      layout={!is3D}
      initial={is3D ? false : { opacity: 0, y: 20 }}
      animate={is3D ? undefined : { opacity: 1, y: 0 }}
      exit={is3D ? undefined : { opacity: 0, scale: 0.95 }}
      whileHover={is3D ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`rounded-2xl overflow-hidden cursor-pointer relative group flex flex-col justify-between transition-all duration-300 select-none ${
        is3D
          ? isFront
            ? 'bg-neutral-950/95 border-2 border-red-500/70 shadow-[0_20px_50px_rgba(239,68,68,0.35)] backdrop-blur-xl'
            : 'bg-neutral-950/80 border border-neutral-800/80 shadow-2xl backdrop-blur-md hover:border-red-500/40'
          : 'glass-card-3d border border-neutral-800/90 hover:border-red-500/60'
      }`}
    >
      {/* Dynamic Specular Glass Reflection */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/[0.05] to-red-500/[0.1] ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Side Card Hover Overlay Prompt (in 3D arena) */}
      {is3D && !isFront && isHovered && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[3px] transition-all">
          <div className="px-4 py-2 rounded-full bg-red-600/95 text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_25px_rgba(239,68,68,0.9)] border border-red-400 flex items-center gap-2 transform group-hover:scale-105 transition-transform">
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
            <span>ROTATE TO FRONT</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-300 mt-2">Click anywhere to inspect</span>
        </div>
      )}

      {/* Cyber Corner Accents for Front Card */}
      {isFront && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-400 z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-400 z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-400 z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-400 z-20 pointer-events-none" />
        </>
      )}

      {/* Top Banner Image */}
      <div className={`relative ${is3D ? 'h-36 sm:h-40 md:h-42' : 'h-44 sm:h-48'} w-full overflow-hidden bg-neutral-900 flex-shrink-0`}>
        <img
          src={event.image || '/hero-bg.png'}
          alt={event.title}
          className={`w-full h-full object-cover filter contrast-110 transition-all duration-500 ${
            isFront 
              ? 'brightness-95 group-hover:scale-105 group-hover:brightness-105' 
              : 'brightness-75'
          }`}
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        
        {/* Category & Department Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-neutral-950/80 backdrop-blur-md border border-red-500/40 text-red-300 shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-red-400" />
            <span>{event.category || 'Event'}</span>
          </span>
          {event.department && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider font-semibold bg-red-950/60 border border-red-500/30 text-red-400">
              {event.department}
            </span>
          )}
        </div>

        {/* Status Pill */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold flex items-center gap-1.5 shadow-md ${
              isOpen
                ? 'bg-red-500/25 text-red-300 border border-red-500/50'
                : 'bg-neutral-800/80 text-neutral-400 border border-neutral-700'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-red-400 animate-pulse' : 'bg-neutral-500'}`} />
            <span>{event.registrationStatus || 'Live'}</span>
          </span>
        </div>

        {/* Prize Pool Tag */}
        {event.prize && (
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-950/90 border border-red-500/50 text-red-400 font-heading text-xs font-black shadow-[0_0_15px_rgba(239,68,68,0.35)] backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wide text-white">{event.prize}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-neutral-950/60">
        <div>
          {/* Club Pill if available */}
          {event.club && (
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1 truncate">
              <Shield className="w-3 h-3 text-red-500/80 flex-shrink-0" />
              <span className="truncate">{event.club}</span>
            </div>
          )}

          {/* Event Title */}
          <h3 className="text-base sm:text-lg font-black font-heading text-white tracking-wide group-hover:text-red-400 transition-colors line-clamp-1">
            {event.title}
          </h3>

          {/* Event Short Description */}
          <p className="mt-1.5 text-xs text-neutral-400 font-cyber line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>
        </div>

        {/* Schedule & Venue Meta */}
        <div className="space-y-1.5 pt-2.5 border-t border-neutral-800/80 text-[11px] text-neutral-300 font-mono">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Calendar className="w-3 h-3 text-red-400 flex-shrink-0" />
              <span className="truncate">{event.date}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-400">
              <Clock className="w-3 h-3 text-red-400 flex-shrink-0" />
              <span>{event.time}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400 truncate">
            <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2.5 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider">Entry Fee</span>
            <span className="text-xs sm:text-sm font-bold text-white font-heading tracking-wide">
              {event.fee || 'Free'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleActionClick}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-heading text-xs font-black tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
              is3D && !isFront
                ? 'bg-neutral-900/90 text-neutral-300 border border-neutral-700 hover:bg-red-600 hover:text-white'
                : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:scale-[1.03]'
            }`}
          >
            <span>{is3D && !isFront ? 'Focus Arena' : 'Details'}</span>
            {is3D && !isFront ? (
              <RotateCw className="w-3 h-3 text-red-400 group-hover:rotate-180 transition-transform" />
            ) : (
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </button>

        </div>
      </div>
    </motion.div>
  );
}
