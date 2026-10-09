import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Download, Camera, Sliders, Radio, BarChart3, Waves, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedData, CircuitConfig } from '../data/localizedLabData';

export const WorkbenchSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { circuits } = getLocalizedData(language);

  const [activeCircuitId, setActiveCircuitId] = useState<string>('filter');
  const [waveType, setWaveType] = useState<'sine' | 'square' | 'triangle'>('sine');
  const [viewMode, setViewMode] = useState<'time' | 'fft'>('time');
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Parameter states
  const [freq, setFreq] = useState<number>(10.0); // MHz
  const [amplitude, setAmplitude] = useState<number>(2.5); // Vpp
  const [phaseOffset, setPhaseOffset] = useState<number>(0); // degrees
  const [noiseLevel, setNoiseLevel] = useState<number>(0.05); // thermal noise fraction
  const [showCh1, setShowCh1] = useState<boolean>(true);
  const [showCh2, setShowCh2] = useState<boolean>(true);
  const [timebaseScale, setTimebaseScale] = useState<number>(1.0); // zoom factor

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeCircuit = circuits.find((c) => c.id === activeCircuitId) || circuits[0];

  // Reset to circuit defaults
  const handleCircuitSelect = (circuit: CircuitConfig) => {
    setActiveCircuitId(circuit.id);
    setFreq(circuit.defaultFreq);
    setAmplitude(circuit.defaultAmp);
    setPhaseOffset(0);
  };

  const handleReset = () => {
    setFreq(activeCircuit.defaultFreq);
    setAmplitude(activeCircuit.defaultAmp);
    setPhaseOffset(0);
    setNoiseLevel(0.05);
    setWaveType('sine');
    setIsRunning(true);
  };

  // Export CSV of simulated waveform samples
  const handleExportCSV = () => {
    const pointsCount = 400;
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += `Time_ns,CH1_Input_V,CH2_Output_V,Circuit_${activeCircuit.id},Freq_MHz_${freq}\n`;

    for (let i = 0; i < pointsCount; i++) {
      const t_ns = i * 0.25;
      const angle = (2 * Math.PI * (freq * 1e6) * (t_ns * 1e-9));
      let ch1 = Math.sin(angle) * (amplitude / 2);
      let ch2 = ch1 * activeCircuit.nominalGain;
      csvContent += `${t_ns.toFixed(2)},${ch1.toFixed(4)},${ch2.toFixed(4)}\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `waveform_${activeCircuit.id}_${freq}MHz.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Capture canvas snapshot
  const handleCaptureSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageUri = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.setAttribute('href', imageUri);
    link.setAttribute('download', `oscilloscope_capture_${activeCircuit.id}.png`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Real-time animation loop
  useEffect(() => {
    let animationFrameId: number;
    let simTime = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Handle Retina / high-DPI crisp rendering on tablets and mobile
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.floor((rect.width || 860) * dpr);
      const targetHeight = Math.floor((rect.height || 480) * dpr);
      if (targetWidth > 0 && targetHeight > 0 && (canvas.width !== targetWidth || canvas.height !== targetHeight)) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      // Dark oscilloscope CRT background
      ctx.fillStyle = '#060A12';
      ctx.fillRect(0, 0, w, h);

      // Oscilloscope graticule grid (10 horizontal divisions, 8 vertical)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;

      const divX = w / 10;
      const divY = h / 8;

      for (let x = 0; x <= w; x += divX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();

        // Sub-ticks on central horizontal axis
        for (let sub = 1; sub < 5; sub++) {
          const subX = x + (divX / 5) * sub;
          if (subX < w) {
            ctx.beginPath();
            ctx.moveTo(subX, h / 2 - 3);
            ctx.lineTo(subX, h / 2 + 3);
            ctx.stroke();
          }
        }
      }

      for (let y = 0; y <= h; y += divY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        // Sub-ticks on central vertical axis
        for (let sub = 1; sub < 5; sub++) {
          const subY = y + (divY / 5) * sub;
          if (subY < h) {
            ctx.beginPath();
            ctx.moveTo(w / 2 - 3, subY);
            ctx.lineTo(w / 2 + 3, subY);
            ctx.stroke();
          }
        }
      }

      // Stronger center axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      if (isRunning) {
        simTime += 0.05;
      }

      const centerY = h / 2;
      const vScale = h / 12; // Volts per division scaling

      if (viewMode === 'time') {
        // TIME DOMAIN OSCILLOSCOPE TRACES
        const ch1Points: { x: number; y: number }[] = [];
        const ch2Points: { x: number; y: number }[] = [];

        const freqFactor = (freq / 10) * timebaseScale * 0.08;
        const phaseRad = (phaseOffset * Math.PI) / 180;

        for (let x = 0; x < w; x++) {
          const t = x * freqFactor + simTime;
          let valCh1 = 0;

          // Input waveform generator
          if (waveType === 'sine') {
            valCh1 = Math.sin(t);
          } else if (waveType === 'square') {
            // Square with Gibbs phenomenon 3rd and 5th harmonics
            valCh1 = Math.sin(t) > 0 ? 0.95 : -0.95;
            valCh1 += Math.sin(t * 7) * 0.08 * Math.exp(-((t % Math.PI) * 2));
          } else {
            // Triangle wave
            const mod = (t / Math.PI) % 2;
            valCh1 = mod < 1 ? mod * 2 - 1 : 3 - mod * 2;
          }

          // Scale by amplitude
          const vCh1 = valCh1 * (amplitude / 2);

          // Thermal noise
          const noise1 = (Math.random() - 0.5) * noiseLevel * 0.8;
          const yCh1 = centerY - (vCh1 + noise1) * vScale;
          ch1Points.push({ x, y: yCh1 });

          // Output Channel 2 synthesized behavior
          let vCh2 = 0;
          if (activeCircuit.id === 'filter') {
            // Filter response: resonance peak at 10 MHz
            const deltaF = Math.abs(freq - 10.0);
            const attenuation = 1 / (1 + Math.pow(deltaF / 3.0, 2));
            const filterPhase = deltaF * 0.4;
            vCh2 = Math.sin(t - filterPhase + phaseRad) * (amplitude / 2) * attenuation;
          } else if (activeCircuit.id === 'gan-inverter') {
            // GaN inverter: steep switching edge with inductive ringing
            const sqVal = Math.sin(t + phaseRad) > 0 ? 1 : -1;
            const ring = Math.sin(t * 12) * Math.exp(-((x % 40) / 12)) * 0.35;
            vCh2 = (sqVal * (amplitude / 2) * 1.6 + ring);
          } else if (activeCircuit.id === 'pll') {
            // PLL: phase alignment with lock loop
            vCh2 = Math.sin(t * 1.0 + phaseRad * 0.7) * (amplitude / 2) * 1.1;
          } else if (activeCircuit.id === 'lna') {
            // LNA: gain + non-linear rail saturation clipping
            let rawOut = Math.sin(t + phaseRad) * (amplitude / 2) * activeCircuit.nominalGain;
            const clipRail = 4.2;
            if (rawOut > clipRail) rawOut = clipRail;
            if (rawOut < -clipRail) rawOut = -clipRail;
            vCh2 = rawOut;
          } else if (activeCircuit.id === 'adc') {
            // ADC: quantized staircase steps
            const inputScaled = Math.sin(t + phaseRad) * (amplitude / 2);
            const levels = 10;
            const quantized = Math.round(inputScaled * levels) / levels;
            vCh2 = quantized;
          }

          const noise2 = (Math.random() - 0.5) * noiseLevel * 0.6;
          const yCh2 = centerY - (vCh2 + noise2) * vScale;
          ch2Points.push({ x, y: yCh2 });
        }

        // Render CH1 Trace (Cyan)
        if (showCh1) {
          ctx.strokeStyle = '#22D3EE';
          ctx.lineWidth = 2.2;
          ctx.shadowColor = '#06B6D4';
          ctx.shadowBlur = 9;
          ctx.beginPath();
          ch1Points.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
        }

        // Render CH2 Trace (Amber)
        if (showCh2) {
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2.0;
          ctx.shadowColor = '#D97706';
          ctx.shadowBlur = 7;
          ctx.beginPath();
          ch2Points.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
        }

        // Ground / Trigger indicators on left gutter
        ctx.shadowBlur = 0;
        if (showCh1) {
          ctx.fillStyle = '#22D3EE';
          ctx.beginPath();
          ctx.moveTo(4, centerY - 6);
          ctx.lineTo(12, centerY);
          ctx.lineTo(4, centerY + 6);
          ctx.closePath();
          ctx.fill();
        }

        if (showCh2) {
          ctx.fillStyle = '#F59E0B';
          ctx.beginPath();
          ctx.moveTo(14, centerY - 6);
          ctx.lineTo(22, centerY);
          ctx.lineTo(14, centerY + 6);
          ctx.closePath();
          ctx.fill();
        }

      } else {
        // FREQUENCY DOMAIN (FFT SPECTRUM ANALYZER)
        ctx.shadowBlur = 0;
        const numBins = 64;
        const binW = w / numBins;

        const fundamentalBin = Math.min(Math.floor((freq / 40) * (numBins / 2)), numBins - 2);

        for (let i = 0; i < numBins; i++) {
          let magCh1 = 0.05 + Math.random() * noiseLevel * 0.1;
          let magCh2 = 0.04 + Math.random() * noiseLevel * 0.1;

          // Fundamental peak
          if (i === fundamentalBin) {
            magCh1 = 0.85 * (amplitude / 6);
            magCh2 = 0.82 * (amplitude / 6) * (activeCircuit.id === 'filter' && Math.abs(freq - 10) > 4 ? 0.3 : 1.1);
          } else if (i === fundamentalBin - 1 || i === fundamentalBin + 1) {
            magCh1 = 0.35 * (amplitude / 6);
            magCh2 = 0.32 * (amplitude / 6);
          }

          // Harmonics (2nd & 3rd)
          const harm2 = fundamentalBin * 2;
          if (harm2 < numBins && (i === harm2 || i === harm2 - 1)) {
            magCh2 += 0.22 * (amplitude / 6);
          }
          const harm3 = fundamentalBin * 3;
          if (harm3 < numBins && (i === harm3 || i === harm3 - 1)) {
            magCh2 += 0.14 * (amplitude / 6);
          }

          const barH1 = Math.min(magCh1 * h * 0.85, h - 20);
          const barH2 = Math.min(magCh2 * h * 0.85, h - 20);

          if (showCh1) {
            ctx.fillStyle = 'rgba(34, 211, 238, 0.45)';
            ctx.fillRect(i * binW + 1, h - barH1, binW * 0.4, barH1);
          }

          if (showCh2) {
            ctx.fillStyle = 'rgba(245, 158, 11, 0.55)';
            ctx.fillRect(i * binW + binW * 0.45, h - barH2, binW * 0.4, barH2);
          }
        }

        // Spectral labels
        ctx.fillStyle = '#64748B';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText('0 Hz', 10, h - 6);
        ctx.fillText('50 MHz', w / 2 - 15, h - 6);
        ctx.fillText('100 MHz (Nyquist)', w - 105, h - 6);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    activeCircuit,
    freq,
    amplitude,
    phaseOffset,
    noiseLevel,
    waveType,
    viewMode,
    isRunning,
    showCh1,
    showCh2,
    timebaseScale,
  ]);

  // Derived telemetry metrics
  const vppCh1 = amplitude.toFixed(2);
  const vrmsCh1 = (amplitude / (2 * Math.SQRT2)).toFixed(2);
  
  const circuitGain = activeCircuit.id === 'filter'
    ? (1 / (1 + Math.pow(Math.abs(freq - 10.0) / 3.0, 2))).toFixed(2)
    : activeCircuit.nominalGain.toFixed(2);

  const vppCh2 = (parseFloat(vppCh1) * parseFloat(circuitGain)).toFixed(2);
  const vrmsCh2 = (parseFloat(vrmsCh1) * parseFloat(circuitGain)).toFixed(2);

  return (
    <section id="workbench" className="py-20 md:py-28 bg-slate-50 dark:bg-[#080B11] border-b border-slate-200 dark:border-slate-800 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
            <span>{t.workbench.tag}</span>
            <span aria-hidden="true">·</span>
            <span>{t.workbench.subtag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            {t.workbench.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
            {t.workbench.desc}
          </p>
        </div>

        {/* Circuit Selector Tabs */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(100,116,139,0.3)_transparent] dark:[scrollbar-color:rgba(51,65,85,0.4)_transparent]">
          {circuits.map((circuit) => {
            const isActive = circuit.id === activeCircuitId;
            return (
              <button
                key={circuit.id}
                onClick={() => handleCircuitSelect(circuit)}
                className={`px-4 py-2 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 dark:border-cyan-400 text-cyan-800 dark:text-cyan-300 shadow-sm shadow-cyan-500/20'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-500 dark:bg-cyan-400' : 'bg-slate-400 dark:bg-slate-600'}`} />
                <span>{circuit.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Workbench Layout: Split Screen Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-6 shadow-xl dark:shadow-2xl">
          {/* Main Visualizer Stage (Left 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white tracking-tight">{activeCircuit.name}</span>
                <span className="text-slate-300 dark:text-slate-500 hidden sm:inline">|</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] hidden sm:inline">{activeCircuit.category}</span>
              </div>

              {/* View mode toggle (Time vs FFT) & Run/Stop */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded p-0.5 border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setViewMode('time')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'time' ? 'bg-white dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/40 shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Waves className="w-3 h-3" />
                    <span>{t.workbench.oscillogram}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('fft')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'fft' ? 'bg-white dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/40 shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    <span>{t.workbench.fftSpectrum}</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`p-1.5 rounded border transition-colors cursor-pointer ${
                    isRunning
                      ? 'border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                      : 'border-amber-500/30 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                  }`}
                  title={isRunning ? t.workbench.freezeAcq : t.workbench.resumeAcq}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
                  title={t.workbench.resetParams}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="relative aspect-[16/9] w-full rounded border border-slate-800 bg-[#060A12] overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                width={860}
                height={480}
                className="w-full h-full block cursor-crosshair"
              />

              {/* Viewport HUD Channel Overlays */}
              <div className="absolute top-3 left-3 flex items-center gap-3 text-[11px] font-mono pointer-events-none">
                <div className={`px-2 py-0.5 rounded border ${showCh1 ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300' : 'bg-black/60 border-slate-800 text-slate-600'}`}>
                  CH1: {amplitude.toFixed(1)} Vpp · {waveType.toUpperCase()}
                </div>
                <div className={`px-2 py-0.5 rounded border ${showCh2 ? 'bg-amber-950/80 border-amber-500/40 text-amber-300' : 'bg-black/60 border-slate-800 text-slate-600'}`}>
                  CH2: {(parseFloat(amplitude.toFixed(1)) * parseFloat(circuitGain)).toFixed(1)} Vpp
                </div>
              </div>

              {/* Grid status pill in bottom right */}
              <div className="absolute bottom-2 right-3 font-mono text-[10px] text-slate-500 pointer-events-none">
                {t.workbench.triggerStatus}
              </div>
            </div>

            {/* Precision Telemetry Readout Tray */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">{t.workbench.ch1Metrics}</div>
                <div className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
                  {vppCh1} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">V</span> / {vrmsCh1} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">V</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">{t.workbench.ch2Metrics}</div>
                <div className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                  {vppCh2} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">V</span> / {vrmsCh2} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">V</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">{t.workbench.transferGain}</div>
                <div className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  {circuitGain} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">x</span> ({ (20 * Math.log10(Math.max(parseFloat(circuitGain), 0.01))).toFixed(1) } dB)
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">{t.workbench.carrierFreq}</div>
                <div className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  {freq.toFixed(2)} <span className="text-[10px] font-normal text-cyan-600 dark:text-cyan-400">MHz</span>
                </div>
              </div>
            </div>

            {/* Behavior & Physics Explanation */}
            <div className="p-3 rounded bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">{t.workbench.circuitDynamics} </span>
                <span>{activeCircuit.behaviorNotes}</span>
              </div>
            </div>
          </div>

          {/* Right Control & Parameter Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-5 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-5 lg:pt-0 lg:pl-6">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                  <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>{t.workbench.synthControls}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">
                  {t.workbench.liveScpi}
                </span>
              </div>

              {/* Waveform Selector */}
              <div className="space-y-2 mb-5">
                <label className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t.workbench.excitationWaveform}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sine', 'square', 'triangle'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setWaveType(type)}
                      className={`py-1.5 px-2 text-xs font-medium rounded border transition-colors capitalize cursor-pointer text-center ${
                        waveType === type
                          ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 dark:border-cyan-400 text-cyan-800 dark:text-cyan-300 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter Sliders in 2-column grid on tablet, 1-column on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Frequency Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{t.workbench.inputFreq}</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold tabular-nums">{freq.toFixed(1)} MHz</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="50.0"
                    step="0.5"
                    value={freq}
                    onChange={(e) => setFreq(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 dark:accent-cyan-400 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded"
                    aria-label="Adjust input frequency in MHz"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                    <span>1.0 MHz</span>
                    <span>25.0 MHz</span>
                    <span>50.0 MHz</span>
                  </div>
                </div>

                {/* Amplitude Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{t.workbench.driveAmp}</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold tabular-nums">{amplitude.toFixed(1)} V</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="8.0"
                    step="0.1"
                    value={amplitude}
                    onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 dark:accent-cyan-400 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded"
                    aria-label="Adjust drive amplitude in Volts"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                    <span>0.5 V</span>
                    <span>4.0 V</span>
                    <span>8.0 V</span>
                  </div>
                </div>

                {/* Phase Offset Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{t.workbench.phaseOffset}</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400 font-bold tabular-nums">{phaseOffset}°</span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    step="5"
                    value={phaseOffset}
                    onChange={(e) => setPhaseOffset(parseInt(e.target.value))}
                    className="w-full accent-amber-500 dark:accent-amber-400 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded"
                    aria-label="Adjust phase offset in degrees"
                  />
                </div>

                {/* Thermal Noise Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{t.workbench.noiseInjection}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">{(noiseLevel * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.25"
                    step="0.02"
                    value={noiseLevel}
                    onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                    className="w-full accent-slate-500 dark:accent-slate-400 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded"
                    aria-label="Adjust noise floor injection"
                  />
                </div>

                {/* Timebase Scale */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{t.workbench.horizontalTimebase}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">{timebaseScale.toFixed(1)}x</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[0.5, 1.0, 2.0].map((scale) => (
                      <button
                        key={scale}
                        onClick={() => setTimebaseScale(scale)}
                        className={`flex-1 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                          timebaseScale === scale
                            ? 'bg-slate-200 dark:bg-slate-800 border-cyan-500 dark:border-cyan-400 text-cyan-700 dark:text-cyan-300 font-bold'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {scale}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Channel Visibility Toggles */}
                <div className="flex flex-col justify-end pt-1">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{t.workbench.probingChannels}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCh1(!showCh1)}
                      className={`flex-1 py-1.5 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
                        showCh1 ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-400 text-cyan-700 dark:text-cyan-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      CH1 {showCh1 ? 'ON' : 'OFF'}
                    </button>
                    <button
                      onClick={() => setShowCh2(!showCh2)}
                      className={`flex-1 py-1.5 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
                        showCh2 ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-700 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      CH2 {showCh2 ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Export & Download Actions: 2 columns on tablet */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              <button
                onClick={handleExportCSV}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{t.workbench.exportCsv}</span>
              </button>

              <button
                onClick={handleCaptureSnapshot}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.workbench.savePng}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
