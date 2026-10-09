import React, { useState } from 'react';
import { EquipmentItem } from '../data/labData';
import { getLocalizedData } from '../data/localizedLabData';
import { useLanguage } from '../context/LanguageContext';
import { Search, Calendar, CheckCircle2, AlertTriangle, ShieldCheck, User } from 'lucide-react';

interface EquipmentSectionProps {
  onBookInstrument: (instrumentName: string) => void;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ onBookInstrument }) => {
  const { language, t } = useLanguage();
  const { equipment } = getLocalizedData(language);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'All', label: t.equipment.allCat },
    { id: 'RF & Microwaves', label: t.equipment.rfCat },
    { id: 'Semiconductor', label: t.equipment.semiCat },
    { id: 'Cleanroom', label: t.equipment.cleanroomCat },
    { id: 'Power Systems', label: t.equipment.powerCat },
  ];

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="equipment" className="py-20 md:py-28 bg-white dark:bg-[#080B11] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <span>{t.equipment.tag}</span>
              <span aria-hidden="true">·</span>
              <span>{t.equipment.subtag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              {t.equipment.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              {t.equipment.desc}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.equipment.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Filter Controls (Allowed functional button tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-500 dark:border-cyan-400 text-cyan-800 dark:text-cyan-300 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B0F19] hover:border-slate-300 dark:hover:border-slate-700 transition-all p-5 flex flex-col justify-between group shadow-sm hover:shadow-md dark:shadow-lg h-full"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] rounded overflow-hidden mb-4 border border-slate-200 dark:border-slate-800/80 bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Status Indicator */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-black/70 border border-white/10">
                    {item.status === 'Operational' ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {t.equipment.operational}
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {t.equipment.inCalibration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Unboxed category and model */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="text-cyan-600 dark:text-cyan-400 font-medium">{item.category}</span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="font-mono truncate">{item.model}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="p-2.5 rounded bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 mb-4 text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">{t.equipment.specLabel}</span>
                  {item.specs}
                </div>
              </div>

              <div>
                {/* Unboxed Metadata row */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> {t.equipment.clearanceLabel}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">{item.clearanceLevel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {t.equipment.custodianLabel}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 text-[11px]">{item.custodian}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-500">{t.equipment.rateLabel}</span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-medium">{item.hourlyRate}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onBookInstrument(item.name)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.equipment.reserveButton}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
            {t.equipment.noResults} "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
};
