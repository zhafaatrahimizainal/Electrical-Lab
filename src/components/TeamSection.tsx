import React from 'react';
import { TeamMember } from '../data/labData';
import { getLocalizedData } from '../data/localizedLabData';
import { useLanguage } from '../context/LanguageContext';
import { Mail, MapPin, Award, BookOpen } from 'lucide-react';

interface TeamSectionProps {
  onContactLead: (researcherName: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onContactLead }) => {
  const { language, t } = useLanguage();
  const { team } = getLocalizedData(language);

  return (
    <section id="team" className="py-20 md:py-28 bg-white dark:bg-[#080B11] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
            <span>{t.team.tag}</span>
            <span aria-hidden="true">·</span>
            <span>{t.team.subtag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            {t.team.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
            {t.team.desc}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B0F19] hover:border-slate-300 dark:hover:border-slate-700 transition-all p-6 flex flex-col justify-between group shadow-sm hover:shadow-md dark:shadow-lg h-full"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">{member.role}</div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  <span className="font-semibold text-slate-900 dark:text-white">{t.team.focusLabel} </span>
                  {member.specialty}
                </div>

                {/* Recent publication reference */}
                <div className="p-3 rounded bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 mb-4 text-xs text-slate-500 dark:text-slate-400 shadow-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-mono text-[10px] uppercase mb-1">
                    <BookOpen className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> {t.team.recentPaperLabel}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 italic">{member.recentPaper}</div>
                </div>
              </div>

              <div>
                {/* Contact & Office info */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono text-[11px]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{member.office}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t.team.citationsLabel}</span>
                    <span className="text-slate-900 dark:text-white font-bold tabular-nums">{member.citations.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => onContactLead(member.name)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 rounded transition-colors cursor-pointer shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{t.team.proposeCollab}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
