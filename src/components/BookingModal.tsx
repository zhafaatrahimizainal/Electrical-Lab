import React, { useState } from 'react';
import { X, CheckCircle2, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedData } from '../data/localizedLabData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedItem?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedItem = '',
}) => {
  const { language, t } = useLanguage();
  const { equipment } = getLocalizedData(language);

  const [instrument, setInstrument] = useState<string>(preselectedItem || (equipment[0] ? equipment[0].name : ''));
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<string>('2026-10-15');
  const [timeSlot, setTimeSlot] = useState<string>('morning');
  const [clearanceTier, setClearanceTier] = useState<string>('level1');
  const [abstract, setAbstract] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [reservationCode, setReservationCode] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = t.modal.nameError;
    if (!email.trim() || !email.includes('@')) newErrors.email = t.modal.emailError;
    if (!abstract.trim() || abstract.length < 15) newErrors.abstract = t.modal.abstractError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const refCode = `EE-RES-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(refCode);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setAbstract('');
    onClose();
  };

  const getSlotLabel = (slot: string) => {
    switch (slot) {
      case 'morning':
        return t.modal.morningSlot;
      case 'afternoon':
        return t.modal.afternoonSlot;
      case 'evening':
        return t.modal.eveningSlot;
      case 'fullday':
        return t.modal.fullDaySlot;
      default:
        return t.modal.morningSlot;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-700/80 rounded-lg p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.modal.confirmedTitle}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {t.modal.confirmedDesc}
            </p>

            <div className="p-4 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300 max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500">{t.modal.resId}</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">{reservationCode}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500">{t.modal.apparatus}</span>
                <span className="text-slate-900 dark:text-white truncate max-w-[220px]">{instrument}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500">{t.modal.session}</span>
                <span className="text-slate-900 dark:text-white">{date} · {getSlotLabel(timeSlot)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.modal.investigator}</span>
                <span className="text-slate-900 dark:text-white">{name}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer"
              >
                {t.modal.doneButton}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.modal.tag}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{t.modal.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {t.modal.desc}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Instrument Selection */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">{t.modal.instrumentLabel}</label>
                <select
                  value={instrument}
                  onChange={(e) => setInstrument(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 min-h-[42px]"
                >
                  {equipment.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name} ({item.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">{t.modal.nameLabel}</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Jordan Hayes / 林浩然博士"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 min-h-[42px]"
                  />
                  {errors.name && <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">{t.modal.emailLabel}</label>
                  <input
                    type="email"
                    placeholder="j.hayes@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 min-h-[42px]"
                  />
                  {errors.email && <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">{t.modal.dateLabel}</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">{t.modal.slotLabel}</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 min-h-[42px]"
                  >
                    <option value="morning">{t.modal.morningSlot}</option>
                    <option value="afternoon">{t.modal.afternoonSlot}</option>
                    <option value="evening">{t.modal.eveningSlot}</option>
                    <option value="fullday">{t.modal.fullDaySlot}</option>
                  </select>
                </div>
              </div>

              {/* Clearance Tier */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">{t.modal.clearanceLabel}</label>
                <select
                  value={clearanceTier}
                  onChange={(e) => setClearanceTier(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 min-h-[42px]"
                >
                  <option value="level1">Level 1: General Lab Safety (Multimeters, Scopes, Low-V)</option>
                  <option value="level2">Level 2: Class 100 Cleanroom & Gowning Certified</option>
                  <option value="level3">Level 3: Cryogenics, Superconducting Magnets & High-Voltage</option>
                </select>
              </div>

              {/* Experiment Abstract */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">{t.modal.abstractLabel}</label>
                <textarea
                  rows={3}
                  placeholder={t.modal.abstractPlaceholder}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                />
                {errors.abstract && <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-1">{errors.abstract}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer min-h-[44px]"
                >
                  {t.modal.submitButton}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

