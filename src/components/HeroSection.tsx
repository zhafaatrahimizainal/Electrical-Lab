import React, { useState, useEffect, useRef } from 'react';
import { Activity, ArrowRight, ShieldCheck, Zap, Sliders, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToWorkbench: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onScrollToWorkbench }) => {
  const { t } = useLanguage();
  const [liveFreq, setLiveFreq] = useState(2.4);
  const [isRunning, setIsRunning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.floor((rect.width || 480) * dpr);
      const targetHeight = Math.floor((rect.height || 230) * dpr);
      if (targetWidth > 0 && targetHeight > 0 && (canvas.width !== targetWidth || canvas.height !== targetHeight)) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark oscilloscope grid
      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      const xStep = width / 10;
      for (let x = 0; x <= width; x += xStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const yStep = height / 6;
      for (let y = 0; y <= height; y += yStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center crosshair axis
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      if (isRunning) {
        phase += 0.045 * liveFreq;
      }

      // Draw Channel 1 (Cyan trace: RF carrier)
      ctx.strokeStyle = '#22D3EE';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06B6D4';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const centerY = height / 2;
      const amp1 = height * 0.28;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * Math.PI * 4 * (liveFreq / 2) + phase;
        const y = centerY + Math.sin(t) * amp1;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Channel 2 (Amber trace: Filtered response / modulation)
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const amp2 = height * 0.18;
      for (let x = 0; x < width; x++) {
        const t = (x / width) * Math.PI * 4 * (liveFreq / 2) + phase * 1.5 + 0.8;
        // add slight 3rd harmonic
        const y = centerY + (Math.sin(t) * 0.85 + Math.sin(t * 3) * 0.15) * amp2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [liveFreq, isRunning]);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#070A10] transition-colors duration-200">
      {/* Ambient background light gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed clean metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider uppercase">{t.hero.kicker}</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>{t.hero.dept}</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>{t.hero.standards}</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08] [text-wrap:balance]">
              {t.hero.title}
            </h1>

            {/* Body prose */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {t.hero.desc}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToWorkbench}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition-all rounded cursor-pointer shadow-lg shadow-cyan-500/20 whitespace-nowrap"
              >
                <Activity className="w-4 h-4" />
                <span>{t.hero.launchWorkbench}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white border border-slate-300 dark:border-slate-700/80 rounded transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <span>{t.hero.reserveTime}</span>
              </button>
            </div>

            {/* Quantitative Proof Adjacency */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  110 <span className="text-xs uppercase font-mono text-cyan-600 dark:text-cyan-400">{t.hero.stat1Unit}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.hero.stat1Label}</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  28 <span className="text-xs uppercase font-mono text-cyan-600 dark:text-cyan-400">{t.hero.stat2Unit}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.hero.stat2Label}</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  42<span className="text-cyan-600 dark:text-cyan-400">+</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.hero.stat3Label}</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  99.98<span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">%</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.hero.stat4Label}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Container & Interactive Mini-HUD */}
          <div className="lg:col-span-5 relative w-full max-w-xl mx-auto lg:max-w-none">
            <div className="relative rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0C101A] p-3 shadow-xl dark:shadow-2xl overflow-hidden group">
              {/* Lab Bench Background Image with measured scrim */}
              <div className="relative aspect-video rounded overflow-hidden mb-3 border border-slate-200 dark:border-slate-800/80">
                <img
                  src="/assets/images/hero_ee_lab_bench_1791340254877.jpg"
                  alt="Electrical Engineering laboratory high-frequency testbench"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-mono bg-black/60 px-2 py-0.5 rounded border border-white/10 text-cyan-300">
                    {t.hero.benchTag}
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t.hero.acquisitionActive}
                  </span>
                </div>
              </div>

              {/* Interactive Oscilloscope Scope Canvas */}
              <div className="relative rounded bg-[#080C14] border border-slate-800 p-2.5 shadow-inner">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" /> {t.hero.ch1Label}
                    </span>
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> {t.hero.ch2Label}
                    </span>
                  </div>
                  <span className="text-slate-500 tabular-nums">{t.hero.timebase}</span>
                </div>

                <div className="relative aspect-[2.1/1] w-full rounded overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={230}
                    className="w-full h-full block"
                  />
                </div>

                {/* Micro interactive slider */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t.hero.rfFreq}</span>
                    <span className="font-mono text-cyan-300 font-bold tabular-nums">{liveFreq.toFixed(1)} GHz</span>
                  </div>

                  <input
                    type="range"
                    min="0.8"
                    max="6.0"
                    step="0.2"
                    value={liveFreq}
                    onChange={(e) => setLiveFreq(parseFloat(e.target.value))}
                    className="w-28 sm:w-36 accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded"
                    aria-label="Adjust carrier frequency"
                  />

                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="text-[11px] px-2 py-0.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors cursor-pointer"
                  >
                    {isRunning ? t.hero.freeze : t.hero.run}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
