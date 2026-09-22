import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DeviceScene from '@/components/three/DeviceScene';
import BrandButton from '@/components/ui/BrandButton';
import { Cpu, Thermometer, CloudOff, Activity, ShieldCheck, Zap, Sparkles, Smartphone, Layers, Maximize2, RotateCw } from 'lucide-react';
import { useSimulation } from '@/store/simulation';
import { useCameraStore } from '@/store/camera';

const IQOO15_SPECS = [
  { label: 'DISPLAY', val: '6.85" 2K 144Hz LTPO AMOLED', desc: '4500 nits peak brightness, 3200Hz PWM dimming', color: 'text-white' },
  { label: 'PRIMARY CHIPSET', val: 'SNAPDRAGON 8 ELITE GEN 5', desc: '3nm architecture with dedicated Hexagon NPU', color: 'text-violet' },
  { label: 'COPROCESSOR', val: 'iQOO Q3 SUPERCOMPUTING CHIP', desc: 'On-device SLM matrix acceleration & rendering engine', color: 'text-cobalt-light' },
  { label: 'LOCAL SLM INFERENCE', val: '1.7B QUANTIZED MODEL', desc: 'INT8 weights running completely on-device [PROTOTYPE SCENARIO]', color: 'text-cyan-300' },
  { label: 'FIRST-TOKEN LATENCY', val: '14.8 ms', desc: 'Zero network handshake delay', color: 'text-mint' },
  { label: 'THERMAL SYSTEM', val: '3D VAPOR CHAMBER COOLING', desc: 'Nominal 31°C under sustained local inference', color: 'text-mint' },
  { label: 'CLOUD TRAFFIC', val: '0 BYTES', desc: 'Air-gapped data enclave [HARDWARE ENFORCED]', color: 'text-emerald-400' },
  { label: 'OPERATING SYSTEM', val: 'OriginOS 6', desc: 'Deep ContextPilot hardware enclave integration', color: 'text-violet-light' },
];

export const HardwarePage: React.FC = () => {
  const navigate = useNavigate();
  const { phoneVariant, setPhoneVariant, focusDevice, setFocusDevice } = useSimulation();
  const { setCameraPreset } = useCameraStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'enclave'>('overview');

  const handlePhoneFocus = () => {
    if (focusDevice === 'phone') {
      setFocusDevice('none');
      setCameraPreset('hero');
    } else {
      setFocusDevice('phone');
      setCameraPreset('phone');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#07080C] text-white pt-28 pb-20 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3 font-display text-xs tracking-widest text-cyan-400 uppercase mb-3 font-bold">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>/04 HARDWARE INSTRUMENTATION</span>
            <span className="text-white/20">•</span>
            <span className="text-white/60">iQOO 15 FLAGSHIP AI COPROCESSOR</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.92] mb-4">
            THE INTELLIGENCE
            <br />
            IS ALREADY
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cobalt to-violet">
              IN YOUR POCKET.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/70 font-sans max-w-xl leading-relaxed">
            The iQOO 15 is not merely a smartphone. It is a high-performance hardware enclave with dual silicon (Snapdragon 8 Elite Gen 5 + Q3 Chip) capable of running local AI workloads in total privacy.
          </p>
        </div>

        {/* 3D Hardware Interaction Stage with iQOO 15 Controls */}
        <div className="relative w-full h-[580px] rounded-3xl bg-[#090B10] border border-white/15 overflow-hidden mb-16 shadow-2xl flex flex-col justify-between p-6">
          
          {/* Three.js 3D Device Studio */}
          <div className="absolute inset-0">
            <DeviceScene />
          </div>

          {/* Top Bar: iQOO 15 Variant Switcher */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-[#07080C]/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-mono">
              <span className="text-white/50 uppercase">iQOO 15 EDITION:</span>
              <span className="text-cyan-400 font-bold uppercase">{phoneVariant}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#07080C]/85 backdrop-blur-md p-1.5 rounded-full border border-white/15">
              {[
                { id: 'legend', label: 'LEGEND (WHITE)', badge: 'bg-gradient-to-r from-red-500 via-blue-600 to-cyan-400' },
                { id: 'alpha', label: 'ALPHA (STEALTH BLACK)', badge: 'bg-gray-800' },
                { id: 'apex', label: 'APEX (CYAN METALLIC)', badge: 'bg-cyan-500' },
              ].map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setPhoneVariant(variant.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${
                    phoneVariant === variant.id
                      ? 'bg-blue-600 text-white shadow-lg border border-blue-400'
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${variant.badge}`} />
                  {variant.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Camera Focus & Interaction Guide */}
          <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
            <div className="bg-[#07080C]/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white/70 flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>DRAG PHONE TO ROTATE 360° &bull; HOVER FOR POINT LIGHT</span>
            </div>

            <button
              onClick={handlePhoneFocus}
              className="pointer-events-auto px-5 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 shadow-lg"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              {focusDevice === 'phone' ? 'RESET CAMERA PRESET' : 'INSPECT iQOO 15 CLOSE-UP'}
            </button>
          </div>
        </div>

        {/* Hardware Indicators Grid (Around the Phone) */}
        <div className="mb-20">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>iQOO 15 SILICON ARCHITECTURE & BENCHMARKS</span>
            </div>

            <div className="flex gap-2">
              {(['overview', 'specs', 'enclave'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-all ${
                    activeTab === tab
                      ? 'bg-white text-black font-bold'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {IQOO15_SPECS.map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl bg-[#090B10] border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] duration-200"
              >
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                  {item.label}
                </div>
                <div className={`font-display text-xl sm:text-2xl font-bold tracking-tight mb-2 ${item.color}`}>
                  {item.val}
                </div>
                <p className="text-xs font-mono text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Route Banner: RUN DEMO → */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#0C0E18] via-[#090B10] to-[#120F24] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="font-mono text-xs text-mint font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> LIVE SIMULATION READY
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              EXPERIENCE THE 12-STATE PIPELINE
            </h3>
            <p className="text-white/60 text-sm font-sans mt-1">
              Watch how the iQOO 15 handles real incident remediation locally without cloud latency.
            </p>
          </div>

          <BrandButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/demo')}
            className="flex-shrink-0 shadow-[0_0_30px_rgba(66,103,255,0.5)]"
          >
            RUN LIVE DEMO
          </BrandButton>
        </div>

      </div>
    </div>
  );
};

export default HardwarePage;
