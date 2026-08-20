import React from 'react';
import { ShieldCheck, UserCheck, ArrowRight, Sparkles, Lock, Globe, Phone, Building2, HeartPulse } from 'lucide-react';
import { getTranslation } from '../data/translations';
import { INDIAN_LANGUAGES } from '../data/languages';
import { SwasthaLogo } from './SwasthaLogo';

interface HomeScreenProps {
  selectedLanguageId: string;
  mobileNumber: string;
  onNavigateToLanguage: () => void;
  onOpenMyLogin: () => void;
  onOpenAdminLogin: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedLanguageId,
  mobileNumber,
  onNavigateToLanguage,
  onOpenMyLogin,
  onOpenAdminLogin
}) => {
  const t = getTranslation(selectedLanguageId);
  const currentLang = INDIAN_LANGUAGES.find(l => l.id === selectedLanguageId) || INDIAN_LANGUAGES[0];

  return (
    <div id="home-screen-container" className="w-full max-w-xl mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Brand Header matching the template */}
      <div className="text-center pt-2 pb-4">
        <SwasthaLogo size="lg" showSubtitle={true} langSubtitle={t.brandSubtitle !== 'SWASTHA SEVA SETU' ? t.brandSubtitle : undefined} />
      </div>

      {/* Top Welcome Status Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-purple-200 text-purple-800 text-xs font-bold shadow-sm backdrop-blur-md mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>{currentLang.greeting}!</span>
          <span className="text-slate-300">|</span>
          <span className="font-mono text-slate-700">+91 {mobileNumber}</span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          {t.homeGreeting}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto mt-0.5">
          {t.homeSubheading}
        </p>
      </div>

      {/* ONLY TWO OPTIONS IN BIG BLOCKS: Admin Login & My Login */}
      <div id="portal-big-blocks-grid" className="flex flex-col gap-4 sm:gap-5">
        
        {/* BIG BLOCK 1: Admin Login */}
        <div
          id="admin-login-big-block"
          onClick={onOpenAdminLogin}
          className="group relative rounded-3xl p-5 sm:p-6 bg-white/90 hover:bg-white border-2 border-purple-200 hover:border-purple-600 backdrop-blur-xl shadow-lg hover:shadow-xl shadow-purple-950/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden select-none active:scale-[0.99]"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-purple-100/60 rounded-full blur-xl group-hover:bg-purple-200/70 transition-all pointer-events-none" />

          {/* Top Tag & Icon */}
          <div className="relative z-10 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-purple-500 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-purple-700" />
                </div>
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                Doctors & Hospital Controls
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight mb-1">
              Admin Login
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Doctors Information with associated hospitals, control on appointment timing allotments, OPD shifts, and live queue token caller.
            </p>
          </div>

          {/* Large Action Button */}
          <div className="relative z-10 pt-3 border-t border-slate-100">
            <button
              type="button"
              id="admin-login-cta-btn"
              className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 group-hover:from-purple-800 group-hover:to-indigo-700 shadow-md shadow-purple-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{t.adminLoginBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* BIG BLOCK 2: My Login */}
        <div
          id="my-login-big-block"
          onClick={onOpenMyLogin}
          className="group relative rounded-3xl p-5 sm:p-6 bg-white/90 hover:bg-white border-2 border-amber-200 hover:border-amber-500 backdrop-blur-xl shadow-lg hover:shadow-xl shadow-amber-950/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden select-none active:scale-[0.99]"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-100/60 rounded-full blur-xl group-hover:bg-amber-200/70 transition-all pointer-events-none" />

          {/* Top Tag & Icon */}
          <div className="relative z-10 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <HeartPulse className="w-7 h-7 text-pink-600" />
                </div>
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-200">
                Aadhaar & DigiLocker Verified
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-pink-600 transition-colors tracking-tight mb-1">
              My Login
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Aadhaar & DigiLocker verified patient profile with auto-extracted address, age & sex. Appointment booking by hospital location, department & live queue tracking.
            </p>
          </div>

          {/* Large Action Button */}
          <div className="relative z-10 pt-3 border-t border-slate-100">
            <button
              type="button"
              id="my-login-cta-btn"
              className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 group-hover:from-pink-700 group-hover:to-amber-600 shadow-md shadow-pink-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.myLoginBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Quick Status Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Mobile: <strong className="text-slate-800 font-mono">+91 {mobileNumber}</strong></span>
        </div>
        <span>•</span>
        <button
          onClick={onNavigateToLanguage}
          className="flex items-center gap-1 text-purple-700 hover:text-purple-900 font-bold transition-colors hover:underline cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{currentLang.nativeName} ({currentLang.name}) — Change</span>
        </button>
      </div>

    </div>
  );
};
