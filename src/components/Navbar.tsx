import React, { useState, useEffect } from 'react';
import { Cpu, Calendar, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenBooking: (instrumentName?: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onScrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { language, toggleLanguage, t, isZh } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.capabilities, id: 'capabilities' },
    { label: t.nav.workbench, id: 'workbench' },
    { label: t.nav.equipment, id: 'equipment' },
    { label: t.nav.publications, id: 'publications' },
    { label: t.nav.team, id: 'team' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-white/90 dark:bg-[#080B11]/90 backdrop-blur-md border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-black/40'
          : 'bg-white/75 dark:bg-[#080B11]/70 backdrop-blur-sm border-slate-200/50 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100 group"
        >
          <div className="w-8 h-8 rounded border border-cyan-500/40 bg-cyan-500/10 dark:bg-cyan-950/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-500 transition-colors">
            <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
            {t.nav.brand}
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer py-1"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions + theme switch + language switch */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switch Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer text-xs font-semibold"
            aria-label={isZh ? 'Switch to English' : '切換至繁體中文'}
            title={isZh ? 'Switch to English' : '切換至繁體中文'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="tracking-wide">{language === 'en' ? '繁中' : 'EN'}</span>
          </button>

          {/* Light/Night Theme Mode Switch Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            aria-label={isDark ? t.nav.switchThemeLight : t.nav.switchThemeDark}
            title={isDark ? t.nav.switchThemeLight : t.nav.switchThemeDark}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition-all rounded whitespace-nowrap cursor-pointer shadow-sm shadow-cyan-500/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.nav.reserveAccess}</span>
          </button>

          {/* Tablet & Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0E17] px-6 py-4 space-y-3 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2.5">
            {/* Language Switch row */}
            <button
              onClick={() => {
                toggleLanguage();
              }}
              className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{t.nav.switchLang}: {language === 'en' ? 'English (英文)' : '繁體中文 (Traditional)'}</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                {language === 'en' ? '切換繁中' : 'Switch EN'}
              </span>
            </button>

            {/* Theme Switch row */}
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {isDark ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>{t.nav.themeMode}: {isDark ? t.nav.nightMode : t.nav.lightMode}</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                {isDark ? t.nav.lightMode : t.nav.nightMode}
              </span>
            </button>

            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer mt-1"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.reserveAccess}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
