import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, ArrowRight, LayoutGrid, Box, 
  Filter, RefreshCw, ChevronDown, Check, X,
  SlidersHorizontal, Radio
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { EVENTS_DATA, EVENT_CATEGORIES } from '../../data/events';
import { useSiteContent } from '../../context/SiteContentContext';
import EventCard from '../EventCard/EventCard';
import Events3DArena from './Events3DArena';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'prize-desc', label: 'Prize: High to Low' },
  { value: 'prize-asc', label: 'Prize: Low to High' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export default function EventsSection({ 
  limit = null, 
  showFilter = true, 
  showViewAll = true,
  isHomePage = false,
}) {
  const { events: siteEvents, departments } = useSiteContent();
  const allEvents = siteEvents && siteEvents.length > 0 ? siteEvents : EVENTS_DATA;
  const navigate = useNavigate();

  // Active Filter States
  const [activeDept, setActiveDept] = useState('All');
  const [activeClub, setActiveClub] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Dropdown States
  const [subFilterDropdownOpen, setSubFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const subFilterRef = useRef(null);
  const sortRef = useRef(null);
  
  // 3D Arena mode toggle
  const [viewMode, setViewMode] = useState(isHomePage ? '3d' : 'grid');


  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (subFilterRef.current && !subFilterRef.current.contains(e.target)) {
        setSubFilterDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Find active department object
  const currentDeptObj = useMemo(() => {
    if (activeDept === 'All') return null;
    return departments?.find(
      (d) => d.code.toLowerCase() === activeDept.toLowerCase() || d.id === activeDept.toLowerCase()
    ) || null;
  }, [departments, activeDept]);

  // Handle department selection
  const handleSelectDepartment = (deptCode) => {
    setActiveDept(deptCode);
    setActiveClub('All');
    setSubFilterDropdownOpen(false);
  };

  // Helper to parse prize amount for sorting
  const parsePrize = (prizeStr) => {
    if (!prizeStr) return 0;
    const num = prizeStr.replace(/[^0-9]/g, '');
    return num ? parseInt(num, 10) : 0;
  };

  // Filter logic: Department + Sub-filter (Club) + Category + Search + Sort
  const filteredEvents = useMemo(() => {
    let result = [...allEvents];

    // 1. Filter by Department
    if (activeDept !== 'All') {
      const qDept = activeDept.trim().toLowerCase();
      result = result.filter((e) => {
        const d = (e.department || '').trim().toLowerCase();
        const tagMatch = e.tags && e.tags.some((t) => t.trim().toLowerCase() === qDept);
        return d === qDept || tagMatch;
      });

      // 2. Sub-filter / Club
      if (activeClub !== 'All') {
        const qClub = activeClub.trim().toLowerCase();
        result = result.filter((e) => {
          const c = (e.club || '').trim().toLowerCase();
          if (c) {
            return c === qClub || c.includes(qClub) || qClub.includes(c);
          }
          return (e.title || '').toLowerCase().includes(qClub);
        });
      }
    }

    // 3. Category Filter
    if (activeCategory !== 'All') {
      const qCat = activeCategory.trim().toLowerCase();
      result = result.filter((e) => (e.category || '').trim().toLowerCase() === qCat);
    }

    // 4. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.category && e.category.toLowerCase().includes(q)) ||
          (e.department && e.department.toLowerCase().includes(q)) ||
          (e.club && e.club.toLowerCase().includes(q)) ||
          (e.shortDescription && e.shortDescription.toLowerCase().includes(q)) ||
          (e.tags && e.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // 5. Sorting
    if (sortBy === 'prize-desc') {
      result.sort((a, b) => parsePrize(b.prize) - parsePrize(a.prize));
    } else if (sortBy === 'prize-asc') {
      result.sort((a, b) => parsePrize(a.prize) - parsePrize(b.prize));
    } else if (sortBy === 'newest') {
      result.reverse();
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    if (limit) {
      return result.slice(0, limit);
    }

    return result;
  }, [allEvents, activeDept, activeClub, activeCategory, searchQuery, sortBy, limit]);

  const activeSortLabel = SORT_OPTIONS.find((s) => s.value === sortBy)?.label || 'Featured';
  const hasActiveFilters = activeDept !== 'All' || activeClub !== 'All' || activeCategory !== 'All' || searchQuery !== '';

  const handleResetFilters = () => {
    setActiveDept('All');
    setActiveClub('All');
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="events" className="relative py-20 sm:py-28 bg-black overflow-hidden select-none">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/[0.07] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-red-600/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =====================================================================
            SECTION HEADER & COMMAND TOOLBAR
            ===================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full cyber-glass border border-red-500/30 text-xs font-mono text-red-400 uppercase tracking-widest mb-3 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>// SAMYAK ARENAS 2026</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight uppercase">
              FLAGSHIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-400 text-glow-red">EVENTS &amp; ARENAS</span>
            </h2>

            <p className="mt-2 text-sm sm:text-base text-neutral-400 font-cyber max-w-xl leading-relaxed">
              Filter by academic department, specialized clubs, or festival categories across all 45+ competitive arenas.
            </p>
          </div>

          {/* Quick Controls: Telemetry Pill, View Switcher & Cyber Search */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Live Count Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-300">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>
                <strong className="text-white font-bold">{filteredEvents.length}</strong> Arenas Active
              </span>
            </div>

            {/* View Mode Switcher (Visible on Home Page) */}
            {isHomePage && (
              <div className="flex items-center p-1 rounded-xl bg-neutral-900/80 border border-neutral-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.6)] font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D ARENA</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.6)] font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>GRID</span>
                </button>
              </div>
            )}

            {/* Cyber Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search CSE, RPA, bots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 font-cyber focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 shadow-inner transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* =====================================================================
            UNIFIED FILTER COMMAND DECK
            ===================================================================== */}
        {showFilter && (
          <div className="space-y-3 mb-8">
            
            {/* ROW 1: Academic Departments Filter Strip */}
            <div className="relative">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                {/* All Departments Button */}
                <button
                  type="button"
                  onClick={() => handleSelectDepartment('All')}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-black tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                    activeDept === 'All'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-400 scale-[1.02]'
                      : 'bg-neutral-950/80 text-neutral-400 border border-neutral-800/90 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <span>All Departments</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeDept === 'All' ? 'bg-black/40 text-white' : 'bg-neutral-900 text-neutral-400'}`}>
                    45+
                  </span>
                </button>

                {/* Dynamic Department Pills */}
                {departments?.map((dept) => {
                  const isActive = activeDept.toLowerCase() === dept.code.toLowerCase();
                  return (
                    <button
                      key={dept.id || dept.code}
                      type="button"
                      onClick={() => handleSelectDepartment(dept.code)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-heading font-black tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${
                        isActive
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-400 scale-[1.02]'
                          : 'bg-neutral-950/80 text-neutral-400 border border-neutral-800/90 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <span>{dept.code}</span>
                      {dept.clubs?.length > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-black/40 text-white' : 'bg-neutral-900 text-neutral-400'}`}>
                          {dept.clubs.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ROW 2: Balanced Command Deck (Categories + Sub-Filter + Sort + Reset) */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-md shadow-lg">
              
              {/* Left: Fest Category Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider pl-1 pr-1 flex-shrink-0">
                  CATEGORY:
                </span>
                {EVENT_CATEGORIES.map((cat) => {
                  const isCatActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                        isCatActive
                          ? 'bg-neutral-800 text-white font-bold border border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                          : 'bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 border border-transparent hover:border-neutral-800'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Right: Sub-Filter + Sort Dropdown + Reset Action */}
              <div className="flex items-center gap-2 ml-auto">
                
                {/* Department Club Sub-Filter (Appears seamlessly when a department is active) */}
                {activeDept !== 'All' && currentDeptObj?.clubs?.length > 0 && (
                  <div className="relative" ref={subFilterRef}>
                    <button
                      type="button"
                      onClick={() => setSubFilterDropdownOpen((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/80 hover:border-red-500/60 text-xs font-mono shadow-sm transition-all cursor-pointer"
                    >
                      <span className="text-neutral-400">Club:</span>
                      <span className="font-bold text-red-400 max-w-[130px] truncate">
                        {activeClub === 'All' ? `All ${currentDeptObj.code}` : activeClub}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${subFilterDropdownOpen ? 'rotate-180 text-red-500' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {subFilterDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-1.5 z-50 min-w-[240px] max-w-sm rounded-xl bg-neutral-950 border border-neutral-700/80 shadow-[0_12px_32px_rgba(0,0,0,0.9)] py-1.5 overflow-hidden text-left"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActiveClub('All');
                              setSubFilterDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-mono flex items-center justify-between transition-colors ${
                              activeClub === 'All'
                                ? 'bg-neutral-800/90 text-white font-bold border-l-2 border-red-500'
                                : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                            }`}
                          >
                            <span>All {currentDeptObj.code} Arenas</span>
                            {activeClub === 'All' && <Check className="w-3.5 h-3.5 text-red-500" />}
                          </button>

                          <div className="my-1 border-t border-neutral-800" />

                          {currentDeptObj.clubs.map((club) => {
                            const isClubActive = activeClub.trim().toLowerCase() === club.trim().toLowerCase();
                            return (
                              <button
                                key={club}
                                type="button"
                                onClick={() => {
                                  setActiveClub(club);
                                  setSubFilterDropdownOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-xs font-mono flex items-center justify-between transition-colors ${
                                  isClubActive
                                    ? 'bg-neutral-800/90 text-white font-bold border-l-2 border-red-500'
                                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                                }`}
                              >
                                <span className="truncate pr-2">{club}</span>
                                {isClubActive && <Check className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Sort Dropdown */}
                <div className="relative" ref={sortRef}>
                  <button
                    type="button"
                    onClick={() => setSortDropdownOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/80 hover:border-red-500/60 text-xs font-mono shadow-sm transition-all cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
                    <span className="text-neutral-400 hidden xs:inline">Sort:</span>
                    <span className="font-bold text-white">{activeSortLabel}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180 text-red-500' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {sortDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1.5 z-50 min-w-[190px] rounded-xl bg-neutral-950 border border-neutral-700/80 shadow-[0_12px_32px_rgba(0,0,0,0.9)] py-1.5 overflow-hidden text-left"
                      >
                        {SORT_OPTIONS.map((opt) => {
                          const isSelected = sortBy === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setSortBy(opt.value);
                                setSortDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs font-mono flex items-center justify-between transition-colors ${
                                isSelected
                                  ? 'bg-neutral-800/90 text-white font-bold border-l-2 border-red-500'
                                  : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-red-500" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Reset Filters Button */}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    title="Reset all filters"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-500/40 text-xs font-mono transition-colors cursor-pointer shadow-sm"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}

              </div>

            </div>

          </div>
        )}

        {/* =====================================================================
            ARENA VIEWPORT: 3D HOLOGRAPHIC ARENA OR RESPONSIVE GRID
            ===================================================================== */}
        {filteredEvents.length > 0 ? (
          isHomePage && viewMode === '3d' ? (
            <Events3DArena
              events={filteredEvents}
              onSelectEvent={(ev) => navigate(`/events/${ev.id}`)}
            />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onSelect={(ev) => navigate(`/events/${ev.id}`)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )
        ) : (
          /* High-Tech Empty State */
          <div className="py-20 text-center cyber-card rounded-3xl border border-dashed border-red-500/30 max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 mx-auto flex items-center justify-center">
              <Filter className="w-6 h-6 text-red-400" />
            </div>
            
            <h3 className="text-xl font-heading font-black text-white uppercase tracking-wide">
              No Arenas Match Active Telemetry
            </h3>

            <p className="text-neutral-400 font-cyber text-xs sm:text-sm px-6">
              No matching events found for {activeClub !== 'All' ? `club "${activeClub}"` : activeDept !== 'All' ? `department "${activeDept}"` : 'the selected criteria'}.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              {activeClub !== 'All' && (
                <button
                  type="button"
                  onClick={() => setActiveClub('All')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
                >
                  View All {activeDept} Arenas
                </button>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            FLAGSHIP VIEW ALL CTA
            ===================================================================== */}
        {showViewAll && limit && (
          <div className="mt-14 sm:mt-18 text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-heading text-xs sm:text-sm font-black tracking-widest uppercase text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-500 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] border border-red-400/50 hover:scale-105 transition-all group"
            >
              <span>VIEW ALL 45+ SAMYAK EVENTS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
