import React, { useState } from 'react';
import { Palette, Image as ImageIcon, Sparkles, Sliders, RefreshCw } from 'lucide-react';
import { BackgroundTheme } from '../types';

export const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: 'saffron-glow',
    name: 'Saffron & Amber Glow',
    previewGradient: 'from-amber-600 via-orange-500 to-rose-700',
    bgClass: 'bg-gradient-to-br from-amber-900 via-stone-900 to-orange-950',
    accentColor: '#f59e0b',
    patternOpacity: 0.18
  },
  {
    id: 'royal-indigo',
    name: 'Royal Indigo & Gold',
    previewGradient: 'from-indigo-700 via-blue-800 to-amber-500',
    bgClass: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900',
    accentColor: '#6366f1',
    patternOpacity: 0.15
  },
  {
    id: 'heritage-silk',
    name: 'Heritage Silk & Maroon',
    previewGradient: 'from-rose-900 via-red-950 to-amber-700',
    bgClass: 'bg-gradient-to-br from-neutral-950 via-rose-950 to-red-950',
    accentColor: '#f43f5e',
    patternOpacity: 0.2
  },
  {
    id: 'emerald-harmony',
    name: 'Emerald & Mint Jade',
    previewGradient: 'from-emerald-800 via-teal-900 to-stone-950',
    bgClass: 'bg-gradient-to-br from-stone-950 via-emerald-950 to-teal-950',
    accentColor: '#10b981',
    patternOpacity: 0.15
  },
  {
    id: 'obsidian-minimal',
    name: 'Deep Obsidian & Quartz',
    previewGradient: 'from-zinc-800 via-zinc-900 to-zinc-950',
    bgClass: 'bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950',
    accentColor: '#e4e4e7',
    patternOpacity: 0.12
  }
];

interface BackgroundLayerProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  customBgUrl: string | null;
  onCustomBgChange: (url: string | null) => void;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  currentThemeId,
  onThemeChange,
  customBgUrl,
  onCustomBgChange
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState<number>(12);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(75);

  const activeTheme = BACKGROUND_THEMES.find(t => t.id === currentThemeId) || BACKGROUND_THEMES[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onCustomBgChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="ambient-background-root" className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Wallpaper Background (Custom or Theme Gradient) */}
      {customBgUrl ? (
        <div
          id="custom-background-wallpaper"
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
          style={{
            backgroundImage: `url(${customBgUrl})`,
            filter: `blur(${blurIntensity}px) brightness(0.85)`
          }}
        />
      ) : (
        <div
          id="theme-gradient-wallpaper"
          className={`absolute inset-0 ${activeTheme.bgClass} transition-colors duration-1000`}
        />
      )}

      {/* 2. Layered Ambient Radial Glow Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-96 md:w-[540px] h-96 md:h-[540px] rounded-full opacity-30 blur-3xl pointer-events-none transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${activeTheme.accentColor} 0%, transparent 70%)` }}
      />
      <div 
        className="absolute -bottom-32 -right-32 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full opacity-25 blur-3xl pointer-events-none transition-all duration-1000"
        style={{ background: `radial-gradient(circle, #f97316 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle, #38bdf8 0%, transparent 70%)` }}
      />

      {/* 3. Subtle Traditional Geometric Lattice / Mandala Vector Pattern Overlay */}
      <div 
        id="indian-mandala-lattice-overlay"
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 mix-blend-overlay"
        style={{
          opacity: activeTheme.patternOpacity,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), radial-gradient(rgba(255, 200, 100, 0.3) 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px, 80px 80px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      {/* 4. Elegant Vignette & Dark Tint Shield to guarantee pristine typography contrast */}
      <div 
        id="contrast-tint-overlay"
        className="absolute inset-0 bg-neutral-950 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: overlayOpacity / 100 }}
      />

      {/* 5. Floating Interactive Background Selector Toggle Button (Pointer events active) */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
        <button
          id="toggle-background-settings-btn"
          onClick={() => setShowDrawer(!showDrawer)}
          title="Customize Background Wallpaper"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 hover:border-amber-400 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer text-xs font-medium"
        >
          <Palette className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">Wallpaper & Themes</span>
        </button>
      </div>

      {/* 6. Settings Modal / Drawer for Custom Background */}
      {showDrawer && (
        <div 
          id="background-customizer-drawer"
          className="fixed bottom-16 right-4 w-80 sm:w-96 rounded-2xl bg-neutral-900/95 border border-amber-500/30 p-5 shadow-2xl backdrop-blur-xl z-50 pointer-events-auto text-neutral-200 text-sm animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Background & Ambient Styling</span>
            </div>
            <button
              onClick={() => setShowDrawer(false)}
              className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700"
            >
              ✕
            </button>
          </div>

          {/* Theme Presets */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-neutral-400 mb-2">
              Color Atmosphere Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BACKGROUND_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  id={`theme-select-${theme.id}`}
                  onClick={() => {
                    onThemeChange(theme.id);
                    onCustomBgChange(null);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all border ${
                    currentThemeId === theme.id && !customBgUrl
                      ? 'border-amber-400 bg-amber-500/10 text-amber-200 shadow-sm'
                      : 'border-neutral-800 bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.previewGradient} shrink-0`} />
                  <span className="truncate">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Upload or Reset */}
          <div className="mb-4 pt-3 border-t border-neutral-800">
            <label className="block text-xs font-medium text-neutral-400 mb-2 flex items-center justify-between">
              <span>Your Attached / Custom Image</span>
              {customBgUrl && (
                <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">Active</span>
              )}
            </label>
            
            <div className="flex gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-medium cursor-pointer transition-colors">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              {customBgUrl && (
                <button
                  id="reset-custom-bg-btn"
                  onClick={() => onCustomBgChange(null)}
                  title="Reset to default theme"
                  className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 transition-colors border border-neutral-700"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Opacity and Blur sliders */}
          <div className="space-y-3 pt-3 border-t border-neutral-800 text-xs">
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span className="flex items-center gap-1"><Sliders className="w-3 h-3" /> Background Blur</span>
                <span>{blurIntensity}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={blurIntensity}
                onChange={(e) => setBlurIntensity(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
            </div>
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>Contrast Shield (Darkness)</span>
                <span>{overlayOpacity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
