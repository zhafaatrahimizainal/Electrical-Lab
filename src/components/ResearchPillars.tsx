import React, { useState } from 'react';
import { ResearchPillar } from '../data/labData';
import { getLocalizedData } from '../data/localizedLabData';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, X, Layers, Cpu, Zap, Activity } from 'lucide-react';

export const ResearchPillars: React.FC = () => {
  const { language, t } = useLanguage();
  const { pillars } = getLocalizedData(language);
  const [selectedPillar, setSelectedPillar] = useState<ResearchPillar | null>(null);

  const icons = [
    <Activity key="rf" className="w-5 h-5 text-cyan-400" />,
    <Zap key="power" className="w-5 h-5 text-amber-400" />,
    <Cpu key="vlsi" className="w-5 h-5 text-indigo-400" />,
    <Layers key="cryo" className="w-5 h-5 text-cyan-300" />,
  ];

  return (
    <section id="capabilities" className="py-20 md:py-28 bg-white dark:bg-[#070A10] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
            <span>{t.capabilities.tag}</span>
            <span aria-hidden="true">·</span>
            <span>{t.capabilities.subtag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            {t.capabilities.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
            {t.capabilities.desc}
          </p>
        </div>

        {/* Asymmetric Bento Grid on Desktop, Balanced 2x2 on Tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {pillars.map((pillar, idx) => {
            // Asymmetric layout on desktop (12 cols), 2 equal columns on tablet (md:col-span-1)
            const desktopSpan = idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar)}
                className={`${desktopSpan} md:col-span-1 group relative rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0A0E18] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-cyan-950/20 h-full`}
              >
                {/* Visual Media Header */}
                <div className="relative aspect-[21/9] sm:aspect-[2.2/1] rounded overflow-hidden mb-6 border border-slate-200 dark:border-slate-800/80 bg-slate-950">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Clean unboxed editorial index */}
                  <div className="absolute top-3 left-3 text-xs font-mono text-cyan-400 flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded border border-white/10">
                    {icons[idx]}
                    <span>0{idx + 1}. {t.capabilities.thrustNum}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 text-slate-300 group-hover:text-cyan-400 transition-colors p-1.5 rounded-full bg-black/60 border border-white/10">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>{t.capabilities.lead} {pillar.leadInvestigator}</span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {pillar.abstract}
                  </p>
                </div>

                {/* Quantitative Spec Metrics Bar: 2x2 grid for tablet & compact columns */}
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                  {pillar.specs.map((spec) => (
                    <div key={spec.label} className="p-2 sm:p-2.5 rounded bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/60 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono truncate">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-semibold font-mono text-cyan-600 dark:text-cyan-300 tabular-nums mt-0.5 truncate">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Topics unboxed text */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/50 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  {pillar.topics.map((topic, i) => (
                    <React.Fragment key={topic}>
                      <span>{topic}</span>
                      {i < pillar.topics.length - 1 && <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal for Selected Pillar */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0C101C] border border-slate-200 dark:border-slate-700 rounded-lg p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">{t.capabilities.dossierTag}</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedPillar.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">{t.capabilities.lead} {selectedPillar.leadInvestigator}</p>

            <div className="aspect-video w-full rounded overflow-hidden mb-6 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedPillar.image}
                alt={selectedPillar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              <p>{selectedPillar.abstract}</p>
              <div className="p-3.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">{t.capabilities.architecture}</span>
                <span className="font-mono text-xs text-cyan-700 dark:text-cyan-300">{selectedPillar.schematicSummary}</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mb-6">
              <h4 className="text-xs uppercase font-mono text-slate-500 dark:text-slate-400 mb-3">{t.capabilities.validationMetrics}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedPillar.specs.map((s) => (
                  <div key={s.label} className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">{s.label}</div>
                    <div className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedPillar(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer"
              >
                {t.capabilities.closeDossier}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
