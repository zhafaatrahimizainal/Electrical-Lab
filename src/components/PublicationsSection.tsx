import React, { useState } from 'react';
import { Publication } from '../data/labData';
import { getLocalizedData } from '../data/localizedLabData';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Copy, Check, ExternalLink, ChevronDown, ChevronUp, Search } from 'lucide-react';

export const PublicationsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { publications } = getLocalizedData(language);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);

  const categories = [
    { id: 'All', label: t.publications.allCat },
    { id: 'RF Systems', label: t.publications.rfCat },
    { id: 'Power Semi', label: t.publications.powerCat },
    { id: 'VLSI', label: t.publications.vlsiCat },
    { id: 'Quantum', label: t.publications.quantumCat },
  ];

  const filteredPubs = publications.filter((pub) => {
    const matchesCat = selectedCategory === 'All' || pub.category === selectedCategory;
    const matchesQuery =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCopyBibtex = (pub: Publication) => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedBibtexId(pub.id);
    setTimeout(() => {
      setCopiedBibtexId(null);
    }, 2500);
  };

  return (
    <section id="publications" className="py-20 md:py-28 bg-slate-50 dark:bg-[#070A10] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <span>{t.publications.tag}</span>
              <span aria-hidden="true">·</span>
              <span>{t.publications.subtag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              {t.publications.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              {t.publications.desc}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.publications.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 shadow-xs"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-500 dark:border-cyan-400 text-cyan-800 dark:text-cyan-300 shadow-xs'
                  : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Publications List */}
        <div className="space-y-4">
          {filteredPubs.map((pub) => {
            const isExpanded = expandedId === pub.id;
            const isCopied = copiedBibtexId === pub.id;

            return (
              <div
                key={pub.id}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] hover:border-slate-300 dark:hover:border-slate-700/80 transition-all p-5 sm:p-6 shadow-sm hover:shadow-md dark:shadow-none"
              >
                {/* Unboxed Metadata row */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">{pub.category}</span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="font-mono">{pub.year}</span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-slate-700 dark:text-slate-300">{pub.venue}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    <span>
                      {t.publications.citations} <strong className="text-slate-900 dark:text-white font-mono tabular-nums">{pub.citations}</strong>
                    </span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-cyan-700 dark:text-cyan-300">{pub.doi}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {pub.title}
                </h3>

                {/* Authors (clean unboxed text) */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono">
                  {pub.authors.join(', ')}
                </p>

                {/* Expanded Abstract Section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded border border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-slate-900 dark:text-white block mb-1 font-mono text-[11px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {t.publications.paperAbstract}
                      </span>
                      {pub.abstract}
                    </div>

                    <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto shadow-inner">
                      <pre>{pub.bibtex}</pre>
                    </div>
                  </div>
                )}

                {/* Action Buttons Row */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? t.publications.hideDetails : t.publications.viewDetails}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCopyBibtex(pub)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer text-xs"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
                      <span>{isCopied ? t.publications.bibtexCopied : t.publications.copyBibtex}</span>
                    </button>

                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <span>{t.publications.doiPortal}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPubs.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
            {t.publications.noResults} "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
};
