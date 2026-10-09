import React, { useState } from 'react';
import { Cpu, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenBooking }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#05080E] border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & Affiliation */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded border border-cyan-500/40 bg-cyan-500/10 dark:bg-cyan-950/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-semibold tracking-tight">
                {t.nav.brand}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs max-w-md">
              {t.footer.about}
            </p>

            <div className="text-slate-500 dark:text-slate-500 text-[11px] font-mono space-y-1">
              <div>{t.footer.quad}</div>
              <div>{t.footer.hours}</div>
              <div>{t.footer.cleanroomNotice}</div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-3">
            <h4 className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px] font-mono">
              {t.footer.researchCol}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onScrollToSection('capabilities')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  RF & Terahertz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('capabilities')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  GaN/SiC Power Semi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('capabilities')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Neuromorphic VLSI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('capabilities')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Cryogenic Electronics
                </button>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-1 lg:col-span-2 space-y-3">
            <h4 className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px] font-mono">
              {t.footer.infraCol}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onScrollToSection('workbench')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  {t.nav.workbench}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('equipment')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  {t.nav.equipment}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('publications')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  {t.nav.publications}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('team')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  {t.nav.team}
                </button>
              </li>
            </ul>
          </div>

          {/* Colloquium Newsletter */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3">
            <h4 className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px] font-mono">
              {t.footer.noticesCol}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.footer.noticesDesc}
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.footer.subscribed}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.footer.subscribePlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded text-xs transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 underline font-medium cursor-pointer"
              >
                {t.footer.applyAccess}
              </button>
            </div>
          </div>
        </div>

        {/* Quiet institutional copyright bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            {t.footer.compliance}
          </div>
        </div>
      </div>
    </footer>
  );
};
